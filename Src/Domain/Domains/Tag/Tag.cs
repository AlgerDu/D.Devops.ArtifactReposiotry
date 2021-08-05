using LiteDB;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class Tag : IEntity<string>
    {
        [BsonId]
        public string PK { get => Name; set => Name = value; }

        /// <summary>
        /// 标签名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 颜色
        /// </summary>
        public string Color { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 是否内置（不可更改）
        /// </summary>
        public bool Internal { get; set; }

        /// <summary>
        /// 对于一个制品来说，只有一个
        /// </summary>
        public bool Single { get; set; }
    }
}
