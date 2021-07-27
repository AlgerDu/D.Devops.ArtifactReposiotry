using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Minio;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class MinioClientProvider : IMinioClientProvider
    {
        readonly ILogger _logger;
        readonly MinioOptions _options;

        MinioClient _minioClient;

        public MinioClientProvider(
            ILogger<MinioClientProvider> logger
            , IOptions<MinioOptions> options
            )
        {
            _logger = logger;
            _options = options.Value;

            Init();
        }

        public MinioClient Get()
        {
            return _minioClient;
        }

        private void Init()
        {
            try
            {
                _minioClient = new MinioClient(_options.Endpoint, _options.AccessKey, _options.SecretKey);
            }
            catch (Exception ex)
            {
                _logger.LogError($"create minio client error [{ex}]");
            }
        }
    }
}
