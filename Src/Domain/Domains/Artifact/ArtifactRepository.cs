using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class ArtifactRepository :
        BaseRepositoryByLiteDB<Artifact, string>
        , IArtifactRepository
    {
        public ArtifactRepository(
            ILogger<ArtifactRepository> logger
            , ILiteDB liteDB
            ) : base(logger, liteDB)
        {
        }
    }
}
