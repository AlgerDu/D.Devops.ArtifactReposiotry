using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class LiteDBOptions
    {
        /// <summary>
        /// 文件路径
        /// </summary>
        public string Path { get; set; }

        /// <summary>
        /// 数据库结构版本
        /// </summary>
        public string Version { get; set; } = "1.0";
    }
}
