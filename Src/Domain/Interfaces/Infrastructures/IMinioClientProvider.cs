using Minio;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public interface IMinioClientProvider
    {
        MinioClient Get();
    }
}
