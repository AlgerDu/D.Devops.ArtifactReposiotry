using D.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry.V1
{
    [ApiController]
    [Route("api/v1/repositorys/{repoCode}/artifacts")]
    public class ArtifactController : ControllerBase
    {
        readonly ILogger _logger;
        readonly IEntityAtomicProvider _entityAtomic;

        readonly IArtifactRepoRepository _artifactRepoRepository;
        readonly IArtifactRepository _artifactRepository;

        public ArtifactController(
            ILogger<ArtifactController> logger
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

        /// <summary>
        /// 搜索某个仓库下的制品
        /// </summary>
        /// <param name="repoCode"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        [HttpPost("search")]
        public SearchResult<ArtifactSearchDTO> Search([FromRoute] string repoCode, [FromBody] Search query)
        {
            var artifaces = _artifactRepository.Query(aa => aa.RepoCode == repoCode);

            if (!string.IsNullOrEmpty(query.Condition))
            {
                artifaces = artifaces.Where(aa =>
                    aa.Name.Contains(query.Condition)
                    || aa.Version.Contains(query.Condition)
                    || aa.Tags.FirstOrDefault(tt => tt.Contains(query.Condition)) != null
                    );
            }

            artifaces = artifaces.Distinct(new ArtifactNameComparer());

            var searchResult = new SearchResult<ArtifactSearchDTO>(artifaces.Count(), query.Page);

            searchResult.Datas = artifaces
                .Skip(searchResult.Page.SkipCount())
                .Take(searchResult.Page.Size)
                .Select(aa => new ArtifactSearchDTO
                {
                    Name = aa.Name,
                    LatestVersion = aa.Version,
                    RepoCode = aa.RepoCode
                })
                .ToArray();

            return searchResult;
        }

        /// <summary>
        /// 获取制品版本列表
        /// </summary>
        /// <param name="item"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        [HttpPost("{artifactName}/versions")]
        public SearchResult<ArtifactListDTO> Versions(
            [FromRoute] ArtifactOptBaseDTO item
            , [FromBody] Search query
            )
        {
            var artifaces = _artifactRepository.Query(aa => aa.RepoCode == item.RepoCode && aa.Name == item.ArtifactName);

            if (!string.IsNullOrEmpty(query.Condition))
            {
                artifaces = artifaces.Where(aa =>
                    aa.Version.Contains(query.Condition)
                    || aa.Tags.FirstOrDefault(tt => tt.Contains(query.Condition)) != null
                    );
            }

            artifaces = artifaces
                .OrderBy(aa => aa.Version);

            var searchResult = new SearchResult<ArtifactListDTO>(artifaces.Count(), query.Page);

            searchResult.Datas = artifaces
                .Skip(searchResult.Page.SkipCount())
                .Take(searchResult.Page.Size)
                .Select(aa => new ArtifactListDTO
                {
                    RepoCode = aa.RepoCode,
                    Name = aa.Name,
                    Version = aa.Version,
                    Tags = aa.Tags.ToArray(),
                    DownloadQuantity = aa.Objects.Sum(oo => oo.DownloadQuantity),
                    Attributes = aa.Attributes
                })
                .ToArray();

            return searchResult;
        }

        [HttpGet("{artifactName}/v/{artifactVersion}")]
        public IResult<Artifact> Get([FromRoute] ArtifactOptBaseDTO item)
        {
            var pk = item.GetPK();

            var artifact = _artifactRepository.Get(pk);

            if (artifact == null)
            {
                return Result.CreateError<Artifact>($"[{pk}] artifact version is not exist.");
            }

            return Result.CreateSuccess(artifact);
        }

        [HttpPost]
        public IResult AddItem([FromRoute] string repoCode, [FromBody] Artifact item)
        {
            repoCode = repoCode.ToLower();

            var repo = _artifactRepoRepository.Get(repoCode);

            if (repo == null)
            {
                return Result.CreateError($"repository [{repoCode}] is not exist.");
            }

            var pk = $"{repoCode}_{item.Name}_{item.Version}";

            using (var a = _entityAtomic.Get(pk))
            {
                if (a.IsOprting)
                {
                    return Result.CreateSuccess($"[{pk}] it is tring to add by others.");
                }

                var exist = _artifactRepository.Get(pk);

                if (exist != null)
                {
                    return Result.CreateError($"[{pk}] artifact  is aleardy exist.");
                }

                item.PK = pk;

                var ok = _artifactRepository.Insert(item);

                return ok ? Result.CreateSuccess() : Result.CreateError("insert faild");
            }
        }

        [HttpPost("{artifactName}/v/{artifactVersion}/tags/{tag}")]
        public IResult AddTags(
            [FromRoute] ArtifactOptBaseDTO item
            , [FromRoute] string tag
            )
        {
            var pk = item.GetPK();

            using (var a = _entityAtomic.Get(pk))
            {
                if (a.IsOprting)
                {
                    return Result.CreateSuccess($"[{pk}] it is operating by others.");
                }

                var artifact = _artifactRepository.Get(pk);

                if (artifact == null)
                {
                    return Result.CreateError($"[{pk}] artifact is not exist.");
                }

                var tagExist = artifact.Tags.Contains(tag);

                if (tagExist)
                {
                    return Result.CreateError($"[{pk}] artifact aleardy has exist tag = {tag}.");
                }

                artifact.Tags.Add(tag);

                var ok = _artifactRepository.Put(artifact);

                return ok ? Result.CreateSuccess() : Result.CreateError("update faild");
            }
        }

        [HttpDelete("{artifactName}/v/{artifactVersion}/tags/{tag}")]
        public IResult DeleteTags(
            [FromRoute] ArtifactOptBaseDTO item
            , [FromRoute] string tag
            )
        {
            var pk = item.GetPK();

            using (var a = _entityAtomic.Get(pk))
            {
                if (a.IsOprting)
                {
                    return Result.CreateSuccess($"[{pk}] it is operating by others.");
                }

                var artifact = _artifactRepository.Get(pk);

                if (artifact == null)
                {
                    return Result.CreateError($"[{pk}] artifact is not exist.");
                }

                var tagExist = artifact.Tags.Contains(tag);

                if (!tagExist)
                {
                    return Result.CreateError($"[{pk}] artifact has not tag = {tag}.");
                }

                artifact.Tags.Remove(tag);

                var ok = _artifactRepository.Put(artifact);

                return ok ? Result.CreateSuccess() : Result.CreateError("update faild");
            }
        }
    }
}
