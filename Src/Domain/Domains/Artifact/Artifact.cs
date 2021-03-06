using LiteDB;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    /// <summary>
    /// 制品
    /// </summary>
    public class Artifact : ArtifactBaseModel, IEntity<string>
    {
        /// <summary>
        /// Guid
        /// </summary>
        [BsonId]
        public string PK { get; set; }

        /// <summary>
        /// 版本
        /// </summary>
        public string Version { get; set; }

        /// <summary>
        /// 归属的制品仓库
        /// </summary>
        public string RepoCode { get; set; }

        /// <summary>
        /// 归属于同一个制品下的二进制文件（比如不同的环境）
        /// </summary>
        public List<ArtifactObjectModel> Objects { get; set; } = new List<ArtifactObjectModel>();

        /// <summary>
        /// 依赖的其它制品
        /// </summary>
        public List<DependModel> Depends { get; set; } = new List<DependModel>();
    }
}
