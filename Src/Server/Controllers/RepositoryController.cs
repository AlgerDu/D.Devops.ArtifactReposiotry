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
        readonly IArtifactRepoRepository _artifactRepoRepository;
        readonly IMemoryCache _cache;
        readonly IEntityAtomicProvider _entityAtomic;

        public RepositoryController(
            ILogger<RepositoryController> logger
            , IArtifactRepoRepository artifactRepoRepository
            , ICacheProvider cacheProvider
            , IEntityAtomicProvider entityAtomic
            )
        {
            _logger = logger;
            _entityAtomic = entityAtomic;
            _cache = cacheProvider.Get();

            _artifactRepoRepository = artifactRepoRepository;
        }

        [HttpPost("api/repositorys")]
        public IResult PostItem(ArtifactRepo artifactRepo)
        {
            artifactRepo.Code = artifactRepo.Code.ToLower();

            var pk = artifactRepo.PK;

            using (var a = _entityAtomic.Get(pk))
            {
                if (a.IsOprting)
                {
                    return Result.CreateSuccess($"[{pk}] it is tring to add by others.");
                }

                var exist = _artifactRepoRepository.Get(pk);

                if (exist != null)
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

        [HttpGet("api/repositorys")]
        public ArtifactRepo[] GetList()
        {
            return _artifactRepoRepository.Query().ToArray();
        }
    }
}
