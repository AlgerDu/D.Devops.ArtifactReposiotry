using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace D.ArtifactReposiotry
{
    /// <summary>
    /// 仓储，只做标识用
    /// </summary>
    public interface IRepository
    {
    }

    /// <summary>
    /// 仓储
    /// </summary>
    /// <typeparam name="TEntity">实体类型</typeparam>
    /// <typeparam name="TPrimaryKey">实体主键类型</typeparam>
    public interface IRepository<TEntity, TPrimaryKey> : IRepository
        where TEntity : class, IEntity<TPrimaryKey>
        where TPrimaryKey : IEquatable<TPrimaryKey>
    {
        /// <summary>
        /// 获取实体，进行操作；
        /// 会独占实体，其它地方不能再继续跟新
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        TEntity Get(TPrimaryKey key);

        /// <summary>
        /// 将使用完成的 entity 放回 repository
        /// </summary>
        /// <param name="entity"></param>
        bool Put(TEntity entity);

        /// <summary>
        /// 插入
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        bool Insert(TEntity entity);

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        bool Delete(TPrimaryKey key);

        /// <summary>
        /// 基本搜索
        /// </summary>
        /// <param name="key">predicate</param>
        /// <returns></returns>
        IQueryable<TEntity> Query(Expression<Func<TEntity, bool>> predicate = null);
    }
}
