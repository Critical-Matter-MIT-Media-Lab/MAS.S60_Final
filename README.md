# Behnaz Farahi Portfolio Website

这是 Behnaz Farahi 作品集网站的副本。

## 网站结构

- `index.html` - 主页面
- `css/` - 样式文件
  - `style.css` - 主要样式
  - `home.css` - 首页特定样式
- `js/` - JavaScript 文件
  - `app.js` - 主应用程序逻辑
  - `home.js` - 首页交互功能
  - `analytics.js` - Google Analytics
  - `epp8vhm.js` - Typekit 字体加载器
- `images/` - 图片资源
  - 网站图标和 Logo
  - Open Graph 图片
- `media/` - 媒体文件
  - `behnazFarahi_reel.mp4` - 背景视频

## 如何运行

### 方法 1: 使用 Python 本地服务器

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

然后在浏览器中访问: `http://localhost:8000`

### 方法 2: 使用 Node.js 服务器

```bash
# 安装 http-server（如果还没安装）
npm install -g http-server

# 运行服务器
http-server -p 8000
```

然后在浏览器中访问: `http://localhost:8000`

### 方法 3: 使用 VS Code Live Server

1. 在 VS Code 中打开项目
2. 安装 "Live Server" 扩展
3. 右键点击 `index.html`
4. 选择 "Open with Live Server"

## 网站功能

- 📱 **响应式设计** - 适配各种屏幕尺寸
- 🎨 **作品展示** - 展示精选作品列表（2013-2025）
- 🎬 **背景视频** - 首页全屏背景视频
- 📄 **导航菜单** - 汉堡菜单导航
- 🖼️ **悬停效果** - 作品列表鼠标悬停时显示预览图片
- ⚡ **平滑滚动** - 页面内锚点平滑滚动
- 🎭 **页面转场** - 流畅的页面切换动画

## 技术特点

- 原生 JavaScript（无框架依赖）
- CSS3 动画和过渡效果
- HTML5 视频标签
- Adobe Typekit 字体集成
- Google Analytics 集成

## 原始网站

[https://behnazfarahi.com/](https://behnazfarahi.com/)

## 关于 Behnaz Farahi

Behnaz Farahi 是一位屡获殊荣的设计师、创意技术专家和批判性创作者，致力于时尚、建筑和交互设计的交叉领域。目前，她是麻省理工学院媒体实验室的助理教授，领导"Critical Matter"研究小组。作为一名受过建筑学训练的专业人士，她探索交互环境的潜力及其与人体的关系。

---

© 2025 Behnaz Farahi. All rights reserved.
