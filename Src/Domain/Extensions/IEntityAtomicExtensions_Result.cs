using D.Utils;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    /// <summary>
    /// IEntityAtomic 有关 Result 的扩展
    /// </summary>
    public static class IEntityAtomicExtensions_Result
    {
        public static IResult CreateOtherOpertingRst(this IEntityAtomic atomic)
        {
            return Result.CreateError($"[{atomic.PK}] entity is operting by others.");
        }
    }
}
