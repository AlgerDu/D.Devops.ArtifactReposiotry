using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry
{
    public class Application
    {
        readonly ILogger _logger;
        readonly IConfiguration _configuration;
        readonly ITagRepository _tagRepo;

        public Application(
            ILogger<Application> logger
            , IConfiguration configuration
            , ITagRepository tagRepo
            )
        {
            _logger = logger;
            _configuration = configuration;
            _tagRepo = tagRepo;
        }

        public Task StartAsync()
        {
            _logger.LogInformation($"application start");

            var section = _configuration.GetSection("InternalTags");
            if (section.Exists())
            {
                InitTags(section.Get<Tag[]>());
            }

            return Task.CompletedTask;
        }

        private void InitTags(Tag[] tags)
        {
            _logger.LogInformation($"get internal tags = {tags.Length} from configuration");

            foreach (var tag in tags)
            {
                if (string.IsNullOrEmpty(tag.Name))
                {
                    continue;
                }

                var db = _tagRepo.Get(tag.PK);

                if (db == null)
                {
                    db = new Tag();
                }

                db.Name = tag.Name;
                db.Internal = true;

                if (!string.IsNullOrEmpty(tag.Color)) db.Color = tag.Color;
                if (!string.IsNullOrEmpty(tag.Description)) db.Description = tag.Description;

                _tagRepo.Put(db);

                _logger.LogInformation($"put tag [{db.Name},{db.Color}] to db");
            }
        }
    }
}
