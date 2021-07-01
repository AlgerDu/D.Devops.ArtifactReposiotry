using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class EntityAtomicProvider : IEntityAtomicProvider
    {
        IMemoryCache _cache;

        public EntityAtomicProvider(
            ICacheProvider provider
            )
        {
            _cache = provider.Get();
        }

        public IEntityAtomic Get(string pk)
        {
            return new EntityAtomic(_cache, pk);
        }
    }
}
