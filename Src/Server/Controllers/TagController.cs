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

        public TagController(
            ILogger<TagController> logger
            )
        {
            _logger = logger;
        }
    }
}
