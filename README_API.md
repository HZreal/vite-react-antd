# API 接口文档

## 目录结构说明

```
src/
├── api/                    # API 请求层
│   ├── request.ts         # Axios 请求封装（拦截器、错误处理）
│   ├── table.ts           # 表格相关 API 接口
│   └── mock.ts            # Mock 数据服务（开发测试用）
│
├── types/                  # TypeScript 类型定义
│   └── table.ts           # 表格相关类型
│
├── hooks/                  # 自定义 Hooks
│   └── useTable.ts        # 表格数据管理 Hook
│
├── utils/                  # 工具函数
│   └── constants.ts       # 常量定义
│
├── components/             # 通用组件
│   └── TableForm/         # 表格表单组件
│       └── index.tsx
│
└── pages/                  # 页面组件
    └── tables/
        └── myTable.tsx    # 表格页面
```

## 环境变量配置

在项目根目录创建 `.env` 文件：

```env
# API 基础地址
VITE_API_BASE_URL=http://localhost:3000/api

# 是否使用 Mock 数据（true/false）
VITE_USE_MOCK=true
```

## API 接口规范

### 1. 获取表格数据列表

**请求：**
```
GET /api/table/list?page=1&pageSize=10&name=xxx&age=18
```

**响应：**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "name": "胡歌",
        "age": 32,
        "address": "西湖区湖底公园1号",
        "tags": ["nice", "developer"],
        "createdAt": "2024-01-01",
        "updatedAt": "2024-01-01"
      }
    ],
    "total": 100,
    "page": 1,
    "pageSize": 10
  }
}
```

### 2. 获取单条数据详情

**请求：**
```
GET /api/table/:id
```

**响应：**
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "胡歌",
    "age": 32,
    "address": "西湖区湖底公园1号",
    "tags": ["nice", "developer"]
  }
}
```

### 3. 创建数据

**请求：**
```
POST /api/table
Content-Type: application/json

{
  "name": "张三",
  "age": 25,
  "address": "北京市朝阳区",
  "tags": ["developer", "nice"]
}
```

**响应：**
```json
{
  "code": 200,
  "message": "创建成功",
  "data": {
    "id": 4,
    "name": "张三",
    "age": 25,
    "address": "北京市朝阳区",
    "tags": ["developer", "nice"],
    "createdAt": "2024-01-04",
    "updatedAt": "2024-01-04"
  }
}
```

### 4. 更新数据

**请求：**
```
PUT /api/table/:id
Content-Type: application/json

{
  "name": "李四",
  "age": 30
}
```

**响应：**
```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "id": 4,
    "name": "李四",
    "age": 30,
    "address": "北京市朝阳区",
    "tags": ["developer", "nice"],
    "updatedAt": "2024-01-04"
  }
}
```

### 5. 删除数据

**请求：**
```
DELETE /api/table/:id
```

**响应：**
```json
{
  "code": 200,
  "message": "删除成功",
  "data": null
}
```

### 6. 批量删除

**请求：**
```
DELETE /api/table/batch
Content-Type: application/json

{
  "ids": [1, 2, 3]
}
```

**响应：**
```json
{
  "code": 200,
  "message": "批量删除成功",
  "data": null
}
```

## 错误响应格式

```json
{
  "code": 400,
  "message": "错误信息",
  "data": null
}
```

常见错误码：
- `200` 或 `0`: 成功
- `400`: 请求参数错误
- `401`: 未授权
- `403`: 禁止访问
- `404`: 资源不存在
- `500`: 服务器错误

## 使用 Mock 数据

开发阶段可以使用 Mock 数据，无需启动后端服务：

1. 设置环境变量 `VITE_USE_MOCK=true`
2. 或者不设置 `VITE_API_BASE_URL`，会自动使用 Mock

Mock 数据存储在 `src/api/mock.ts` 中，可以修改以测试不同场景。

## 切换到真实后端

1. 设置 `VITE_API_BASE_URL` 为你的后端地址
2. 设置 `VITE_USE_MOCK=false` 或删除该变量
3. 确保后端接口符合上述 API 规范

## 目录结构最佳实践

### API 层 (`src/api/`)
- **request.ts**: 统一的请求封装，处理拦截器、错误处理、token 等
- **table.ts**: 业务相关的 API 接口，按模块划分
- **mock.ts**: Mock 数据，方便前端独立开发

### Types 层 (`src/types/`)
- 定义所有 TypeScript 类型
- 按模块划分文件（如 `table.ts`, `user.ts`）

### Hooks 层 (`src/hooks/`)
- 封装可复用的业务逻辑
- `useTable`: 表格数据管理
- `useUser`: 用户相关逻辑（示例）

### Components 层 (`src/components/`)
- 通用组件，可在多个页面复用
- 按功能模块组织（如 `TableForm/`, `UserCard/`）

### Utils 层 (`src/utils/`)
- 工具函数和常量
- `constants.ts`: 常量定义
- `format.ts`: 格式化函数（示例）

## 扩展指南

### 添加新的 API 模块

1. 在 `src/types/` 创建类型定义
2. 在 `src/api/` 创建 API 文件
3. 在 `src/hooks/` 创建对应的 Hook（如需要）
4. 在组件中使用

示例：添加用户模块

```typescript
// src/types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

// src/api/user.ts
import request from './request';
import type { User } from '../types/user';

export const getUserList = () => request.get<User[]>('/user/list');
export const createUser = (data: Partial<User>) => request.post('/user', data);
```



