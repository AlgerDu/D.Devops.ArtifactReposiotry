using D.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry.V1
{
    [ApiController]
    [Route("api/v1")]
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

        /// <summary>
        /// 获取所有的仓库信息（以使用的过程中不会有太多的仓库为前提）
        /// </summary>
        /// <returns></returns>
        [HttpGet("repositorys")]
        public ArtifactRepoDTO[] GetAll()
        {
            var datas = _artifactRepoRepository.Query().ToArray();

            return (from data in datas
                    select new ArtifactRepoDTO
                    {
                        Code = data.Code,
                        Type = data.Type,
                        Descritpion = ""
                    }).ToArray();
        }

        /// <summary>
        /// 新建一个仓库
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [HttpPost("repositorys")]
        public IResult AddItem(ArtifactRepoDTO item)
        {
            var pk = item.Code.ToLower();

            using (var a = _entityAtomic.Get(pk))
            {
                if (a.IsOprting)
                {
                    return a.CreateOtherOpertingRst();
                }

                var exist = _artifactRepoRepository.Get(pk);

                if (exist != null)
                {
                    return Result.CreateError($"[{pk}] repo is aleardy exist.");
                }

                var ok = _artifactRepoRepository.Insert(new ArtifactRepo
                {
                    Code = item.Code,
                    Name = "",
                    Type = item.Type
                });

                return ok ? Result.CreateSuccess() : Result.CreateError("insert faild");
            }
        }

        [HttpDelete("repositorys/{repoCode}")]
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
    }
}
