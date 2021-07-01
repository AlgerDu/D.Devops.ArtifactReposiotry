using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public interface IEntityAtomic : IDisposable
    {
        bool IsOprting { get; }
    }
}
