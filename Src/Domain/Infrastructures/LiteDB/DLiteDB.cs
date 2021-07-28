using LiteDB;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace D.ArtifactReposiotry
{
    public class DLiteDB : ILiteDB
    {
        readonly ILogger _logger;
        readonly LiteDBOptions _options;

        LiteRepository _repository;

        public DLiteDB(
            ILogger<DLiteDB> logger
            , IOptions<LiteDBOptions> options
            )
        {
            _logger = logger;
            _options = options.Value;

            Init();
        }

        public LiteRepository GetRepository()
        {
            return _repository;
        }

        private void Init()
        {
            var filePath = _options.Path;

            Directory.CreateDirectory(Path.GetDirectoryName(filePath));

            var connStr = new ConnectionString($"Filename={filePath}");

            _repository = new LiteRepository(connStr);
        }
    }
}
