using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry
{
    public class ArtifactSearchModel
    {
        public string RepoCode { get; set; }

        public string Name { get; set; }

        public string Version { get; set; }

        public string[] Tags { get; set; }

        public Dictionary<string, string> Attributes { get; set; }

        public int DownloadQuantity { get; set; }

        public DateTimeOffset LastUpdateTime { get; set; }
    }
}
