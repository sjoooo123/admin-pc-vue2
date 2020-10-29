export default function() {
  return [
    {
      prop: "wareId",
      label: "商品信息",
      render: function(h, param) {
        return (
          <div style="display:flex;flex-flow:row;">
            <el-image src={param.row.logo} style="width:70px;height:70px;" />
            <div style="flex:1;margin-left:15px;text-align:left;">
              {/* <div>{param.row.title}</div> */}
              <el-link
                type="primary"
                href={`https://item.jd.com/${param.row.wareId}.html`}
                target="_blank"
                underline={false}
              >
                {param.row.title}
              </el-link>
              <div style="margin-top:10px;font-size:12px;color:#909399;">
                {param.row.wareId}
              </div>
            </div>
          </div>
        );
      }
    },
    { prop: "jdPrice", label: "京东价" },
    { prop: "brandName", label: "品牌" },
    {
      prop: "ad",
      label: "广告语",
      render: function(h, params) {
        if (params.row.adWords) {
          return (
            <div>
              <div>{params.row.adWords.words}</div>
              <div>
                <a
                  href={params.row.adWords.url}
                  target="_blank"
                  style="color:#00B4BA"
                >
                  {params.row.adWords.urlWords}
                </a>
              </div>
            </div>
          );
        }
      }
    }
  ];
}
