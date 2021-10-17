using D.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Minio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry.V1
{
    [ApiController]
    public class UploadController : ControllerBase
    {
        readonly ILogger _logger;
        readonly IEntityAtomicProvider _entityAtomic;

        readonly IArtifactRepoRepository _artifactRepoRepository;
        readonly IArtifactRepository _artifactRepository;

        readonly MinioClient _minioClient;

        public UploadController(
            ILogger<UploadController> logger
            , IEntityAtomicProvider entityAtomic
            , IArtifactRepoRepository artifactRepoRepository
            , IArtifactRepository artifactRepository
            , IMinioClientProvider minioClientProvider
            )
        {
            _logger = logger;
            _entityAtomic = entityAtomic;

            _artifactRepoRepository = artifactRepoRepository;
            _artifactRepository = artifactRepository;

            _minioClient = minioClientProvider.Get();
        }

        [HttpPost("api/repositorys/{repoCode}/artifacts/upload"), DisableRequestSizeLimit]
        public async Task<IResult> Upload([FromRoute] string repoCode)
        {
            var identifier = HttpContext.TraceIdentifier;
            var files = HttpContext.Request.Form?.Files;

            if (files == null || files.Count != 1)
            {
                _logger.LogWarning($"{identifier} http req has file count = {files?.Count}");
                return Result.CreateError("file count is not 1, not support");
            }

            var file = files.First();
            var name = string.IsNullOrEmpty(file.Name) ? file.FileName : file.Name;

            var anaylseRst = name.Split(new char[] { '_' }, StringSplitOptions.RemoveEmptyEntries);

            if (anaylseRst.Length < 2)
            {
                _logger.LogWarning($"{identifier} cant anaylse [{name}]");
                return Result.CreateError($"cant anaylse [{name}]");
            }

            var optItem = new ArtifactOptBaseDTO
            {
                RepoCode = repoCode,
                ArtifactName = anaylseRst[0],
                ArtifactVersion = anaylseRst[1].Replace("v", "", StringComparison.OrdinalIgnoreCase)
            };

            var pk = optItem.GetPK();


            using (var a = _entityAtomic.Get(pk))
            {
                if (a.IsOprting) return a.CreateOtherOpertingRst();

                var repoExist = _artifactRepoRepository.Get(optItem.RepoCode);

                if (repoExist == null)
                {
                    return Result.CreateError($"[{optItem.RepoCode}] repo is not exist");
                }

                var artifact = _artifactRepository.Get(pk);

                if (artifact == null)
                {
                    artifact = new Artifact
                    {
                        PK = pk,
                        Name = optItem.ArtifactName,
                        Version = optItem.ArtifactVersion,
                        RepoCode = optItem.RepoCode
                    };

                    _logger.LogWarning($"{identifier} {pk} not exist, auto create");
                }

                var fileObj = artifact.Objects.FirstOrDefault(oo => oo.Name == file.FileName);

                if (fileObj == null)
                {
                    fileObj = new ArtifactObjectModel
                    {
                        Name = file.FileName
                    };

                    artifact.Objects.Add(fileObj);
                }

                // TODO 更新

                fileObj.Attributes["size"] = file.Length.ToString();

                var updateRst = _artifactRepository.Put(artifact);

                if (!updateRst)
                {
                    return Result.CreateError($"[{pk}] update faile");
                }

                var uploadRst = await UploadFileToMinoServer(identifier, optItem, file);

                return uploadRst;
            }
        }

        private async Task<IResult> UploadFileToMinoServer(string identifier, ArtifactOptBaseDTO item, IFormFile file)
        {
            try
            {
                var bucketExist = await _minioClient.BucketExistsAsync(item.RepoCode);

                if (!bucketExist)
                {
                    _logger.LogWarning($"[{item.RepoCode}] bucker not exist, auto create");

                    await _minioClient.MakeBucketAsync(item.RepoCode);
                }

                await _minioClient.PutObjectAsync(
                    item.RepoCode
                    , $"{item.ArtifactName}/{item.ArtifactVersion}/{file.FileName}"
                    , file.OpenReadStream()
                    , file.Length
                    );

                return Result.CreateSuccess();
            }
            catch (Exception ex)
            {
                _logger.LogError($"[{file.FileName}] upload file to minio server error {ex}");
                return Result.CreateError("upload file erroe");
            }
        }
    }
}
