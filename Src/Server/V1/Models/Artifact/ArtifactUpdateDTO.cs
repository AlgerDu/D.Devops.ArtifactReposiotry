using System.Collections.Generic;

namespace D.ArtifactReposiotry.V1
{
    public class ArtifactUpdateDTO
    {
        /// <summary>
        /// 依赖的其它制品
        /// </summary>
        public List<DependModel> Depends { get; set; }

        /// <summary>
        /// 标签
        /// </summary>
        public List<string> Tags { get; set; }

        /// <summary>
        /// 属性，默认和用户自定义
        /// </summary>
        public Dictionary<string, string> Attributes { get; set; }
    }
}