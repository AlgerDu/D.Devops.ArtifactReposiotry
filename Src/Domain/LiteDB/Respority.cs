using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    /// <summary>
    /// 依赖注入（泛型）仓储
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    /// <typeparam name="TPrimaryKey"></typeparam>
    public class Respority<TEntity, TPrimaryKey> :
        BaseRepositoryByLiteDB<TEntity, TPrimaryKey>
        , IRepository
        where TEntity : class, IEntity<TPrimaryKey>
        where TPrimaryKey : IEquatable<TPrimaryKey>
    {
        public Respority(
            ILogger<Respority<TEntity, TPrimaryKey>> logger
            , ILiteDB liteDB)
            : base(logger, liteDB)
        {
        }
    }
}
