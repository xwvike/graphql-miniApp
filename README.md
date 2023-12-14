# graphql-miniApp

## 安装

```sh
npm i graphql-miniapp
```

## 快速开始

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new GraphqlMiniApp('http://127.0.0.1:3000');

const query = gql`
query {
    getAllBall{
        period
    }
}`
graphql.request({ uri: '/graphql', query }).then(res => {}).catch(err => {})
```

## 用法

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

//创建一个Graphql客户端实例来发送请求
const graphql = new GraphqlMiniApp('http://127.0.0.1:3000', { headers, method, graphql });
graphql.request({ uri, query, variables, baseUrl, headers, method, graphql, data }).then().catch()
```

## 示例

### 通过http头进行身份验证

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

const baseURL = 'http://127.0.0.1:3000';
const graphql = new GraphqlMiniApp(baseURL, {
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
graphql.request({ uri: '/graphql', query }).then(res => {}).catch(err => {})
```

#### 为某个请求中单独设置请求头

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new GraphqlMiniApp(endPoint);
graphql.request({ uri, query, variables, headers: { 'X-AUTH-TOKEN': 'TOKEN' } }).then().catch()
```

#### 为某个请求单独设置请求地址

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new GraphqlMiniApp(endPoint);
graphql.request({ uri, query, variables, baseURL: 'http://api.test.com' }).then().catch()
```

### 使用GraphQL文档变量

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new GraphqlMiniApp(endPoint);
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

graphql.request({ uri, query, variables }).then().catch()
```

### GraphQL Mutations

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new GraphqlMiniApp(endPoint);
const mutation = gql`
    mutation AddOnePerios($redBall:[Int]!,$blueBall:Int!,$date:String!,$perios:String!){
        addOnePerios(post: {redBall: $redBall,blueBall: $blueBall,date: $date,perios: $perios})
    }
`
const variables = {
  redBall: [1, 2, 3, 4, 5, 6], blueBall: 12, date: "2021-03-19", perios: "100"
}

graphql.request({ uri, mutation, variables }).then().catch()
```

### 使用拦截器

#### request拦截器

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

const baseURL = 'http://127.0.0.1:3000';
const graphql = new GraphqlMiniApp(baseURL, {
  headers: {
    authorization: 'Bearer TOKEN',
  }
});

graphql.interceptors.request.use(function (config) {
  config.headers['X-auth-token'] = 'interceptors'
  //方法内部会自动取消无需wx.hideloading()
  wx.showLoading({
    title: '请求中……',
  })
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
graphql.request({ uri: '/graphql', query }).then(res => {}).catch(err => {})
```

#### 使用respons拦截器

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

const baseURL = 'http://127.0.0.1:3000';
const graphql = new GraphqlMiniApp(baseURL, {
  headers: {
    authorization: 'Bearer TOKEN',
  }
});

graphql.interceptors.response.use(function (data, resolve, reject) {
  if (data.data.code != 0) {
    reject({ err: 'code error' })
  }
  return data
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
graphql.request({ uri: '/graphql', query }).then(res => {}).catch(err => {})
```

#### 移除拦截器

```js
import { GraphqlMiniApp } from 'graphql-miniapp';

const baseURL = 'http://127.0.0.1:3000';
const graphql = new GraphqlMiniApp(baseURL);

const id = graphql.interceptors.request.use((config) => {return config})

graphql.request({ uri: '/graphql' }).then(res => {}).catch(err => {})

graphql.interceptors.request.eject(id)

```

### 微信requestTask方法

#### 取消最近的一次请求

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new GraphqlMiniApp('http://127.0.0.1:3000');

onClick(() => {
  graphql.abort()
  graphql.request({ uri, query, variables }).then().catch()
})

```

#### 监听最近一次请求的 HTTP Response Header 事件。会比该请求完成时间更早

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new GraphqlMiniApp('http://127.0.0.1:3000');
graphql.request({ uri, query, variables }).then().catch()
//onHeadersReceived会早于request完成
graphql.onHeadersReceived(header => console.log(header))
```

## api

##### GraphqlMiniApp(url[,option])

```js
  //实例的请求根地址
url:'http://github.com'
{
  //是否为graphql请求提供支持如果true 则不读取 config中data中的值。
  graphql:true
  //实例的默认请求类型
  method:'POST'
  //实例请求头
  headers:{}
}
```
##### request(config)
```js
{
  //请求接口
  uri:'/graphql'
  //请求根路径
  baseURL:'http:/github.com'
  //请求类型
  method:'POST'
  //请求头
  headers:{}
  //graphql query查询语句
  query:''
  //graphql 文档变量
  variables:{}
  //非graphql 请求数据对象
  data:{}
  //graphql mutation语句
  mutation:''
}
```

##### mini.js /src/mini.ts
```js
//移除了graphql的相关参数，其余使用方法和参数不变。
```
