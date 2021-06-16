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

        ConnectionString _connectStr;

        public DLiteDB(
            ILogger<DLiteDB> logger
            , IOptions<LiteDBOptions> options
            )
        {
            _logger = logger;

            _options = options.Value;

            InitAsync().ConfigureAwait(false);
        }

        public ILiteDatabase CreateContext()
        {
            return new LiteDatabase(_connectStr);
        }

        public Task InitAsync()
        {
            return Task.Run(() =>
            {
                //TODO 检测数据库结构变更，自动更新结构

                var filePath = _options.Path;

                Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                _connectStr = new ConnectionString($"Filename={filePath}");

            });
        }
    }
}
