### 技术清单
1. 打包工具: parceljs, [中文地址](https://parceljs.docschina.org/),[英文地址](https://parceljs.org/)

2. 数据库mysql

3. orm: sequelizejs

### 返回状态码约定:
 * errCode: 错误码
 * errMsg: 错误信息
 * data: 返回数据
 
3. 数据库:
  create table fs-mock
	（
		id int unsigned not null auto_increment primary key,
		type enum(8) not null,
		sex char(4) not null,
		age tinyint unsigned not null,
		tel char(13) null default "-"
	);
4. todo:
 (1) express 插件使用
 (2) sequelizejs 使用
 (3) 如何通过饿了么 Node.js 面试
	https://github.com/ElemeFE/node-interview/tree/master/sections/zh-cn
 (4) node 入门小书
 https://www.nodebeginner.org/index-zh-cn.html#javascript-and-nodejs

 https://nqdeng.github.io/7-days-nodejs/