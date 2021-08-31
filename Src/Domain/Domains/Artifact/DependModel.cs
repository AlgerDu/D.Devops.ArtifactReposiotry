using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class DependModel
    {
        public string Condition { get; set; }

        public DependArtifactModel[] Artifacts { get; set; }
    }
}
