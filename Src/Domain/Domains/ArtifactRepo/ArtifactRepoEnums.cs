using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    /// <summary>
    /// 支持的仓库类型
    /// </summary>
    public enum ArtifactRepoType
    {
        /// <summary>
        /// 未知，或者无效
        /// </summary>
        None,

        /// <summary>
        /// 文件
        /// </summary>
        Raw,

        /// <summary>
        /// Nuget
        /// </summary>
        Nuget
    }
}
