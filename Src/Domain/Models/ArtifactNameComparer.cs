using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class ArtifactNameComparer : IEqualityComparer<Artifact>
    {
        public bool Equals(Artifact x, Artifact y)
        {
            return x.Name == y.Name;
        }

        public int GetHashCode(Artifact obj)
        {
            return obj.Name.GetHashCode();
        }
    }
}
