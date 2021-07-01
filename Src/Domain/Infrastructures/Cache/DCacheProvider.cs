using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class DCacheProvider : ICacheProvider
    {
        readonly IMemoryCache _cache;

        public DCacheProvider()
        {
            _cache = new MemoryCache(new MemoryCacheOptions
            {
                SizeLimit = 4096
            });
        }

        public IMemoryCache Get()
        {
            return _cache;
        }
    }
}
