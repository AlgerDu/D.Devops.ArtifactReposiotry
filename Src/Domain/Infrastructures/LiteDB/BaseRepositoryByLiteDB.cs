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
            try
            {
                var db = _liteDB.GetRepository();

                var entity = db.Query<TEntity>()
                    .Where("_id = @0", new BsonValue(key))
                    .SingleOrDefault();

                return entity;
            }
            catch (Exception ex)
            {
                _logger.LogError($"{key} get by key error = {ex}");
                return null;
            }
        }

        /// <inheritdoc/>
        public bool Put(TEntity entity)
        {
            try
            {
                var db = _liteDB.GetRepository();

                db.Upsert<TEntity>(entity);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"{entity.PK} update error = {ex}");
                return false;
            }
        }

        /// <inheritdoc/>
        public bool Delete(TPrimaryKey key)
        {
            try
            {
                var db = _liteDB.GetRepository();

                return db.Delete<TEntity>(new BsonValue(key));
            }
            catch (Exception ex)
            {
                _logger.LogError($"{key} delete by key error = {ex}");
                return false;
            }
        }
        /// <inheritdoc/>
        public bool Insert(TEntity entity)
        {
            try
            {
                var db = _liteDB.GetRepository();

                db.Insert<TEntity>(entity);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"{entity.PK} insert error = {ex}");
                return false;
            }
        }

        public IQueryable<TEntity> Query(Expression<Func<TEntity, bool>> predicate = null)
        {
            try
            {
                var db = _liteDB.GetRepository();

                var datas = db.Query<TEntity>();

                if (predicate != null)
                {
                    datas = datas.Where(predicate);
                }

                return datas
                    .ToEnumerable()
                    .AsQueryable();
            }
            catch (Exception ex)
            {
                _logger.LogError($"search error = {ex}");

                return new TEntity[0].AsQueryable();
            }
        }
    }
}
