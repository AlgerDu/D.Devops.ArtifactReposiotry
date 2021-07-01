using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public interface ICacheProvider
    {
        IMemoryCache Get();
    }
}
