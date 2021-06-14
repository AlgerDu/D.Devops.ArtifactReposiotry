using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class ArtifactRepoRepository :
        BaseRepositoryByLiteDB<ArtifactRepo, string>
        , IArtifactRepoRepository
    {
        public ArtifactRepoRepository(
            ILogger<ArtifactRepoRepository> logger
            , ILiteDB liteDB
            ) : base(logger, liteDB)
        {
        }
    }
}
