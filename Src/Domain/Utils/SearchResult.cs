using D.Utils;
using System;
using System.Collections.Generic;
using System.Text;

namespace D.ArtifactReposiotry
{
    public class PageModel
    {
        public int Size { get; set; }

        public int Index { get; set; }
    }

    public static class PageModelExtensions
    {
        public static int SkipCount(this PageModel page)
        {
            return (page.Index - 1) * page.Size;
        }
    }

    public class Search
    {
        public PageModel Page { get; set; } = new PageModel();

        public string Condition { get; set; }
    }

    public class SearchResult<DataType> : Result
    {
        public IEnumerable<DataType> Datas { get; set; }

        public int TotalCount { get; set; }

        public PageModel Page { get; set; } = new PageModel();

        public SearchResult() { }

        public SearchResult(int dotalCount, PageModel page)
        {
            TotalCount = TotalCount;
            Page = new PageModel
            {
                Index = page.Index,
                Size = page.Size
            };

            if (TotalCount <= Page.SkipCount())
            {
                Page.Index = 1;
            }
        }
    }
}
