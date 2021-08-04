using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class TagRepository :
        BaseRepositoryByLiteDB<Tag, string>
        , ITagRepository
    {
        public TagRepository(
            ILogger<TagRepository> logger
            , ILiteDB liteDB
            ) : base(logger, liteDB)
        {
        }
    }
}
