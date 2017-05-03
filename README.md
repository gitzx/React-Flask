
## React_Flask ##

**React_Flask**前端采用[React](https://facebook.github.io/react/)及其相关库和[Material-UI](https://github.com/callemall/material-ui)前端UI框架，后端采用[Flask](http://flask.pocoo.org/)提供API接口.


Demo
-------


## 主要库和框架

* [Flask](http://flask.pocoo.org/)
* [MySQL](https://www.mysql.com/)

* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [react-router](https://github.com/rackt/react-router)
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [Material-UI](https://github.com/callemall/material-ui)



## 安装和启动

### 后端部分（推荐使用virtualenv部署环境）：


```bash
$ git clone https://github.com/gitzx/React_Flask.git
$ cd React_Flask/backend
$ python install -r requirements.txt
$ python manage.py create_db
$ python manage.py db upgrade
$ python manage.py db migrate
$ python manage.py runserver
```

### 前端部分（推荐使用yarn，也可以使用npm）：


```bash
$ cd ../frontend
$ yarn install    
$ yarn start      # run frontend(same as `npm start`)
```

或者：

```bash 
$ yarn run build:production     # build frontend (same as `npm run build:production`)
```


Todo
-------



License
-------
 The project is available as open source under the terms of the MIT License.

