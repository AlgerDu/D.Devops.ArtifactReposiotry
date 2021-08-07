using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry.Controllers
{
    [ApiController]
    public class TagController : ControllerBase
    {
        readonly ILogger _logger;
        readonly ITagRepository _tagRepo;

        public TagController(
            ILogger<TagController> logger
            , ITagRepository tagRepo
            )
        {
            _logger = logger;
            _tagRepo = tagRepo;
        }

        [HttpGet("api/tags")]
        public Tag[] GetList()
        {
            return _tagRepo.Query().ToArray();
        }

        [HttpGet("api/tags/{tagName}")]
        public ActionResult<Tag> Get([FromRoute] string tagName)
        {
            var tag = _tagRepo.Get(tagName);

            if (tag == null)
            {
                return NoContent();
            }

            return tag;
        }
    }
}
