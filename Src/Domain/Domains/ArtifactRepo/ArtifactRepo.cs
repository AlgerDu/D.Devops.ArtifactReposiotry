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
        public string PK { get => Name; set { } }

        public string Name { get; set; }
    }
}
