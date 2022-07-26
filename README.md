# graphql-miniApp

## 安装

```sh
npm i graphql-miniapp
```


## 快速开始
通过微信开发者工具“构建npm”完成后引入
```js
import { graphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new graphqlMiniApp('http://127.0.0.1:3000');

const query = gql`
query {
    getAllBall{
        period
    }
}`
graphql.request({ url: '/graphql', query }).then(res => {console.log(res)}).catch(err => {console.err(err)})
```

## 用法

```js
import { graphqlMiniApp, gql } from 'graphql-miniapp';

//创建一个Graphql客户端实例来发送请求
const graphql = new graphqlMiniApp('http://127.0.0.1:3000', { headers, method, InMemoryCache });
graphql.request({ url, query, operationName, variables, baseURL, headers, method, noCache,timeout,dataType,responseType}).then().catch()
```

## 示例

### 向header中添加内容

```js
import { graphqlMiniApp, gql } from 'graphql-miniapp';

const baseURL = 'http://127.0.0.1:3000';
const graphql = new graphqlMiniApp(baseURL, {
  headers: {
    authorization: 'Bearer TOKEN',
  }
});

const query = gql`
query {
    getAllBall{
        period
    }
}`
graphql.request({ url: '/graphql', query }).then(res => {}).catch(err => {})
```

#### 为某个请求中单独设置请求头

```js
import { graphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new graphqlMiniApp(baseURL, {
  headers: {
    authorization: 'Bearer TOKEN',
  }
});
graphql.request({ url, query, headers: { 'X-AUTH-TOKEN': 'TOKEN' } }).then().catch()
```

#### 为某个请求单独设置请求地址

```js
import { graphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new graphqlMiniApp('http://127.0.0.1:3000');

graphql.request({ url,baseURL: 'http://api.test.com' }).then().catch()
```

### 使用GraphQL文档变量

```js
import { graphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new graphqlMiniApp(endPoint);
const query = gql`
    query GetAllBall($blueBall: Int!){
        getAllBall(blueBall: $blueBall){
            redBall
            period
            blueBall
        }
    }
`
const variables = {
  blueBall: 10
}

graphql.request({ url, query, variables }).then().catch()
```

### GraphQL Mutations

```js
import { graphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new graphqlMiniApp('http://127.0.0.1:3000');

const mutation = gql`
    mutation AddOnePerios($redBall:[Int]!,$blueBall:Int!,$date:String!,$perios:String!){
        addOnePerios(post: {redBall: $redBall,blueBall: $blueBall,date: $date,perios: $perios})
    }
`
const variables = {
  redBall: [1, 2, 3, 4, 5, 6], blueBall: 12, date: "2021-03-19", perios: "100"
}

graphql.request({ url, mutation, variables }).then().catch()
```

### 使用拦截器

#### request拦截器

```js
import { graphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new graphqlMiniApp('http://127.0.0.1:3000');

graphql.interceptors.request.use(function (config) {
  //使用拦截器为所有请求添加统一的header
  config.headers['X-auth-token'] = 'interceptors'
  return config
}, function (err) {
  //request错误拦截器会捕捉request:fail 失败 ，通常为客户端请求错误
  console.log('请求出错了', err)
})

const query = gql`
query {
    getAllBall{
        period
    }
}`
graphql.request({ url: '/graphql', query }).then(res => {}).catch(err => {})
```

#### 使用respons拦截器

```js
import { graphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new graphqlMiniApp('http://127.0.0.1:3000');

graphql.interceptors.response.use(function (data, resolve, reject) {
  if (data.data.code != 0) {
    reject({ err: 'code error' })
  }
}, function (err) {
  //response错误拦截会捕捉request:ok 失败，通常为服务端接口错误
  console.log('结果出错了', err)
})

const query = gql`
query {
    getAllBall{
        period
    }
}`
graphql.request({ url: '/graphql', query }).then(res => {}).catch(err => {})
```

#### 移除拦截器

```js
import { graphqlMiniApp } from 'graphql-miniapp';

const graphql = new graphqlMiniApp('http://127.0.0.1:3000');

//通过拦截器返回的id可以删除某个拦截器
const id = graphql.interceptors.request.use((config) => {return config})
graphql.request({ url: '/graphql' }).then(res => {}).catch(err => {})
graphql.interceptors.request.eject(id)

```


## api

##### graphqlMiniApp(url[,option])

```js
  //实例的请求根地址，必填项
url:'https://github.com'
{
  //实例的默认请求类型
  method:'POST'
  //实例请求头
  headers:{}
  //是否使用内存缓存功能
  InMemoryCache:true
  //接口超时时间
  timeout:6000
}
```
##### request(config})
```js
{
  //请求接口
  url:'/graphql'
  //请求根路径
  baseURL:'https://github.com'
  //请求类型
  method:'POST'
  //请求头
  headers:{}
  //graphql query查询语句
  query:''
  //graphql 文档变量
  variables:{}
  //graphql mutation语句
  mutation:''
  //不使用内存缓存中的值，而是从接口重新获取
  noCache:true
  //超时时间
  timeout:6000
  //返回的数据格式 参考微信wx.request文档
  dataType:json
  //响应的数据格式 参考微信wx.request文档
  responseType:'text'
}
```
