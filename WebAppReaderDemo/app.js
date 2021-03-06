var koa = require('koa');
var controller = require('koa-route');
var app = koa();
var views = require('co-views');
var koa_static = require('koa-static-server');

var service = require('./service/webAppService.js');

// 静态文件访问
app.use(koa_static({
	rootDir:'./static/',
	rootPath:'/static/',
	maxage:0
}));

var render = views('./view',{
	map:{html:'ejs'}
});

app.use(controller.get('/route_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body = 'Hello koa!';
}));

// ES6 generator 访问页面，数据绑定
app.use(controller.get('/ejs_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('test',{title:'title_test'});
}));

app.listen(3000);
console.log('koa server is started!!!')

// 后端数据访问
app.use(controller.get('/api_test',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_test_data();
}));

// 异步请求后端接口数据(线上)  127.0.0.1:3000/ajax/search?keyword=123&start=2&end=5
app.use(controller.get('/ajax/search',function*(){
	this.set('Cache-Control','no-cache');
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start,end,keyword);
}));
// 数据获取另一种方案：获取本地模拟数据 **.json

app.use(controller.get('/ajax/index',function*(){
	this.set('Cache-Control','no-cache');
	this.body = service.get_index_data();
}));

// 首页
app.use(controller.get('/',function*(){
	this.set('Cache-Control','no-cache');
	this.body = yield render('index',{title:'书城首页'});
}));


// TODO
// 排名

// 类目

// 书籍  根据id  参数处理

// 男频

// 女频