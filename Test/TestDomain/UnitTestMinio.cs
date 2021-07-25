using Microsoft.VisualStudio.TestTools.UnitTesting;
using Minio;

namespace TestDomain
{
    [TestClass]
    public class UnitTestMinio
    {
        [TestMethod]
        public void TestMethod1()
        {
            var endpoint = "localhost:9000";
            var accessKey = "root";
            var secretKey = "12345670008";

            var minio = new MinioClient(endpoint, accessKey, secretKey);

            var x = minio.BucketExistsAsync("test").GetAwaiter().GetResult();
        }
    }
}
