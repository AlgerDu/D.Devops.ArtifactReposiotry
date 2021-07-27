using LiteDB;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace D.ArtifactReposiotry
{
    /// <summary>
    /// 通过 LiteDB 实现的 IRepository 基类
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    /// <typeparam name="TPrimaryKey"></typeparam>
    public abstract class BaseRepositoryByLiteDB<TEntity, TPrimaryKey>
        : IRepository<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
        where TPrimaryKey : IEquatable<TPrimaryKey>
    {
        protected readonly ILogger _logger;
        protected readonly ILiteDB _liteDB;

        public BaseRepositoryByLiteDB(
            ILogger logger
            , ILiteDB liteDB
            )
        {
            _logger = logger;
            _liteDB = liteDB;
        }

        /// <inheritdoc/>
        public TEntity Get(TPrimaryKey key)
        {
            using (var db = _liteDB.CreateContext())
            {
                var col = db.GetCollection<TEntity>();

                return col.FindOne(LiteDB.Query.EQ("_id", new BsonValue(key)));
            }
        }

        /// <inheritdoc/>
        public bool Put(TEntity entity)
        {
            using (var db = _liteDB.CreateContext())
            {
                var col = db.GetCollection<TEntity>();

                var success = col.Update(entity);

                if (success)
                {
                    success = col.Insert(entity);
                }

                return success;
            }
        }

        /// <inheritdoc/>
        public bool Delete(TPrimaryKey key)
        {
            using (var db = _liteDB.CreateContext())
            {
                var col = db.GetCollection<TEntity>();

                return col.Delete(new BsonValue(key));
            }
        }
        /// <inheritdoc/>
        public bool Insert(TEntity entity)
        {
            using (var db = _liteDB.CreateContext())
            {
                var col = db.GetCollection<TEntity>();

                var id = col.Insert(entity);

                return !id.IsNull;
            }
        }

        public IQueryable<TEntity> Query(Expression<Func<TEntity, bool>> predicate = null)
        {
            using (var db = _liteDB.CreateContext())
            {
                var col = db.GetCollection<TEntity>();

                var list = col.Query();

                if (predicate != null)
                {
                    list = list.Where(predicate);
                }

                return list.ToList().AsQueryable();
            }
        }
    }
}
