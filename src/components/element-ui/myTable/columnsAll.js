// 导入所有的接口
const req = context => context.keys().map(context),
    ret = req(require.context("./columns/", true, /\.js$/)),
    columnsAll = (target)=>{
        let res = [];

        ret.forEach(item => {
            // 数据合并
            res = res.concat(item.default(target));
        });
        return res
    };

export default columnsAll;
