# 配置https服务器
http://blog.csdn.net/chenyufeng1991/article/details/60340006 


# 跨域
* 跨域问题: 

	http://zjblogs.com/js/Access-Control-Allow-Origin.html
	
* http-proxy-middleware 中间件 
     
	https://vuejs-templates.github.io/webpack/proxy.html

* webpack  

	https://webpack.js.org/configuration/dev-server/#devserver-proxy
	
* 反向代理 

	http://z00w00.blog.51cto.com/515114/1031287
	
	
	
#屏幕尺寸, 分辨率, 像素密度
http://ued.ourfuture.cn/fed/4200.html

#SASS中文网

http://www.sasschina.com/guide/
	
####SASS和SCSS异同
http://sass.bootcss.com/docs/scss-for-sass-users/

#安装scss
在package.json文件中的 devDependencies 中添加以下几项(版本号可能不一样)
	
	
	"node-sass": "^4.5.0",
	"sass": "^1.0.0-beta.2",
	"sass-loader": "^6.0.6",
	"scss": "^0.2.4",
	"scss-loader": "^0.0.1"

命令行: npm install	



	
	

# 接口
## msite
* 首页地理位置信息			
	https://mainsite-restapi.ele.me/bgs/poi/reverse_geo_coding?latitude=38.88628659999999&longitude=121.536214 	

* 首页天气
	https://mainsite-restapi.ele.me/bgs/weather/current?latitude=38.953351&longitude=121.525461
	
	
* 热门搜索词汇
	https://mainsite-restapi.ele.me/shopping/v3/hot_search_words?latitude=38.88628659999999&longitude=121.536214	

* 首页分类	
	https://mainsite-restapi.ele.me/shopping/v2/entries?latitude=38.953351&longitude=121.525461&templates[]=main_template
	
* 商家列表
	https://mainsite-restapi.ele.me/shopping/restaurants?latitude=38.88628159999999&longitude=121.5361539&offset=0&limit=20&extras[]=activities&terminal=h5	

