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
        LiteRepository GetRepository();
    }
}
