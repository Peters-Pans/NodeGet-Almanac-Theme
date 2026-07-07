# Almanac · NodeGet 状态页主题

暖调编辑风的 [NodeGet](https://github.com/NodeSeekDev/NodeGet) 服务器状态展示页 —— 米白纸底、陶土强调、衬线标题、大留白，明暗双态。刻意避开常见深色科技风。

> A warm, editorial status-page theme for NodeGet.

## 特性

- **三视图 + 汇总头**：卡片 / 表格 / 世界地图，顶部全局汇总（节点数 / 在线 / 上下行带宽 / 累计流量）
- **节点卡片**：CPU sparkline、内存/磁盘进度、网络吞吐、运行时长、价格、有效期
- **节点详情**：CPU/内存/网络历史趋势图、环形指标、系统与网络信息
- **语义状态色**：在线苔绿 / 告警芥黄 / 危急砖红，独立于品牌陶土强调色（磁盘 ≥70% 转告警、≥90% 转危急）
- **自托管字体**：IBM Plex Sans / Mono + Newsreader，不依赖 CDN
- **明暗双主题**：暗色为暖 espresso 底（非冷灰），默认跟随系统
- 每 2 秒轮询实时指标，多后端聚合

## 技术栈

React 18 · Vite · Tailwind CSS · Recharts（趋势图）· ECharts（世界地图）· lucide

## 本地开发

```bash
cp .env.example .env.local   # 填 backend_url(wss://) 与只读 token
npm install
npm run dev
```

## 部署

### Cloudflare Pages（推荐）

1. 连接本仓库，Framework preset 选 **None**
2. Build command：`npm run build`；Build output directory：`dist`
3. 环境变量 **`NODEGET_CONFIG`**（单行 JSON）：

   ```json
   {"user_preferences":{"site_name":"你的站名","site_logo":"","footer":"Powered by NodeGet"},"site_tokens":[{"name":"节点组","backend_url":"wss://你的后端","token":"只读TOKEN"}]}
   ```

4. Node 版本由 `.nvmrc` 固定（22.12，Vite 8 要求）

也支持 Vercel、或 `npm run build` 后把 `dist/`（含自动打包的 zip）传到任意静态托管。

> ⚠️ **安全**：状态页是公开静态站，token 会打进构建产物、任何人可从源码读取。**务必使用只读 scoped token**（仅监控查询权限），切勿使用管理 / Super Token。

## 配置

- `nodeget-theme.json`：主题元信息与用户可配项（站名 / 图标 / 页脚）
- 运行时连接配置由构建生成的 `config.json` 或 `NODEGET_CONFIG` 环境变量提供
- `public/custom.css`、`public/custom.js`：部署后可直接编辑，免重新构建即可注入自定义样式 / 脚本

## 致谢 / 来源

本主题衍生自 [NodeGet-StatusShow](https://github.com/NodeSeekDev/NodeGet-StatusShow)（by NodeSeekDev），复用其 JSON-RPC / WebSocket 取数层与构建管线，重做了整个表现层。遵循上游 **AGPL-3.0** 许可，见 [LICENSE](./LICENSE)。
