using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public abstract class ArtifactBaseModel
    {
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 标签
        /// </summary>
        public string[] Tags { get; set; }

        /// <summary>
        /// 属性，默认和用户自定义
        /// </summary>
        public Dictionary<string, string> Attributes { get; set; }
    }
}
