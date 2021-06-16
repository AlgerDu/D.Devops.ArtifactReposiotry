using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry.Controllers
{
    [ApiController]
    [Route("api/[controller]s")]
    public class RepositoryController : ControllerBase
    {
        readonly ILogger _logger;
        readonly IArtifactRepoRepository _artifactRepoRepository;

        public RepositoryController(
            ILogger<RepositoryController> logger
            , IArtifactRepoRepository artifactRepoRepository
            )
        {
            _logger = logger;
            _artifactRepoRepository = artifactRepoRepository;
        }

        [HttpPost]
        public ArtifactRepo PostTodoItem(ArtifactRepo artifactRepo)
        {
            var ok = _artifactRepoRepository.Insert(artifactRepo);

            return artifactRepo;
        }
    }
}
