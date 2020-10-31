import defalutUrl from "@/assets/images/default-photo.png";
/*
 * columnName：数组的唯一标识
 * render:表示函数式组件，供渲染
 */
export default function (target) {
  return [
    // 表格测试
    { columnName: "date", prop: "date", label: "日期", width: 180 },
    { columnName: "date1", prop: "date1", label: "日期1", align: "center", width: 180 },
    { columnName: "address", prop: "address", label: "地址", minWidth: 180 },
    // 通用
    { columnName: "name", prop: "name", label: "姓名", align: "center", width: 120 },
    { columnName: "user_name", prop: "user_name", label: "姓名", align: "center", width: 120 },
    { columnName: "mem_name", prop: "mem_name", label: "姓名", align: "center", width: 80 },
    {
      columnName: "sex_txt", label: "性别", align: "center", width: 80,
      render: function (h, context) {
        let style;
        if (context.row.sex == 1) {
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
    { columnName: "remark", prop: "remark", label: "备注"},
    {
      columnName: "control_del",
      fixed: "right",
      prop: "control",
      label: "操作",
      align: "center",
      width: 240,
      render: function (h, context) {
        return (
          <div>
            <el-button type='danger' size="small" plain onClick={() => target.handleDel(context.row)}>删除</el-button>
          </div>
        );
      }
    },
    
    // 系统管理-人员管理
    { columnName: "pin", prop: "pin", label: "设备工号", align: "center", width: 80 },
    { columnName: "avatar_url", label: "头像", align: "center", width: 120,
      render: function (h, context) {
        return (
          <el-image 
            style="width: 80px; height: 100px"
            fit="contain"
            src={process.env.VUE_APP_FILE_PREFIX + context.row.avatar_url} 
            preview-src-list={[process.env.VUE_APP_FILE_PREFIX + context.row.avatar_url]}>
              <div slot="error" class="image-slot">
                  <img src={defalutUrl}/>
                </div>
          </el-image>
        );
      }
    },
    { columnName: "card", prop: "card", label: "证件号", align: "center", width: 120 },
    {
      columnName: "dp_department_txt_0", label: "所在单位",
      render: function (h, context) {
        return (
          <span>{context.row.department_txt.split('/')[0]}</span>
        );
      }
    },
    {
      columnName: "dp_department_txt_1", label: "所在部门", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.department_txt.split('/')[1]}</span>
        );
      }
    },
    { columnName: "dp_type_txt", prop: "type_txt", label: "人员类型", align: "center", width: 80 },
    {
      columnName: "dp_control",
      prop: "control",
      fixed: "right",
      label: "操作",
      align: "center",
      width: 100,
      render: function (h, context) {
        return (
          <div>
            <el-button type="primary" size="small" plain onClick={() => target.handleEdit(context.row)}>编辑</el-button>
            {/* <el-button type="danger" size="small" onClick="" plain>删除</el-button> */}
          </div>
        );
      }
    },
    // 系统管理-角色管理
    { columnName: "role_name", prop: "role_name", label: "角色名称", width: 180 },
    { columnName: "role_rules_txt", prop: "rules_txt", label: "菜单权限" },
    {
      columnName: "role_control",
      fixed: "right",
      label: "操作",
      align: "center",
      width: 120,
      render: function (h, context) {
        return (
          <div>
            <el-button type="primary" size="small" plain onClick={() => target.handleEdit(context.row)}>授权</el-button>
          </div>
        );
      }
    },
    // 系统管理-账号
    { columnName: "login_name", prop: "name", label: "登录名", align: "center", width: 120 },
    {
      columnName: "role", label: "绑定角色",
      render: function (h, context) {
        return (
          <span>{context.row.role.name}</span>
        );
      }
    },
    {
      columnName: "control",
      fixed: "right",
      prop: "control",
      label: "操作",
      align: "center",
      width: 240,
      render: function (h, context) {
        return (
          <div>
            <el-button type="warning" size="small" plain onClick={() => target.resetPass(context.row)}>重置密码</el-button>
            <el-button type="primary" size="small" plain onClick={() => target.handleEdit(context.row)}>编辑</el-button>
            {/* <el-button type="danger" size="small" onClick="" plain>删除</el-button> */}
          </div>
        );
      }
    },
    // 谈话室列表
    { columnName: "room_name", prop: "name", label: "谈话室名称" },
    { columnName: "room_type_txt", prop: "type_txt", label: "谈话室类型", align: "center", width: 180 },
    {
      columnName: "room_is_toilet", label: "有无厕所", align: "center", width: 180,
      render: function (h, context) {
        let style, str;
        if (context.row.is_toilet == 1) {
          style = "color: green";
          str = "有";
        } else {
          style = "color: red";
          str = "无";
        }
        return (
          <span style={style}>{str}</span>
        );
      }
    },
    { columnName: "room_status_txt", prop: "status_txt", label: "状态", align: "center", width: 180 },
    {
      columnName: "room_control",
      fixed: "right",
      label: "操作",
      align: "center",
      width: 120,
      render: function (h, context) {
        return (
          <div>
            <el-button type="primary" size="small" plain onClick={() => target.handleEdit(context.row)}>编辑</el-button>
          </div>
        );
      }
    },
    // 进出登记
    { columnName: "inout_type", prop: "type_txt", label: "进入类型", align: "center", width: 100 },
    { columnName: "inout_dept_name", prop: "dept_name", label: "所在单位", align: "center", width: 120 },
    { columnName: "inout_dept_name_1", prop: "dept_name_1", label: "所在部门", align: "center", width: 120 },
    { columnName: "inout_time", prop: "handle_time", label: "进入时间", align: "center", width: 150 },
    { columnName: "inout_leave", prop: "leave", label: "离开时间", align: "center", width: 150 },
    { columnName: "inout_handle", prop: "handle", label: "事由" },
    {
      columnName: "inout_control",
      fixed: "right",
      label: "操作",
      align: "center",
      width: 120,
      render: function (h, context) {
        return (
          <div>
            <el-button type="primary" size="small" plain onClick={() => target.handleEdit(context.row)}>编辑</el-button>
          </div>
        );
      }
    },
    // 申请表单管理
    { columnName: "apply_room", prop: "room", label: "房间数量", align: "center", width: 80 },
    {
      columnName: "apply_time", label: "申请时间", align: "center", width: 180,
      render: function (h, context) {
        return (
          <span>{context.row.start_time}~{context.row.end_time}</span>
        );
      }
    },
    { columnName: "apply_day", prop: "day", label: "申请天数", align: "center", width: 80},
    { columnName: "apply_status", label: "状态", align: "center", width: 120,
      render: function(h, context) {
        let style, str;
        if(context.row.status == 1) {
          style = "color: green";
          str = "生效";
        } else {
          style = "color: red";
          str = "作废";
        }
        return (
          <span style={style}>{str}</span>
        );
      }
    },
    { columnName: "apply_day", prop: "day", label: "申请天数", align: "center", width: 80 },
    { columnName: "apply_status", prop: "status", label: "状态", align: "center", width: 120 },
    {
      columnName: "apply_control",
      fixed: "right",
      label: "操作",
      align: "center",
      width: 180,
      render: function (h, context) {
        return (
          <div>
            <el-button size="small" plain onClick={() => target.handleEdit(context.row, 'view')}>详情</el-button>
            <el-button type="primary" size="small" plain onClick={() => target.handleEdit(context.row, 'edit')}>编辑</el-button>
          </div>
        );
      }
    },
    // 谈话室使用记录
    { columnName: "room_mem_name", prop: "mem_name", label: "登记人", align: "center", width: 80 },
    {
      columnName: "room_txt", label: "房间名称", width: 120,
      render: function (h, context) {
        return (
          <span>{context.row.room_txt.split('(')[0]}</span>
        );
      }
    },
    {
      columnName: "room_txt_type", label: "房间类型", align: 'center', width: 120,
      render: function (h, context) {
        return (
          <span>{context.row.room_txt.split('(')[1].replace(')', '')}</span>
        );
      }
    },
    {
      columnName: "apply_his_dept_name", label: "所在单位",
      render: function (h, context) {
        return (
          <span>{context.row.dept_name.split('/')[0]}</span>
        );
      }
    },
    {
      columnName: "apply_his_dept_name_1", label: "所在部门", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.dept_name.split('/')[1]}</span>
        );
      }
    },
    {
      columnName: "apply_his_time", label: "使用时间", align: "center", width: 280,
      render: function (h, context) {
        return (
          <span>{context.row.start_time}~{context.row.end_time}</span>
        );
      }
    },
    {
      columnName: "apply_his_control",
      fixed: "right",
      label: "操作",
      align: "center",
      width: 120,
      render: function (h, context) {
        return (
          <div>
            <el-button size="small" plain onClick={() => target.handleEdit(context.row, 'view')}>详情</el-button>
          </div>
        );
      }
    },

    //安保管理-巡检记录
    {
      columnName: "abxj_water", label: "水", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.water==1 ? '正常' : '异常'}</span>
        );
      },
    },
    {
      columnName: "abxj_electric", label: "电器设备", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.electric==1 ? '正常' : '异常'}</span>
        );
      }
    },
    {
      columnName: "abxj_door", label: "门禁", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.door==1 ? '正常' : '异常'}</span>
        );
      }
    },
    {
      columnName: "abxj_window", label: "窗口", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.window==1 ? '正常' : '异常'}</span>
        );
      }
    },
    {
      columnName: "abxj_light", label: "灯光照明", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.light==1 ? '正常' : '异常'}</span>
        );
      }
    },
    {
      columnName: "abxj_air_conditioner", label: "空调", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.air_conditioner==1 ? '正常' : '异常'}</span>
        );
      }
    },
    {
      columnName: "abxj_building", label: "建筑物", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.building==1 ? '正常' : '异常'}</span>
        );
      }
    },
    { columnName: "apply_others", prop: "others", label: "其它检查情况" },
    {
      columnName: "abxj_datetime", label: "巡查时间", align: "center", width: 180,
      render: function (h, context) {
        return (
          <span>{context.row.date} {context.row.time}</span>
        );
      }
    },
    { columnName: "apply_check_name", prop: "user_name", label: "巡检人",width: 100 },

    //运维巡检-巡检记录
    {
      columnName: "ywxj_electric_device", label: "机房设备", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.electric_device==1  ? '正常' : '异常'}</span>
        );
      },
    },
    {
      columnName: "ywxj_watchdog_device", label: "监控设备", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.watchdog_device==1 ? '正常' : '异常'}</span>
        );
      },
    },
    {
      columnName: "ywxj_print_device", label: "打印设备", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.print_device==1 ? '正常' : '异常'}</span>
        );
      },
    },
    {
      columnName: "ywxj_office_device", label: "办公设备", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.office_device==1 ? '正常' : '异常'}</span>
        );
      },
    },
    {
      columnName: "ywxj_duty_device", label: "值班室设备", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.duty_device==1 ? '正常' : '异常'}</span>
        );
      },
    },
    {
      columnName: "ywxj_talk_device", label: "谈话室设备", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.talk_device==1 ? '正常' : '异常'}</span>
        );
      },
    },
    {
      columnName: "ywxj_fire_device", label: "消防监控设备", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.fire_device==1 ? '正常' : '异常'}</span>
        );
      },
    },
    {
      columnName: "ywxj_protect_device", label: "安防监控设备", align: "center", width: 100,
      render: function (h, context) {
        return (
          <span>{context.row.protect_device==1 ? '正常' : '异常'}</span>
        );
      },
    },

    //监控管理-异常记录
    { columnName: "watch_dept_name", prop: "dept_name", label: "办案部门" },
    { columnName: "watch_room_name", prop: "room_name", label: "谈话室名称" },
    { columnName: "watch_watch_txt", prop: "watch_txt", label: "异常类别" },
    { columnName: "watch_create_time", prop: "create_time", label: "登记时间" },
    { columnName: "watch_create_man_name", prop: "create_man_name", label: "记录人" },
    //系统配置-配置项列表
    { columnName: "options_name", prop: "name", label: "配置名称" },
    { columnName: "options_other", prop: "other", label: "描述" },
    {
      columnName: "options_status", label: "状态", align: "center", width: 100,
      render: function (h, context) {
        return (
          <el-switch
            value={context.row.status+''}
            active-value='1'
            inactive-value='0'
            active-color="#13ce66"
            inactive-color="#ff4949"
            onChange={() => target.handleSwitch(context.row)}
            >
          </el-switch>
        );
      },
    },
    {
      columnName: "options_control",
      fixed: "right",
      label: "操作",
      align: "center",
      width: 180,
      render: function (h, context) {
        return (
          <div>
            <el-button size="small" plain onClick={() => target.handleEdit(context.row, 'view')}>编辑</el-button>
          </div>
        );
      }
    },
    //统计分析-申请表
    { columnName: "statistic_dept_name", prop: "name", label: "办案部门",  },
    { columnName: "statistic_apply_time", label: "申请时间",
      render: function (h, context) {
        return (
        <span>{context.row.apply_time.join()}</span>
        );
      },
    },
    { columnName: "statistic_apply_days", prop: "apply_days", label: "申请天数", width: 120, align: "center" },
    { columnName: "statistic_use_days", prop: "use_days", label: "实际使用天数", width: 150, align: "center" },
    { columnName: "statistic_use_rooms", prop: "use_rooms", label: "房间使用数", width: 150, align: "center" },
    //统计分析-谈话室
    { columnName: "statistic_room_txt", prop: "room_txt", label: "谈话室", width: 180 },
    { columnName: "start_time", prop: "start_time", label: "启用时间", width: 180, align: 'center' },
    { columnName: "end_time", prop: "end_time", label: "结束时间", width: 180, align: 'center' },
    { columnName: "statistic_room_dept_name", prop: "dept_name", label: "办案部门", minWidth: 120 },
    { columnName: "pre_check", prop: "pre_check", label: "房间预检情况", width: 100 },
    { columnName: "vcd", prop: "vcd", label: "领取刻录光盘数", width: 120, align: "center" },
    // chidren设置多级表头
    { columnName: "pen", label: "专用笔", children:
      [
        { columnName: "pen_pen", prop: "pen", label: "领取专用笔数", width: 100, align: 'center' },
        { columnName: "pen_is_pen", prop: "is_pen", label: "是否归还", width: 100, align: 'center',
          render: function (h, context) {
            let style, str;
            if (context.row.is_pen == 1) {
              style = "color: green";
              str = "是";
            } else {
              style = "color: red";
              str = "否";
            }
            return (
              <span style={style}>{str}</span>
            );
          },
        },
      ]
    },
    { columnName: "spoon", label: "专用勺", children:
      [
        { columnName: "spoon_spoon", prop: "spoon", label: "领取专用勺数", width: 100, align: 'center' },
        { columnName: "spoon_is_spoon", prop: "is_spoon", label: "是否归还", width: 100, align: 'center',
          render: function (h, context) {
            let style, str;
            if (context.row.is_spoon == 1) {
              style = "color: green";
              str = "是";
            } else {
              style = "color: red";
              str = "否";
            }
            return (
              <span style={style}>{str}</span>
            );
          },
        },
      ]
    },
    { columnName: "card", label: "房卡", children:
      [
        { columnName: "card_card", prop: "card", label: "领取房卡数", width: 100, align: 'center' },
        { columnName: "card_is_card", prop: "is_card", label: "是否归还", width: 100, align: 'center',
          render: function (h, context) {
            let style, str;
            if (context.row.is_card == 1) {
              style = "color: green";
              str = "是";
            } else {
              style = "color: red";
              str = "否";
            }
            return (
              <span style={style}>{str}</span>
            );
          },
        },
      ]
    },
    { columnName: "escort", prop: "escort", label: "谈话人", minWidth: 100},
    { columnName: "speaker", prop: "speaker", label: "工作人员", width: 100},
    //统计分析-进出登记
    { columnName: "inout_num", prop: "count", label: "进出人数", align: 'center' },
  ];
}
