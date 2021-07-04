using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class DependModel
    {
        public Dictionary<string, string> Conditions { get; set; }

        public DependArtifactModel[] Artifacts { get; set; }
    }
}
