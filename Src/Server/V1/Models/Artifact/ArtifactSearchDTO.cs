using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry.V1
{
    public class ArtifactSearchDTO
    {
        public string RepoCode { get; set; }

        public string Name { get; set; }

        public string LatestVersion { get; set; }

        public DateTimeOffset? LastUpdateTime { get; set; }
    }
}
