(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4593cc57"],{"0d5c":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"myTable pr"},[a("div",{staticClass:"topBar clearfix"},[a("p",{staticClass:"title fl"},[a("el-radio-group",{staticClass:"fl mr10",model:{value:e.showType,callback:function(t){e.showType=t},expression:"showType"}},[a("el-radio-button",{attrs:{label:"all"}},[e._v("全部人员")]),a("el-radio-button",{attrs:{label:"selected"}},[e._v("选中人员("+e._s(e.selectedData.length)+")")])],1),a("el-button",{attrs:{type:"primary",plain:"",disabled:0==e.selectedData.length},on:{click:e.batchDialog}},[e._v("批量修改")])],1),a("div",{staticClass:"bar-right"},[a("el-input",{staticClass:"mr10",staticStyle:{width:"180px"},attrs:{placeholder:"姓名/设备工号"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleSearch(t)}},model:{value:e.outParams.search,callback:function(t){e.$set(e.outParams,"search",t)},expression:"outParams.search"}}),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleSearch}},[e._v("查询")]),a("el-button",{attrs:{type:"success",icon:"el-icon-plus"},on:{click:e.addDialog}},[e._v("新增人员")])],1)]),a("div",{staticClass:"tableBox"},[a("MyTable",{ref:"table",attrs:{fetchFun:e.tableFetchFun,columnNames:e.tableColumnNames,outParams:e.outParams,selections:!0,showType:e.showType,rowKey:"id"},on:{selectedDataChange:e.selectedDataChange}})],1),a("DialogAddEdit",{ref:"dialog_add_edit",attrs:{options:e.options,defaultMember:e.defaultMember}}),a("DialogBatch",{ref:"dialog_batch",attrs:{options:e.options,defaultMember:e.defaultMember}})],1)},i=[],n=a("1da1"),l=(a("96cf"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{visible:e.visible,"close-on-click-modal":!1,title:"edit"===e.type?"编辑人员":"新增人员"},on:{"update:visible":function(t){e.visible=t},closed:e.cancelForm}},[a("el-form",{ref:e.formName,attrs:{model:e.member,rules:e.rules,"label-width":"120px","label-position":"right"}},[a("el-form-item",{attrs:{label:"人员类型",prop:"type"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.member.type,callback:function(t){e.$set(e.member,"type",t)},expression:"member.type"}},e._l(e.params.member,(function(e){return a("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})})),1)],1),a("el-form-item",{attrs:{label:"姓名",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入登录名",maxlength:"50"},model:{value:e.member.name,callback:function(t){e.$set(e.member,"name",t)},expression:"member.name"}})],1),a("el-form-item",{attrs:{label:"所在部门",prop:"dept_id"}},[a("el-cascader",{attrs:{options:e.options,filterable:""},on:{change:e.handleChange},model:{value:e.member.dept_id,callback:function(t){e.$set(e.member,"dept_id",t)},expression:"member.dept_id"}})],1),a("el-form-item",{attrs:{label:"设备工号",prop:"pin"}},[a("el-input",{attrs:{disabled:e.member.hasPin,type:"number",placeholder:"请输入人员设备工号",maxlength:"20"},model:{value:e.member.pin,callback:function(t){e.$set(e.member,"pin",t)},expression:"member.pin"}})],1),a("el-form-item",{attrs:{label:"证件号",prop:"card"}},[a("el-input",{attrs:{placeholder:"请输入人员证件号",maxlength:"20"},model:{value:e.member.card,callback:function(t){e.$set(e.member,"card",t)},expression:"member.card"}})],1),a("el-form-item",{attrs:{label:"身份证",prop:"id_code"}},[a("el-input",{attrs:{placeholder:"请输入人员身份证号码"},model:{value:e.member.id_code,callback:function(t){e.$set(e.member,"id_code",t)},expression:"member.id_code"}})],1),a("el-form-item",{attrs:{label:"性别"}},[a("el-radio",{attrs:{label:"1"},model:{value:e.member.sex,callback:function(t){e.$set(e.member,"sex",t)},expression:"member.sex"}},[e._v("男")]),a("el-radio",{attrs:{label:"0"},model:{value:e.member.sex,callback:function(t){e.$set(e.member,"sex",t)},expression:"member.sex"}},[e._v("女")])],1),a("el-form-item",{attrs:{label:"电话号码",prop:"iphone"}},[a("el-input",{attrs:{placeholder:"请输入人员电话号码"},model:{value:e.member.iphone,callback:function(t){e.$set(e.member,"iphone",t)},expression:"member.iphone"}})],1)],1),a("div",{staticStyle:{"text-align":"right"}},[a("el-button",{attrs:{type:"danger"},on:{click:e.cancelForm}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.submitForm}},[e._v("确定")])],1)],1)}),s=[],o=a("5530"),c=(a("159b"),a("1276"),a("ac1f"),a("b0c0"),a("fb6a"),a("2f62")),d=a("90fe");a("498a"),a("4d63"),a("25f0");function m(e){if(!e)return!1;e=e.trim();var t=/(^\d{15}$)|(^\d{17}(\d|X)$)/;return!1!==t.test(e)}function u(e){e=e||"",e=e.trim();var t=/(((\+\d{2}-)?-\d{2,3}-\d{7,8})|((\+\d{2}-)?(\d{2,3}-)?([1][3,4,5,7,8][0-9]\d{8})))$/,a=/^(?=\d{11}$)^1(?:(?:3(?!49)[4-9\D]|47|5[012789]|78|8[23478]|98)\d{8}$|(?:70[356])\d{7}$)/,r=/^(?=\d{11}$)^1(?:(?:3[0-2]|45|5[56]|66|7[156]|8[56])\d{8}$|(?:70[4789])\d{7}$)/,i=/^(?=\d{11}$)^1(?:(?:33|49|53|7[37]|8[019]|99|91)\d{8}$|(?:349|70[0-2])\d{7}$)/;return t.test(e)||a.test(e)||r.test(e)||i.test(e)}var b={props:{options:{type:Array,default:function(){return[]}},defaultMember:{type:Object,default:function(){}}},data:function(){var e=this,t=function(t,a,r){a?m(a)?(e.member.sex=""+Object(d["b"])(a),r()):r(new Error("格式有误！")):r()},a=function(e,t,a){t?u(t)?a():a(new Error("格式有误！")):a()};return{formName:"memberForm",loading:!1,visible:!1,type:"add",member:Object.assign({},this.defaultMember),rules:{name:[{required:!0,message:"请输入姓名",trigger:"blur"},{min:2,max:50,message:"长度在 2 到 50 个字符",trigger:"blur"}],dept_id:[{required:!0,message:"请选择",trigger:"blur"}],pin:[{required:!0,message:"请输入",trigger:"blur"}],id_code:[{validator:t,trigger:"blur"}],iphone:[{validator:a,trigger:"blur"}]}}},computed:Object(o["a"])({},Object(c["c"])({params:"index/params"})),mounted:function(){},methods:{handleChange:function(e){var t=this,a=e[e.length-1];this.options.forEach((function(e){e.value==a&&(t.member.department_txt=e.label),e.children&&e.children.forEach((function(e){e.value==a&&(t.member.department_txt=e.label)}))}))},handleAdd:function(){this.member=Object.assign({},this.defaultMember),this.type="add",this.visible=!0},handleEdit:function(e){var t=[];e.dept_id&&e.dept_id.split(",").forEach((function(e){t.push(+e)})),this.member={type:e.type,name:e.name,dept_id:t,department_txt:e.department_txt,sex:e.sex,id_code:e.id_code,iphone:e.iphone,card:e.card,pin:e.pin,hasPin:!!e.pin&&e.pin.length>0,id:e.id},this.type="edit",this.visible=!0},cancelForm:function(){this.$refs[this.formName].resetFields(),this.visible=!1},submitForm:function(){var e=this;this.$refs[this.formName].validate((function(t){if(!t)return!1;var a={id:e.member.id,type:e.member.type,name:e.member.name,id_code:e.member.id_code,iphone:e.member.iphone,sex:e.member.sex,card:e.member.card||"",pin:e.member.pin,dept_id:e.member.dept_id.slice(-1)[0],department:e.member.dept_id.slice(-1)[0],department_txt:e.member.department_txt};"add"==e.type&&e.submitFormAdd(a),"edit"==e.type&&e.submitFormEdit(a)}))},submitFormAdd:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.loading=!0,a.next=3,t.$svc.admin_member_ad_post(e);case 3:if(r=a.sent,t.loading=!1,r){a.next=7;break}return a.abrupt("return");case 7:t.visible=!1,t.$message.success("操作成功"),t.$parent.$refs.table.handleFetch();case 10:case"end":return a.stop()}}),a)})))()},submitFormEdit:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.loading=!0,a.next=3,t.$svc.admin_member_up_post(e);case 3:if(r=a.sent,t.loading=!1,r){a.next=7;break}return a.abrupt("return");case 7:t.visible=!1,t.$message.success("修改成功"),t.$parent.$refs.table.handleFetch();case 10:case"end":return a.stop()}}),a)})))()}}},p=b,h=a("2877"),f=Object(h["a"])(p,l,s,!1,null,"571d321d",null),g=f.exports,v=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{visible:e.visible,"close-on-click-modal":!1,title:"批量修改"},on:{"update:visible":function(t){e.visible=t},closed:e.cancelForm}},[a("el-form",{ref:e.formName,attrs:{model:e.batch,rules:e.rules,"label-width":"120px","label-position":"right"}},[a("el-form-item",{attrs:{label:"人员类型",prop:"type"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.batch.type,callback:function(t){e.$set(e.batch,"type",t)},expression:"batch.type"}},e._l(e.params.member,(function(e){return a("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})})),1)],1),a("el-form-item",{attrs:{label:"所在部门",prop:"dept_id"}},[a("el-cascader",{attrs:{options:e.options,filterable:""},model:{value:e.batch.dept_id,callback:function(t){e.$set(e.batch,"dept_id",t)},expression:"batch.dept_id"}})],1)],1),a("div",{staticStyle:{"text-align":"right"}},[a("el-button",{attrs:{type:"danger"},on:{click:e.cancelForm}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.submitForm}},[e._v("确定")])],1)],1)},_=[],y=(a("a15b"),{props:{options:{type:Array,default:function(){return[]}},defaultMember:{type:Object,default:function(){}}},data:function(){return{formName:"batchForm",loading:!1,visible:!1,batch:{type:"1",dept_id:""},rules:{dept_id:[{required:!0,message:"请选择",trigger:"blur"}]}}},computed:Object(o["a"])({},Object(c["c"])({params:"index/params"})),mounted:function(){},methods:{handleBatch:function(){var e=[];this.$parent.$refs.table.selectedItems.forEach((function(t){e.push(t.id)})),this.batch.type=this.defaultMember.type,this.batch.dept_id=this.defaultMember.dept_id,this.batch.ids=e.join(),this.visible=!0},cancelForm:function(){this.$refs[this.formName].resetFields(),this.visible=!1},submitForm:function(){var e=this;this.$refs[this.formName].validate((function(t){if(!t)return!1;var a={ids:e.batch.ids,type:e.batch.type,dept_id:e.batch.dept_id.slice(-1)[0]};e.submitFormBatch(a)}))},submitFormBatch:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.loading=!0,a.next=3,t.$svc.admin_member_batch_post(e);case 3:if(r=a.sent,t.loading=!1,r){a.next=7;break}return a.abrupt("return");case 7:t.visible=!1,t.$message.success("修改成功"),t.$parent.$refs.table.selectedItems=[],t.$parent.$refs.table.handleFetch(),t.$parent.$refs.table.$refs.table.clearSelection();case 12:case"end":return a.stop()}}),a)})))()}}}),x=y,$=Object(h["a"])(x,v,_,!1,null,"4af0e3d4",null),k=$.exports,w={name:"myTable",components:{DialogAddEdit:g,DialogBatch:k},data:function(){return{showType:"all",selectedData:[],outParams:{id:0,search:""},tableColumnNames:["myTable_name","myTable_date","myTable_address","control_edit_del"],data:[],options:[],defaultMember:{type:"1",name:"",dept_id:"",sex:"1",id_code:"",iphone:""}}},computed:{tableFetchFun:function(){return this.$svc.api_table_post}},mounted:function(){},methods:{selectedDataChange:function(e){this.selectedData=e},handleSearch:function(){this.$refs.table.page=1,this.$refs.table.handleFetch()},handleDelete:function(e){var t=this;this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.deleteCommit(e)})).catch((function(){}))},deleteCommit:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var r,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r={id:e.id},a.next=3,t.$svc.admin_member_del_get(r);case 3:if(i=a.sent,i){a.next=6;break}return a.abrupt("return");case 6:t.$message.success("操作成功"),t.$refs.table.handleFetch();case 8:case"end":return a.stop()}}),a)})))()},addDialog:function(){this.$refs.dialog_add_edit.handleAdd()},editDialog:function(e){this.$refs.dialog_add_edit.handleEdit(e)},batchDialog:function(e){this.$refs.dialog_batch.handleBatch(e)}}},F=w,D=(a("2ea3"),Object(h["a"])(F,r,i,!1,null,"8d2193cc",null));t["default"]=D.exports},"2ea3":function(e,t,a){"use strict";a("dfb5")},dfb5:function(e,t,a){}}]);
//# sourceMappingURL=chunk-4593cc57.73f896da.js.map