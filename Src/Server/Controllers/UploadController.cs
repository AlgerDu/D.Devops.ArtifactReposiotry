using D.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry.Controllers
{
    [ApiController]
    public class UploadController : ControllerBase
    {
        readonly ILogger _logger;
        readonly IEntityAtomicProvider _entityAtomic;

        readonly IArtifactRepoRepository _artifactRepoRepository;
        readonly IArtifactRepository _artifactRepository;

        public UploadController(
            ILogger<UploadController> logger
            , IEntityAtomicProvider entityAtomic
            , IArtifactRepoRepository artifactRepoRepository
            , IArtifactRepository artifactRepository
            )
        {
            _logger = logger;
            _entityAtomic = entityAtomic;

            _artifactRepoRepository = artifactRepoRepository;
            _artifactRepository = artifactRepository;
        }

        [HttpPost("api/repositorys/{repoCode}/artifacts/upload"), DisableRequestSizeLimit]
        public IResult Upload([FromRoute] string repoCode)
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

            var optItem = new ArtifactOptBaseModel
            {
                RepoCode = repoCode,
                ArtifactName = anaylseRst[0],
                ArtifactVersion = anaylseRst[1].Replace("v", "", StringComparison.OrdinalIgnoreCase)
            };

            var pk = optItem.GetPK();


            using (var a = _entityAtomic.Get(pk))
            {
                if (a.IsOprting) return a.CreateOtherOpertingRst();

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

                    var insertRst = _artifactRepository.Insert(artifact);

                    _logger.LogWarning($"{identifier} {pk} not exist, auto create");
                }

                var fileObj = artifact.Objects.FirstOrDefault(oo => oo.Name == file.FileName);

                if (fileObj == null)
                {
                    artifact.Objects.Add(fileObj);
                }

                var updateRst = _artifactRepository.Put(artifact);
            }

            return Result.CreateSuccess();
        }
    }
}
