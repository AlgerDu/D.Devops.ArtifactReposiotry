using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class EntityAtomic : IEntityAtomic
    {
        private string _pk;
        private IMemoryCache _cache;

        public bool IsOprting { get; private set; }

        public string PK => _pk;

        public EntityAtomic(
            IMemoryCache cache
            , string pk
            )
        {
            lock (cache)
            {
                if (cache.TryGetValue(pk, out string value))
                {
                    IsOprting = true;
                    return;
                }

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetSize(1)
                .SetSlidingExpiration(TimeSpan.FromMinutes(16));

                cache.Set(pk, pk, cacheEntryOptions);
            }

            _pk = pk;
            _cache = cache;
        }

        public void Dispose()
        {
            if (!IsOprting)
            {
                _cache.Remove(_pk);
            }
        }
    }
}
