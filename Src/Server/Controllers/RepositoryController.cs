using D.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry.Controllers
{
    [ApiController]
    public class RepositoryController : ControllerBase
    {
        readonly ILogger _logger;
        readonly IMemoryCache _cache;
        readonly IEntityAtomicProvider _entityAtomic;

        readonly IArtifactRepoRepository _artifactRepoRepository;
        readonly IArtifactRepository _artifactRepository;

        public RepositoryController(
            ILogger<RepositoryController> logger
            , IArtifactRepoRepository artifactRepoRepository
            , ICacheProvider cacheProvider
            , IEntityAtomicProvider entityAtomic
            , IArtifactRepository artifactRepository
            )
        {
            _logger = logger;
            _entityAtomic = entityAtomic;
            _cache = cacheProvider.Get();

            _artifactRepoRepository = artifactRepoRepository;
            _artifactRepository = artifactRepository;
        }

        [HttpPost("api/repositorys")]
        public IResult AddItem(ArtifactRepo artifactRepo)
        {
            artifactRepo.Code = artifactRepo.Code.ToLower();

            var pk = artifactRepo.PK;

            using (var a = _entityAtomic.Get(pk))
            {
                if (a.IsOprting)
                {
                    return a.CreateOtherOpertingRst();
                }

                var exist = _artifactRepoRepository.Query(ii => ii.PK == pk || ii.Name == artifactRepo.Name).Count() > 0;

                if (exist)
                {
                    return Result.CreateError($"[{pk}] repo is aleardy exist.");
                }

                var ok = _artifactRepoRepository.Insert(artifactRepo);

                return ok ? Result.CreateSuccess() : Result.CreateError("insert faild");
            }
        }

        [HttpGet("api/repositorys/{repoCode}")]
        public IResult<ArtifactRepo> GetDetail([FromRoute] string repoCode)
        {
            var pk = repoCode.ToLower();

            var repo = _artifactRepoRepository.Get(pk);

            if (repo == null)
            {
                return Result.CreateError<ArtifactRepo>($"[{pk}] repo is not exist.");
            }

            return Result.CreateSuccess(repo);
        }

        [HttpDelete("api/repositorys/{repoCode}")]
        public IResult Delete([FromRoute] string repoCode)
        {
            var pk = repoCode.ToLower();

            using (var a = _entityAtomic.Get(pk))
            {
                if (a.IsOprting)
                {
                    return a.CreateOtherOpertingRst();
                }

                var exist = _artifactRepoRepository.Get(pk);

                if (exist == null)
                {
                    return Result.CreateError($"[{pk}] repo is not exist.");
                }

                var hasArtifacts = _artifactRepository.Query(aa => aa.RepoCode == pk).Count() > 0;

                if (hasArtifacts)
                {
                    return Result.CreateError($"[{pk}] delete all artifacts belong this repo first");
                }

                var ok = _artifactRepoRepository.Delete(pk);

                return ok ? Result.CreateSuccess() : Result.CreateError("delete faild");
            }
        }

        [HttpGet("api/repositorys")]
        public ArtifactRepo[] GetList()
        {
            return _artifactRepoRepository.Query().ToArray();
        }
    }
}
