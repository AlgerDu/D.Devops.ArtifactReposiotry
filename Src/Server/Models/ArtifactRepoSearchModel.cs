using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry
{
    public class ArtifactRepoSearchModel
    {
        public string RepoCode { get; set; }

        public string Name { get; set; }

        public string LatestVersion { get; set; }

        public string LastUpdateTime { get; set; }
    }
}
