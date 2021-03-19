# graphql-miniApp

## 安装

```sh
npm add graphql-miniapp
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
graphql.request('/graphql', query).then(res => {}).catch(err => {})
```

## 用法

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

//创建一个Graphql客户端实例来发送请求
const graphql = new GraphqlMiniApp('http://127.0.0.1:3000');
graphql.request(uri, query, variables, options).then().catch()
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
graphql.request('/graphql', query).then(res => {}).catch(err => {})
```

#### 为某个请求中单独设置请求头

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new GraphqlMiniApp(endPoint);
graphql.request(uri, query, variables, { headers: { 'X-AUTH-TOKEN': 'TOKEN' } }).then().catch()
```

#### 为某个请求单独设置请求地址

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';

const graphql = new GraphqlMiniApp(endPoint);
graphql.request(uri, query, variables, { baseURL: 'http://api.test.com' }).then().catch()
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

graphql.request(uri, query, variables).then().catch()
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

graphql.request(uri, mutation, variables).then().catch()
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
  wx.showLoading({
    title: '请求中……',
  })
  return config
}, function (err) {
  //拦截器中的错误处理会先于request方法捕获到请求错误
  wx.hideLoading()
  console.log('请求出错了', err)
})

const query = gql`
query {
    getAllBall{
        period
    }
}`
graphql.request('/graphql', query).then(res => {}).catch(err => {})
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

//拦截器会在数据返回之前获取数据，并捕获错误。
graphql.interceptors.response.use(function (data, resolve, reject) {
  wx.hideLoading()
  if (data.data.code != 0) {
    reject({ err: 'code error' })
  }
  return data
}, function (err) {
  console.log('结果出错了', err)
})

const query = gql`
query {
    getAllBall{
        period
    }
}`
graphql.request('/graphql', query).then(res => {}).catch(err => {})
```

### 微信requestTask方法

#### 取消最近的一次请求

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';


const graphql = new GraphqlMiniApp('http://127.0.0.1:3000');

onClick(() => {
  graphql.abort()
  graphql.request(uri, query, variables, options).then().catch()
})

```

#### 监听最近一次请求的 HTTP Response Header 事件。会比该请求完成时间更早

```js
import { GraphqlMiniApp, gql } from 'graphql-miniapp';


const graphql = new GraphqlMiniApp('http://127.0.0.1:3000');
graphql.request(uri, query, variables, options).then().catch()
//onHeadersReceived会早于request完成
graphql.onHeadersReceived(header => console.log(header))
```
