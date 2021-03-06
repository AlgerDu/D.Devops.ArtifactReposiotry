using LiteDB;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class ArtifactRepo : IEntity<string>
    {
        /// <summary>
        /// Name
        /// </summary>
        [BsonId]
        public string PK { get => Code; set { } }

        /// <summary>
        /// 类型
        /// </summary>
        public ArtifactRepoType Type { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }
    }
}
