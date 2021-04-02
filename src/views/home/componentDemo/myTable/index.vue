<template>
	<div class="myTable pr">
        <div class="topBar clearfix">
            <p class="title fl">
                <el-radio-group v-model="showType" class="fl mr10">
                    <el-radio-button label="all">全部人员</el-radio-button>
                    <el-radio-button label="selected">选中人员({{selectedData.length}})</el-radio-button>
                </el-radio-group>
                <el-button type="primary" plain @click="batchDialog" :disabled="selectedData.length==0">批量修改</el-button>
            </p>
            <div class="bar-right">
                <el-input
                    class="mr10"
                    style="width: 180px"
                    v-model="outParams.search"
                    placeholder="姓名/设备工号"
                    @keyup.enter.native="handleSearch"
                ></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
                <el-button type="success" icon="el-icon-plus" @click="addDialog">新增人员</el-button>
            </div>
        </div>
        <div class="tableBox">
            <MyTable
                ref="table"
                :fetchFun="tableFetchFun"
                :columnNames="tableColumnNames"
                :outParams="outParams"
                :selections="true"
                :showType="showType"
                @selectedDataChange="selectedDataChange"
                rowKey="id"
            ></MyTable>
        </div>

		<!--新增编辑弹窗-->
        <DialogAddEdit 
            ref="dialog_add_edit"
            :options="options"
            :defaultMember="defaultMember"
        />
        <!--批量修改弹窗-->
		<DialogBatch
            ref="dialog_batch"
            :options="options"
            :defaultMember="defaultMember"
        />
	</div>
</template>

<script>
import DialogAddEdit from './dialog_add_edit'
import DialogBatch from './dialog_batch'
export default {
    name: 'myTable',
    components: {
        DialogAddEdit,
        DialogBatch
    },
	data() {
		return {
            // 表格相关
            showType: "all", // 表格显示数据类型
            selectedData: [], // 选中表格数据
			outParams: {
                id: 0,
                search: ''
			},
			tableColumnNames: ["myTable_name", "myTable_date", "myTable_address", "control_edit_del"],
            // 子组件使用数据
            data: [],
            options: [],
            defaultMember: {
                type: '1',
                name: '',
                dept_id: '',
                sex: '1',
                id_code: '',
                iphone: '',
            },
		}
	},
	computed: {
		// 获取表格数据方法
		tableFetchFun: function() {
			return this.$svc.api_table_post
        },
	},
	mounted() {
	},
	methods: {
        /////// 表格相关
        selectedDataChange(val){
            this.selectedData = val;
        },
        handleSearch() {
            this.$refs.table.page = 1
            this.$refs.table.handleFetch()
        },
        handleDelete(scope) {
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteCommit(scope);
            }).catch(() => {});
        },
        async deleteCommit(scope) {
            const params = {
                id: scope.id
            }
			const res = await this.$svc.admin_member_del_get(params)
			if (!res) return // res为undefined，出错中止
			this.$message.success('操作成功')
			this.$refs.table.handleFetch() // 刷新表格
        },
        // 弹窗-新增编辑
        addDialog() {
			this.$refs.dialog_add_edit.handleAdd()
		},
		editDialog(scope) {
            this.$refs.dialog_add_edit.handleEdit(scope)
		},
        // 弹窗-批量修改
        batchDialog(scope) {
            this.$refs.dialog_batch.handleBatch(scope)
		},
	},
}
</script>

<style lang="css" scoped>
/* 人员管理 */
.person {
	margin-left: 266px;
}
.topBar {
    position: relative;
	background-color: #fff;
	min-height: 50px;
	box-sizing: border-box;
	padding: 10px;
}
.topBar .title {
	margin: 0;
	line-height: 40px;
	font-weight: bold;
	font-size: 16px;
}
.topBar .bar-right{
    position: absolute;
    top: 10px;
    right: 10px;
}

.tableBox {
	margin-top: 10px;
	background-color: #fff;
	padding: 10px;
	box-sizing: border-box;
}
.tableBox tbody tr {
	height: 40px;
	line-height: 40px;
}
</style>
