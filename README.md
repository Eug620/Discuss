# Discuss

一个基于 Vue 3 + TypeScript + Vite 的实时聊天应用，支持好友私聊和群组房间聊天功能。

## 功能特性

- **用户系统**
  - 用户登录认证
  - 个人信息管理
  - 好友在线状态实时同步

- **好友聊天**
  - 添加好友
  - 搜索好友
  - 一对一实时消息
  - 消息历史记录本地存储

- **房间聊天**
  - 创建聊天房间
  - 搜索房间
  - 多人实时群聊
  - 房间成员在线状态显示
  - 消息历史记录本地存储

- **申请管理**
  - 好友申请处理
  - 房间邀请管理

## 技术栈

### 前端框架
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite** - 下一代前端构建工具（使用 rolldown-vite）

### 状态管理与路由
- **Pinia** - Vue 官方状态管理库
- **Vue Router** - Vue 官方路由管理器

### UI 与样式
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Sass** - CSS 预处理器
- **@opentiny/vue** - OpenTiny Vue 组件库

### 网络与数据
- **Axios** - HTTP 客户端
- **Socket.IO Client** - WebSocket 客户端，实现实时通信
- **LocalForage** - 更好的本地存储 API

### 工具库
- **Day.js** - 轻量级日期处理库
- **Lodash-es** - JavaScript 实用工具库
- **js-cookie** - Cookie 操作库
- **NProgress** - 页面加载进度条

## 项目结构

```
Discuss/
├── public/                 # 静态资源
├── src/
│   ├── api/               # API 接口
│   │   ├── apply/         # 申请相关接口
│   │   ├── friend/        # 好友相关接口
│   │   ├── member/        # 成员相关接口
│   │   ├── room/          # 房间相关接口
│   │   └── user/          # 用户相关接口
│   ├── assets/            # 资源文件
│   │   └── style/         # 样式文件
│   ├── components/        # 公共组件
│   ├── directives/        # 自定义指令
│   ├── layout/            # 布局组件
│   ├── plugin/            # 插件配置
│   │   ├── axios.ts       # Axios 配置
│   │   └── dayjs.ts       # Dayjs 配置
│   ├── router/            # 路由配置
│   ├── settings/          # 项目设置
│   ├── store/             # 状态管理
│   │   └── modules/       # Pinia 模块
│   ├── utils/             # 工具函数
│   └── views/             # 页面视图
│       ├── 404/           # 404 页面
│       ├── apply/         # 申请页面
│       ├── dashboard/     # 首页
│       ├── friend/        # 好友相关页面
│       ├── login/         # 登录页面
│       ├── room/          # 房间相关页面
│       └── setting/       # 设置页面
├── .env                   # 开发环境变量
├── .env.prod             # 生产环境变量
├── index.html            # HTML 入口
├── package.json          # 项目依赖
├── tsconfig.json         # TypeScript 配置
└── vite.config.ts        # Vite 配置
```

## 快速开始

### 环境要求

- Node.js >= 18
- npm 或 pnpm

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env` 文件并根据需要修改配置：

```env
# API 基础路径
VITE_APP_BASE_API=/api

# API 请求地址
VITE_APP_API_BASE_URL=http://192.168.58.190:3000

# WebSocket 请求地址
VITE_APP_WS_BASE_URL=http://192.168.58.190:3001
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:8000

### 生产构建

```bash
npm run build
```

### 预览构建

```bash
npm run preview
```

## 核心功能说明

### WebSocket 实时通信

项目使用 Socket.IO 实现实时消息推送，支持以下事件：

- `connect` - 连接建立
- `disconnect` - 连接断开
- `user` - 接收用户消息
- `sender` - 接收已发送消息回显
- `room` - 接收房间消息
- `online` - 房间成员在线状态更新
- `status` - 好友状态更新
- `onlineFriends` - 初始化在线好友列表

### 本地存储

使用 LocalForage 和 Pinia 实现消息历史记录的本地持久化存储，支持：

- 用户消息历史
- 房间消息历史
- 自动防抖保存（1秒延迟）

### 路由结构

- `/login` - 登录页面
- `/dashboard` - 首页仪表板
- `/friend` - 好友模块
  - `/friend/dashboard` - 好友欢迎页
  - `/friend/search` - 搜索好友
  - `/friend/:id` - 与好友聊天
- `/room` - 房间模块
  - `/room/dashboard` - 房间欢迎页
  - `/room/search` - 搜索房间
  - `/room/create` - 创建房间
  - `/room/:id` - 房间聊天
- `/apply` - 申请管理
- `/setting` - 设置页面

## 部署

项目配置为部署到 GitHub Pages，生产环境基础路径为：

```
https://eug620.github.io/discuss/
```

构建后的文件位于 `dist` 目录，可部署到任何静态文件服务器。

## License

MIT