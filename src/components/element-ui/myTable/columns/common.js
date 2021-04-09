import defalutUrl from "@/assets/images/default-photo.png";
/*
 * columnName：数组的唯一标识
 * render:表示函数式组件，供渲染
 * 本文件为通用列，其他文件columnName需带文件名前缀，避免重复
 */
export default function (target) {
    return [
        { columnName: "date", prop: "date", label: "日期", align: "center", width: 180 },
        { columnName: "address", prop: "address", label: "地址", minWidth: 180 },
        { columnName: "name", prop: "name", label: "姓名", align: "center", width: 120 },
        { columnName: "user_name", prop: "user_name", label: "姓名", align: "center", width: 120 },
        { columnName: "mem_name", prop: "mem_name", label: "姓名", align: "center", width: 80 },
        {
            columnName: "avatar_url", label: "头像", align: "center", width: 120,
            render: function (h, context) {
                return (
                    <el-image
                        style="width: 80px; height: 100px"
                        fit="contain"
                        src={process.env.VUE_APP_FILE_PREFIX + context.row.avatar_url}
                        preview-src-list={[process.env.VUE_APP_FILE_PREFIX + context.row.avatar_url]}>
                        <div slot="error" class="image-slot">
                            <img src={defalutUrl} />
                        </div>
                    </el-image>
                );
            }
        },
        {
            columnName: "sex_txt", label: "性别", align: "center", width: 80,
            render: function (h, context) {
                let style;

                if (context.row.sex === 1) {
                    style = "color: green";
                } else {
                    style = "color: red";
                }
                return (
                    <span style={style}>{context.row.sex_txt}</span>
                );
            }
        },
        { columnName: "id_code", prop: "id_code", label: "身份证", align: "center", width: 150 },
        { columnName: "iphone", prop: "iphone", label: "电话号码", align: "center", width: 120 },
        { columnName: "remark", prop: "remark", label: "备注" },
        {
            columnName: "control_del",
            fixed: "right",
            prop: "control",
            label: "操作",
            align: "center",
            width: 100,
            render: function (h, context) {
                return (
                    <div>
                        <el-button type='danger' size="small" plain onClick={() => target.handleDelete(context.row)}>删除</el-button>
                    </div>
                );
            }
        },
        {
            columnName: "control_edit_del",
            prop: "control",
            fixed: "right",
            label: "操作",
            align: "center",
            width: 180,
            render: function (h, context) {
                return (
                    <div>
                        <el-button type="primary" size="small" plain onClick={() => target.editDialog(context.row)}>编辑</el-button>
                        <el-button type="danger" size="small" onClick={() => target.handleDelete(context.row)} plain>删除</el-button>
                    </div>
                );
            }
        }
    ];
}
