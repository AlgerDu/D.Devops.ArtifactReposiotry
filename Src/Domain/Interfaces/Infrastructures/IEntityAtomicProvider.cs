using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public interface IEntityAtomicProvider
    {
        IEntityAtomic Get(string pk);
    }
}
