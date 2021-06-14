using LiteDB;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    /// <summary>
    /// 制品
    /// </summary>
    public class Artifact : IEntity<string>
    {
        /// <summary>
        /// Guid
        /// </summary>
        [BsonId]
        public string PK { get; set; }

        public string Name { get; set; }

        public string Version { get; set; }

        /// <summary>
        /// 归属的制品仓库
        /// </summary>
        public string RepoName { get; set; }

        /// <summary>
        /// 标签
        /// </summary>
        public string Tags { get; set; }

        public ArtifactObjectModel[] Objects { get; set; }

        public DependModel[] Depends { get; set; }
    }
}
