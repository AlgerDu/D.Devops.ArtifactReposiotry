using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry.V1
{
    public class ArtifactOptBaseDTO
    {
        public string RepoCode { get; set; }

        public string ArtifactName { get; set; }

        public string ArtifactVersion { get; set; }

        public string GetPK()
        {
            return $"{RepoCode}_{ArtifactName}_{ArtifactVersion}";
        }
    }
}
