import Vue from "vue";
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification,
  Image,
  Link,
  Divider,
  Timeline,
  TimelineItem,
  Calendar,
  Avatar,
  Popconfirm
} from "element-ui";
import "element-ui/lib/theme-chalk/base.css";
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
import lodash from "lodash";
import moment from "moment";
import echarts from "echarts";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import VueUeditorWrap from "vue-ueditor-wrap";
import svc from "@/service";
import MyTable from "@/components/element-ui/myTable";
import Echart from "@/components/vue/echart";
import baiduMap from "@/components/vue/baiduMap";
import * as d3 from "d3";

// 注册第三方组件
// 注册element通用组件
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Image);
Vue.use(Link);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Calendar);
Vue.use(Divider);
Vue.use(Avatar);
Vue.use(Popconfirm);
Vue.use(Loading.directive);
// 注册element（折叠展开动画）组件
Vue.component(CollapseTransition.name, CollapseTransition);
// 注册树选择组件
Vue.component("Treeselect", Treeselect);
// 注册编辑器组件
Vue.component("vue-ueditor-wrap", VueUeditorWrap);
Vue.component(baiduMap.name, baiduMap);

// 注册自定义组件
// 注册表格组件
Vue.component(MyTable.name, MyTable);
// 注册图表组件
Vue.component(Echart.name, Echart);

// vue对象原型扩展-element-ui
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
// vue对象原型扩展-其他
Vue.prototype.$svc = svc;
Vue.prototype.$lodash = lodash;
Vue.prototype.$moment = moment;
Vue.prototype.$echarts = echarts;
Vue.prototype.$d3 = d3;
