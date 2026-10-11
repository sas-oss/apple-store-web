# Apple Store 在线商城（前端实训网站）

> 前端实训 · 仿 Apple 官方在线商店的响应式电商前端（个人独立完成）

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 项目简介

一个仿 Apple 官方在线商店的前端电商网站，覆盖“浏览商品 → 加入购物车 → 填写收货 → 在线支付 → 下单完成”的完整购物流程。纯前端实现（HTML5 + CSS3 + 原生 JavaScript ES6+），使用 Tailwind CSS 快速构建 UI，通过 `localStorage` 实现购物车前端的本地持久化。

本项目是我的**前端入门与综合实训作品**，覆盖岗位 JD 要求的前端基础：**HTML5 语义化、CSS3 布局（Flexbox）、JavaScript ES6+、DOM 操作、事件处理、响应式设计、本地存储**。

## 功能特性

- **19 个页面**：首页、iPhone/iPad/Mac/Watch/AirPods 五大产品线、产品详情、配件、购物车、结算、支付、物流、订单确认、售后支持、关于我们
- **响应式布局**：适配桌面端与移动端，移动端折叠菜单（汉堡菜单切换）
- **图片轮播**：首页 Banner 轮播，自动播放 + 指示器切换
- **购物车**：基于 `localStorage` 的本地购物车，增删商品、数量统计、角标实时更新
- **完整下单流程**：购物车 → 收货地址 → 支付方式 → 订单确认，页面间数据流转
- **导航栏滚动效果**：页面滚动时导航栏样式动态变化

## 技术栈

| 类别 | 技术 |
|---|---|
| 结构 | HTML5（语义化标签） |
| 样式 | CSS3 · Tailwind CSS · Flexbox 布局 · 响应式（媒体查询） |
| 交互 | 原生 JavaScript（ES6+）· DOM 操作 · 事件监听 |
| 图标 | Font Awesome |
| 存储 | localStorage（购物车本地持久化） |
| 工具 | VS Code · Live Server |

## 目录结构

```
├── index.html              # 首页（轮播 + 产品推荐）
├── iphone.html / iphone15Pro.html
├── ipad.html / ipad-pro-12-9.html / ipad-accessories.html
├── mac.html / watch.html / airpods.html / accessories.html
├── product.html            # 产品详情
├── cart.html               # 购物车
├── checkout.html           # 结算
├── payment.html            # 支付
├── shipping.html           # 物流
├── order-confirmation.html # 订单确认
├── support.html / about.html
├── Css/                    # 各页面样式 + Tailwind
└── script/                 # 公共 JS（轮播/购物车/菜单）+ 配置
```

## 本地运行

纯静态页面，无需后端：
- 方式一：直接用浏览器打开 `index.html`
- 方式二（推荐）：VS Code 装 `Live Server` 插件，右键 `index.html` → `Open with Live Server`，自动热更新

## 核心知识点（面试可讲）

| 知识点 | 体现位置 |
|---|---|
| HTML5 语义化 | header / nav / section / footer 等标签 |
| CSS3 Flexbox | 导航栏、产品卡片、页脚布局 |
| 响应式 | 媒体查询 + Tailwind 响应式前缀（md: lg:） |
| JavaScript ES6+ | 箭头函数、模板字符串、const/let、数组方法 |
| DOM 操作 | getElementById / querySelector / classList |
| 事件处理 | addEventListener（scroll / click） |
| 本地存储 | localStorage 读写购物车 JSON |
| 组件化思维 | 公共 script.js 复用购物车/菜单逻辑 |

## 许可

本项目为前端综合实训作品，仅用于学习交流。
