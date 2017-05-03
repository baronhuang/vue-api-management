# vue-api-management
使用vue+iview+express+mongoDB 来开发api管理系统，`iview` 是基于vue.js的高质量UI组件库，里面有很多非常强大且体验很好的组件，用来做后台管理系统简直一流！Api管理系统除了可以编写接口文档，
也可以按照选择环境进行api的接口测试。

项目是前后端分离，开发时，前端独立一个服务器来开发，使用`http-proxy-middleware`来跨域，部署时直接用后端作为服务器。

![](https://github.com/baronhuang/vue-api-management/raw/master/static/ex.png) 

#用法
`npm run dev` 启动前端开发项目，默认9100端口<br>
`npm run serve` 启动后端开发项目，默认9101端口<br>
`npm run build` 压缩编译前端项目到dist<br>
`npm run serve:prod` 启动生产环境项目，默认9100端口<br>
