# 修改主题色

在项目根目录的命令行执行：

1、初始化变量文件
node_modules/.bin/et --init src/assets/css/element-variables.scss
2、修改主题色
3、编译主题
node_modules/.bin/et --config src/assets/css/element-variables.scss --out src/assets/css/theme
