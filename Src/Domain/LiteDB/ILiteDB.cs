using LiteDB;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry
{
    /// <summary>
    /// 
    /// </summary>
    public interface ILiteDB
    {
        /// <summary>
        /// 初始化
        /// </summary>
        /// <returns></returns>
        Task InitAsync();

        /// <summary>
        /// 创建一个 lite db 上下文
        /// </summary>
        /// <returns></returns>
        ILiteDatabase CreateContext();
    }
}
