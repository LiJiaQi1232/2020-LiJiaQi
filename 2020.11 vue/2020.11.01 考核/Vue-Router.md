## 路由重定向

```js
  let routes = [
    // 重定向
     {
      path: "原路由",
      redirect: "要跳转到哪个路由"
    },
    {其他路由规则}
  ]
```

## 嵌套路由

```js
  let routes = [
    // 重定向
     {
      path: "父组件路由规则",
      component: "组件名",
      children: [
        // 子路由规则
        {
        path: "父组件路由规则",
        component: "组件名",
        // children: [{}]
        }
      ]
    }
  ]
```

## 路由传参

### 直接接收

在路由规则中

```js
   let routes = [
    // 重定向
     {
      path: "父组件路由规则/:占位符名称",
      component: "组件名",
    }
  ]
```

在组件中

```vue
<template>
  <div>
    <p>{{$router.params.占位符名称}}</p>
  </div>
</template>

<script>
export default {
};
</script>

<style></style>

```

### 通过props属性

在路由规则中

```js
   let routes = [
    // 重定向
     {
      path: "父组件路由规则/:占位符名称",
      component: "组件名",
      props: true
    }
  ]
```

在组件中

```vue
<template>
  <div>
    <p>{{占位符名称}}</p>
  </div>
</template>

<script>
export default {
  props: ["占位符名称"]
};
</script>

<style></style>

```

### 通过回调函数

在路由规则中

```js
   let routes = [
    // 重定向
     {
      path: "父组件路由规则/:占位符名称",
      component: "组件名",
      props: router=>({属性名: router.params.占位符名称,属性名:属性值,...})
    }
  ]
```

在组件中

```vue
<template>
  <div>
    <p>{{属性名}}</p>
  </div>
</template>

<script>
export default {
  props: ["属性名","属性名",...]
};
</script>

<style></style>

```


## 编程式导航

```js
//  如果在methods中 在created 在watch这样的方法中 使用this.$router.push() 跳转到另外的路由
//  如果想前进一步(go(1)、forwar()) 后退一步(go(-1)、back())
```

## 命名路由

在路由规则中

```js
   let routes = [
     {
      name: "路由的名字"
      path: "父组件路由规则/:占位符名称",
      component: "组件名",
    }
  ]
```

在组件中

```vue
<template>
  <router-link :to="{ name: '路由的名字'}">超链接</router-link>
</template>

<script>
export default {
};
</script>

<style></style>

```
