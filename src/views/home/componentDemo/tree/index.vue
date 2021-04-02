<template>
    <!--部门管理-->
    <div class="org">
        <div class="topBar">
            <el-button type="success" icon="el-icon-plus" @click="appendTop">新增单位</el-button>
        </div>
        <el-tree
            class="mt10"
            :data="data"
            node-key="id"
            :props="defaultProps"
            accordion
            highlight-current
            :expand-on-click-node="false"
        >
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <template v-if="!data.edit">
                    <span
                        ><i class="el-icon-folder-opened"></i
                        >{{ data.name }}</span
                    >
                    <span class="el-btn">
                        <el-button
                            v-if="data.level < 2 && data.id != 1"
                            type="success"
                            icon="el-icon-plus"
                            circle
                            size="mini"
                            @click="() => append(data)"
                        >
                        </el-button>
                        <el-button
                            v-if="data.level > 0"
                            type="primary"
                            icon="el-icon-edit"
                            circle
                            size="mini"
                            @click="() => edit(data)"
                        >
                        </el-button>
                        <el-button
                            v-if="data.level > 0"
                            type="danger" icon="el-icon-delete" circle
                            size="mini"
                            @click="() => remove(node, data)"
                        >
                        </el-button>
                    </span>
                </template>
                <template v-else>
                    <el-input
                        ref="inputs"
                        style="width: 120px"
                        size="small"
                        maxlength="8"
                        v-model="data.name"
                        @keyup.enter.native="editCommit(data)"
                    />
                    <span class="el-btn">
                        <el-button
                            type="success"
                            icon="el-icon-check"
                            circle
                            size="mini"
                            @click="() => editCommit(data)"
                        >
                        </el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-close"
                            circle
                            size="mini"
                            @click="() => cancel(data)"
                        >
                        </el-button>
                    </span>
                </template>
            </span>
        </el-tree>
    </div>
</template>

<script>
export default {
    name: 'org',
	data() {
		return {
			// 组织机构数据
			defaultProps: {
				children: 'children',
				label: 'name',
            },
            data: [], // 部门数据
            options: [], // 部门数据-供选择
		}
	},
	mounted() {
        this.deptAllLists()
	},
	methods: {
        // 获取部门数据
        async deptAllLists() {
			const res = await this.$svc.api_tree_post()
			if (!res) return // res为undefined，出错中止
			// 添加上pid
			// 第一层-单位层
			res.data.data.forEach((item, index) => {
				item.pid = 0
				// 选择部门使用
				this.options[index] = {}
				this.options[index].value = item.id
				this.options[index].label = item.name

				// 第二层-部门层
				if (item.children && item.children.length > 0) {
					// 选择部门使用
					this.options[index].children = []

					item.children.forEach((c, i) => {
						// 选择部门使用
						this.options[index].children[i] = {}
						this.options[index].children[i].value = c.id
						this.options[index].children[i].label = c.name

						c.pid = item.id
					})
				}
			})
			// 部门修改使用
			this.data = res.data.data
			// 清空标识
			delete this.deptFlag
        },
		append(data) {
			const newChild = {
				pid: data.id,
				name: '',
				edit: true,
				level: data.level + 1,
			}
			if (!data.children) {
				this.$set(data, 'children', [])
			}
			data.children.push(newChild)
			this.deptFlag = 'add' // 新增标识
			// 输入聚焦
			this.$nextTick(() => {
				//正确写法
				this.$refs.inputs.focus()
			})
		},
		appendTop() {
			const newChild = {
				pid: 0,
				name: '',
				edit: true,
				level: 1,
				children: [],
			}
			this.data.push(newChild)
			this.deptFlag = 'add' // 新增标识
			// 输入聚焦
			this.$nextTick(() => {
				//正确写法
				this.$refs.inputs.focus()
			})
		},
		edit(data) {
			this.$set(data, 'edit', true)
			this.deptFlag = 'edit' // 新增标识
		},
		editCommit(data) {
			if (data.name.length == 0) {
				this.$message.error('不能为空!')
				return
			}
			data.edit = false
			// 区分新增与修改
			this.deptFlag == 'add' && this.commitAdd(data)
			this.deptFlag == 'edit' && this.commitEdit(data)
		},
		// 取消
		cancel(data) {
			this.$set(data, 'edit', false)
			// 组织架构刷新
			this.deptAllLists()
		},
		// 提交新增
		async commitAdd(data) {
			const params = {
				pid: data.pid,
				name: data.name,
				level: data.level,
			}
			const res = await this.$svc.admin_dept_ad_post(params)
			if (!res) return // res为undefined，出错中止
			this.$message.success('新增完成!')
			// 清空标识
			delete this.deptFlag
			// 组织架构刷新
			this.deptAllLists()
		},
		// 提交修改
		async commitEdit(data) {
			const params = {
				pid: data.pid,
				id: data.id,
				name: data.name,
				level: data.level,
			}
			const res = await this.$svc.admin_dept_up_post(params)
			if (!res) return // res为undefined，出错中止
			this.$message.success('修改成功!')
			// 清空标识
			delete this.deptFlag
		},
		remove(node, data) {
			const parent = node.parent
			const children = parent.data.children || parent.data
			const index = children.findIndex((d) => d.id === data.id)
			children.splice(index, 1)
			this.commit(node)
        },
	},
}
</script>

<style lang="scss" scoped>
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

.org /deep/ .el-tree {
	padding: 10px;
	border: 1px solid #f4f4f4;
}
.org /deep/ .el-tree .el-tree-node__content {
	height: auto;
	line-height: 2.8;
}
.el-btn {
	margin-left: 10px;
	margin-right: 10px;
}
.el-button--mini.is-circle {
	padding: 3px;
}
</style>
