using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public interface IEntityAtomic : IDisposable
    {
        string PK { get; }

        bool IsOprting { get; }
    }
}
