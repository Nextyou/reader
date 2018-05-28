// 功能：用来连通前端和后端数据
var fs = require('fs');
exports.get_test_data = function(){
	var content = fs.readFileSync('./mock/test.json','utf-8');
	return content;
}

// 获取服务器数据，搜索数据是根据线上api获得，其他通过本地模拟数据
exports.get_search_data = function(start,end,keyword){
	return function(cb){
		var http = require('http');
		var qs = require('querystring');
		//{a:'1'} http://127.0.0.1/api?a=1
		var data = {
			s:keyword,
			start:start,
			end:end
		};
		var content = qs.stringify(data);
		var http_request = {
			hostname:'dushu.xiaomi.com',
			port:80,
			path:'/store/v0/lib/query/onebox?'+content
		}
		req_obj = http.request(http_request,function(_res){
			var content ='';
			_res.setEncoding('utf8');
			_res.on('data',function(chuck){
				content+=chuck;
			});
			_res.on('end',function(){
				cb(null,content);
			});
		});

		req_obj.on('error',function(){

		});
		req_obj.end();
	}
}


// 获取首页本地json模拟数据
exports.get_index_data = function(){
	var content = fs.readFileSync('./mock/home.json','utf-8');
	return content;
}
// TODO
// 排名

// 类目

// 书籍  根据id  参数处理

// 男频

// 女频