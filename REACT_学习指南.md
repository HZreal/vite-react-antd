# React 学习指南 - 从 Vue 到 React

欢迎学习 React！本指南将帮助你从 Vue 的角度理解 React 的核心概念。

## 📚 目录

1. [核心概念对比](#核心概念对比)
2. [项目结构说明](#项目结构说明)
3. [学习路径](#学习路径)
4. [常用 Hooks 详解](#常用-hooks-详解)
5. [最佳实践](#最佳实践)

---

## 核心概念对比

### 1. 组件定义

**Vue 3 (Composition API)**
```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">Count: {{ count }}</button>
</template>
```

**React (函数组件)**
```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

**关键区别：**
- Vue: 模板和逻辑分离，使用 `ref()` 创建响应式变量
- React: JSX 语法，逻辑和 UI 在一起，使用 `useState()` 管理状态

---

### 2. 状态管理

| Vue | React | 说明 |
|-----|-------|------|
| `ref()` | `useState()` | 基本状态 |
| `reactive()` | `useState()` (对象) | 对象状态 |
| `computed()` | `useMemo()` | 计算属性 |
| `watch()` | `useEffect()` | 监听变化 |

**示例对比：**

**Vue:**
```vue
<script setup>
import { ref, computed, watch } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)

watch(count, (newVal) => {
  console.log('count changed:', newVal)
})
</script>
```

**React:**
```tsx
import { useState, useMemo, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const double = useMemo(() => count * 2, [count])
  
  useEffect(() => {
    console.log('count changed:', count)
  }, [count])
  
  return <div>{double}</div>
}
```

---

### 3. 条件渲染

**Vue:**
```vue
<template>
  <div v-if="isVisible">显示内容</div>
  <div v-show="isVisible">显示/隐藏内容</div>
</template>
```

**React:**
```tsx
function Component() {
  const [isVisible, setIsVisible] = useState(true)
  
  return (
    <>
      {isVisible && <div>显示内容</div>}
      <div style={{ display: isVisible ? 'block' : 'none' }}>
        显示/隐藏内容
      </div>
    </>
  )
}
```

---

### 4. 列表渲染

**Vue:**
```vue
<template>
  <div v-for="item in items" :key="item.id">
    {{ item.name }}
  </div>
</template>
```

**React:**
```tsx
function List() {
  const items = [{ id: 1, name: 'Item 1' }]
  
  return (
    <>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </>
  )
}
```

---

### 5. 事件处理

**Vue:**
```vue
<template>
  <button @click="handleClick">点击</button>
  <input @input="handleInput" />
</template>

<script setup>
const handleClick = () => {
  console.log('clicked')
}

const handleInput = (e) => {
  console.log(e.target.value)
}
</script>
```

**React:**
```tsx
function Component() {
  const handleClick = () => {
    console.log('clicked')
  }
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  
  return (
    <>
      <button onClick={handleClick}>点击</button>
      <input onChange={handleInput} />
    </>
  )
}
```

---

## 项目结构说明

```
src/
├── App.tsx              # 主应用组件
├── main.tsx             # 应用入口（类似 Vue 的 main.js）
├── pages/
│   ├── tables/          # 表格示例
│   │   └── myTable.tsx
│   └── test/            # 学习示例集合
│       ├── index.tsx    # 示例入口
│       └── components/  # 各种学习示例
│           ├── HooksExample.tsx        # Hooks 示例
│           ├── ConditionalRendering.tsx # 条件渲染
│           ├── ListRendering.tsx        # 列表渲染
│           └── EventHandling.tsx       # 事件处理
```

---

## 学习路径

### 第一阶段：基础概念（1-2周）

1. ✅ **JSX 语法**
   - 理解 JSX 是 JavaScript 的扩展
   - 学习如何在 JSX 中使用表达式 `{}`
   - 掌握组件的基本结构

2. ✅ **组件和 Props**
   - 函数组件 vs 类组件（现在主要用函数组件）
   - Props 的传递和类型定义（TypeScript）
   - 组件组合

3. ✅ **状态管理 - useState**
   - 基本状态管理
   - 状态更新规则
   - 不可变数据的重要性

### 第二阶段：Hooks 深入（2-3周）

4. ✅ **useEffect**
   - 副作用处理
   - 依赖数组的作用
   - 清理函数（cleanup）

5. ✅ **其他常用 Hooks**
   - `useRef` - DOM 引用和可变值
   - `useMemo` - 性能优化
   - `useCallback` - 函数记忆化
   - `useContext` - 上下文共享

### 第三阶段：进阶主题（3-4周）

6. **组件通信**
   - Props 向下传递
   - 回调函数向上通信
   - Context API（类似 Vue 的 provide/inject）

7. **表单处理**
   - 受控组件 vs 非受控组件
   - 表单验证
   - 使用 Ant Design Form

8. **性能优化**
   - React.memo
   - useMemo 和 useCallback
   - 代码分割（React.lazy）

9. **路由**
   - React Router
   - 路由配置
   - 导航守卫

10. **状态管理库**
    - Redux / Zustand / Jotai
    - 何时需要全局状态管理

---

## 常用 Hooks 详解

### useState

```tsx
const [state, setState] = useState(initialValue)

// 基本用法
const [count, setCount] = useState(0)

// 函数式更新
setCount(prev => prev + 1)

// 对象状态
const [user, setUser] = useState({ name: '', age: 0 })
setUser({ ...user, name: 'John' }) // 必须创建新对象
```

### useEffect

```tsx
// 1. 组件挂载时执行（类似 Vue 的 onMounted）
useEffect(() => {
  console.log('组件已挂载')
}, [])

// 2. 监听特定状态变化（类似 Vue 的 watch）
useEffect(() => {
  console.log('count 变化了:', count)
}, [count])

// 3. 清理副作用（类似 Vue 的 onUnmounted）
useEffect(() => {
  const timer = setInterval(() => {
    console.log('定时器')
  }, 1000)
  
  return () => {
    clearInterval(timer) // 清理函数
  }
}, [])
```

### useRef

```tsx
// 1. 获取 DOM 引用
const inputRef = useRef<HTMLInputElement>(null)
<input ref={inputRef} />
inputRef.current?.focus()

// 2. 保存可变值（不触发重新渲染）
const countRef = useRef(0)
countRef.current = 10 // 不会触发重新渲染
```

---

## 最佳实践

### 1. 组件命名
- 使用 PascalCase：`MyComponent.tsx`
- 文件名和组件名保持一致

### 2. Props 类型定义
```tsx
interface ButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
}

function Button({ text, onClick, disabled }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{text}</button>
}
```

### 3. 状态更新
```tsx
// ❌ 错误：直接修改状态
const [items, setItems] = useState([1, 2, 3])
items.push(4) // 错误！

// ✅ 正确：创建新数组
setItems([...items, 4])
```

### 4. 条件渲染
```tsx
// ✅ 推荐：使用 && 或三元运算符
{isVisible && <Component />}
{isLoading ? <Spinner /> : <Content />}
```

### 5. 列表渲染
```tsx
// ✅ 必须提供 key
{items.map(item => (
  <Item key={item.id} data={item} />
))}
```

### 6. 事件处理
```tsx
// ✅ 推荐：定义函数
const handleClick = () => {
  // 处理逻辑
}

<button onClick={handleClick}>点击</button>

// ✅ 简单逻辑可以直接内联
<button onClick={() => setCount(count + 1)}>增加</button>
```

---

## 常见问题 FAQ

### Q1: React 和 Vue 最大的区别是什么？

**A:** 
- **模板语法**：Vue 使用模板，React 使用 JSX
- **响应式系统**：Vue 自动追踪依赖，React 需要手动管理
- **学习曲线**：Vue 更接近传统 HTML，React 更接近 JavaScript

### Q2: 为什么 React 需要 key？

**A:** React 使用 key 来识别哪些元素改变了，用于优化渲染性能。类似 Vue 的 `:key`。

### Q3: 什么时候用 useMemo？

**A:** 当计算成本高且依赖项不经常变化时使用。不要过度使用，因为 useMemo 本身也有开销。

### Q4: useEffect 的依赖数组为空是什么意思？

**A:** 空数组 `[]` 表示只在组件挂载时执行一次，类似 Vue 的 `onMounted`。

---

## 推荐资源

1. **官方文档**
   - [React 官方文档](https://react.dev/)
   - [Ant Design 文档](https://ant.design/)

2. **学习资源**
   - React 官方教程
   - TypeScript 官方文档（项目使用 TS）

3. **实践建议**
   - 完成项目中的示例组件
   - 尝试修改和扩展示例
   - 构建自己的小项目

---

## 下一步

1. ✅ 运行项目：`npm run dev`
2. ✅ 查看 `src/pages/test` 中的学习示例
3. ✅ 尝试修改示例代码，观察变化
4. ✅ 创建自己的组件练习

**祝你学习愉快！有问题随时提问。** 🚀

