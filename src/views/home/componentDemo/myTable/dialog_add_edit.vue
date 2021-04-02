<template>
	<el-dialog
        v-dialogDrag
        :visible.sync="visible"
        :close-on-click-modal="false"
        :title="type === 'edit' ? '编辑人员' : '新增人员'"
        @closed="cancelForm"
    >
        <el-form
            :ref="formName"
            :model="member"
            :rules="rules"
            label-width="120px"
            label-position="right"
        >
            <el-form-item label="人员类型" prop="type">
                <el-select v-model="member.type" placeholder="请选择">
                    <el-option
                        v-for="item in params.member"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input
                    v-model="member.name"
                    placeholder="请输入登录名"
                    maxlength="50"
                />
            </el-form-item>
            <el-form-item label="所在部门" prop="dept_id">
                <el-cascader
                    v-model="member.dept_id"
                    :options="options"
                    @change="handleChange"
                    filterable
                ></el-cascader>
            </el-form-item>
            <el-form-item label="设备工号" prop="pin">
                <el-input
                    :disabled="member.hasPin"
                    type="number"
                    v-model="member.pin"
                    placeholder="请输入人员设备工号"
                    maxlength="20"
                />
            </el-form-item>
            <el-form-item label="证件号" prop="card">
                <el-input
                    v-model="member.card"
                    placeholder="请输入人员证件号"
                    maxlength="20"
                />
            </el-form-item>
            <el-form-item label="身份证" prop="id_code">
                <el-input
                    v-model="member.id_code"
                    placeholder="请输入人员身份证号码"
                />
            </el-form-item>
            <el-form-item label="性别">
                <el-radio v-model="member.sex" label="1">男</el-radio>
                <el-radio v-model="member.sex" label="0">女</el-radio>
            </el-form-item>
            <el-form-item label="电话号码" prop="iphone">
                <el-input
                    v-model="member.iphone"
                    placeholder="请输入人员电话号码"
                />
            </el-form-item>
        </el-form>
        <div style="text-align:right;">
            <el-button type="danger" @click="cancelForm"
                >取消</el-button
            >
            <el-button
                type="primary"
                @click="submitForm"
                :loading="loading"
                >确定</el-button
            >
        </div>
    </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSexFromIdCard } from '@/libs/utils'
import { isCardNo, isPhoneNumber } from '@/libs/validate'
export default {
    props: {
        options: {
            type: Array,
            // 对象或数组默认值必须从一个工厂函数获取
            default: () => []
        },
        defaultMember: {
            type: Object,
            // 对象或数组默认值必须从一个工厂函数获取
            default: () => {}
        },
    },
	data() {
        const validateIdCode = (rule, value, callback) => {
			if (!value) {
				callback()
			} else {
				if (isCardNo(value)) {
					// 回填性别
					this.member.sex = '' + getSexFromIdCard(value)
					callback()
				} else {
					callback(new Error('格式有误！'))
				}
			}
		}
		const validateMobile = (rule, value, callback) => {
			// if(value === '') {
			//   callback(new Error('请输入人员手机号码'));
			if (!value) {
				callback()
			} else {
				if (isPhoneNumber(value)) {
					callback()
				} else {
					callback(new Error('格式有误！'))
				}
			}
		}
		return {
            // 弹窗
            formName: 'memberForm',
			loading: false,
			visible: false,
			type: 'add',
			member: Object.assign({}, this.defaultMember),
			// 验证规则
			rules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' },
					{
						min: 2,
						max: 50,
						message: '长度在 2 到 50 个字符',
						trigger: 'blur',
					},
				],
				dept_id: [
					{ required: true, message: '请选择', trigger: 'blur' },
				],
				pin: [{ required: true, message: '请输入', trigger: 'blur' }],
				id_code: [{ validator: validateIdCode, trigger: 'blur' }],
				iphone: [{ validator: validateMobile, trigger: 'blur' }],
			},
		}
    },
    computed: {
        ...mapGetters({
            params: 'index/params',
        }),
    },
	mounted() {},
	methods: {
        handleChange(value) {
			const v = value[value.length - 1]
			// 获取部门名称
			this.options.forEach((item) => {
				if (item.value == v) {
					this.member.department_txt = item.label
				}
				// 查找子节点
				if (item.children) {
					item.children.forEach((c) => {
						if (c.value == v) {
							this.member.department_txt = c.label
						}
					})
				}
			})
		},
		handleAdd() {
			this.member = Object.assign({}, this.defaultMember)
			this.type = 'add'
			this.visible = true
		},
		handleEdit(scope) {
			let dept_id = []
			scope.dept_id && scope.dept_id.split(',').forEach((item) => {
				dept_id.push(+item)
			})
			this.member = {
				type: scope.type,
				name: scope.name,
				dept_id: dept_id,
				department_txt: scope.department_txt,
				sex: scope.sex,
				id_code: scope.id_code,
				iphone: scope.iphone,
				card: scope.card,
                pin: scope.pin,
                hasPin: scope.pin ? scope.pin.length > 0 : false,
				id: scope.id,
			}
			this.type = 'edit'
			this.visible = true
        },
        cancelForm() {
            this.$refs[this.formName].resetFields()
            this.visible = false
        },
        submitForm() {
			this.$refs[this.formName].validate((valid) => {
				if (valid) {
					// 组织参数
					const params = {
						id: this.member.id,
						type: this.member.type,
						name: this.member.name,
						id_code: this.member.id_code,
						iphone: this.member.iphone,
						sex: this.member.sex,
						card: this.member.card || '',
						pin: this.member.pin,
						dept_id: this.member.dept_id.slice(-1)[0],
						department: this.member.dept_id.slice(-1)[0],
						department_txt: this.member.department_txt,
					}
					// 区分新增与修改
					this.type == 'add' && this.submitFormAdd(params)
					this.type == 'edit' && this.submitFormEdit(params)
				} else {
					return false
				}
			})
		},
		async submitFormAdd(params) {
			this.loading = true
			const res = await this.$svc.admin_member_ad_post(params)
			this.loading = false
			if (!res) return // res为undefined，出错中止
			this.visible = false // 关闭弹窗
			this.$message.success('操作成功')
			this.$parent.$refs.table.handleFetch() // 刷新表格
		},
		async submitFormEdit(params) {
			this.loading = true
			const res = await this.$svc.admin_member_up_post(params)
			this.loading = false
			if (!res) return // res为undefined，出错中止
			this.visible = false // 关闭弹窗
			this.$message.success('修改成功')
			this.$parent.$refs.table.handleFetch() // 刷新表格
        },
	},
}
</script>

<style lang="scss" scoped></style>
