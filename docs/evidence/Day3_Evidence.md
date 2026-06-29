# Day3 Evidence - Mock 数据建模与列表渲染

## 1. 今日完成内容

今天主要完成了校园轻集市项目的 Mock 数据建模、接口封装和列表页面渲染工作。

首先，在项目根目录创建了 `db.json`，为二手交易、失物招领、拼单搭子、跑腿委托四个业务模块分别准备了 Mock 数据，每类数据都至少包含 5 条记录，并且尽量贴近校园真实使用场景。

其次，安装并配置了 `axios` 和 `json-server@0.17.4`，在 `package.json` 中新增了 `mock` 启动命令，用于本地启动 JSON Server Mock 服务。

然后，在 `src/api` 目录下创建了 `http.ts`，统一封装 Axios 实例，并分别创建了 `trade.ts`、`lostFound.ts`、`groupBuy.ts`、`errand.ts` 四个业务 API 模块。

最后，创建了通用列表卡片组件 `ItemCard.vue` 和空状态组件 `EmptyState.vue`，并在二手交易、失物招领、拼单搭子、跑腿委托页面中请求接口数据，完成页面列表渲染。

## 2. Mock 数据结构说明

| 数据集合 | 对应业务 | 主要字段 | 页面用途 |
|---|---|---|---|
| trades | 二手交易 | title、price、category、condition、location、status | 展示二手商品列表 |
| lostFounds | 失物招领 | title、type、itemName、location、time、status | 展示失物和招领信息 |
| groupBuys | 拼单搭子 | title、type、targetCount、currentCount、deadline | 展示拼单和搭子信息 |
| errands | 跑腿委托 | title、taskType、reward、pickupLocation、deliveryLocation、deadline | 展示跑腿任务列表 |

## 3. 我的设计

二手交易数据中设计了 `price` 和 `condition` 字段。`price` 用来展示商品价格，是二手交易页面最重要的信息之一；`condition` 用来说明物品成色，例如九成新、八成新、正常使用痕迹等，方便用户判断是否值得购买。

失物招领数据中设计了 `type` 字段，用来区分是寻物还是招领。因为这两个信息虽然都属于失物招领模块，但用户查看时关注点不同：寻物信息是希望别人帮忙寻找，招领信息是提醒失主认领，所以需要通过 `type` 做区分。

拼单搭子数据中设计了 `targetCount` 和 `currentCount` 字段。`targetCount` 表示目标人数，`currentCount` 表示当前已加入人数。页面可以根据这两个字段计算进度条，让用户直观看到是否快要成团。

跑腿委托数据中设计了取件地点、送达地点和酬谢字段。实际代码中使用了 `pickupLocation` 和 `deliveryLocation` 来表示 from 和 to 的含义，这样字段语义更清楚；`reward` 用来展示酬谢金额，方便接单同学判断任务是否合适。

## 4. AI 设计

AI 工具帮助生成了 `db.json` 的初始 Mock 数据，包括二手交易、失物招领、拼单搭子和跑腿委托四组数据。

AI 也帮助生成了 `src/api` 下的接口封装代码，包括统一 Axios 实例和四个业务 API 方法，例如 `getTrades()`、`getLostFounds()`、`getGroupBuys()`、`getErrands()`。

页面列表代码也由 AI 辅助完成，包括将原来的静态数组替换为接口请求数据，并增加了 loading、错误提示和空状态展示。

AI 生成内容中有一些需要注意的地方。例如最开始字段命名需要和页面保持一致，否则页面可能取不到数据；另外如果封装得过于复杂，会超出 Day3 阶段要求，所以最终只保留了基础 Axios 封装，没有加入 Token、权限拦截、复杂错误码处理等内容。

## 5. 最终调整

最终调整时，我保留了页面展示真正需要的字段，避免数据结构过度复杂。

二手交易模块补充了 `condition`、`publisher`、`publishedAt`、`description` 等字段，让商品卡片能展示成色、发布人、发布时间和简介。

失物招领模块保留了 `type` 字段，用 `lost` 和 `found` 区分寻物与招领，同时补充了 `contact` 和 `description`，方便后续联系和查看详情。

拼单搭子模块保留了 `targetCount`、`currentCount` 和 `deadline`，这样页面可以展示参与人数和截止时间。

跑腿委托模块将简单的 `from`、`to` 含义调整为更清晰的 `pickupLocation`、`deliveryLocation`，并补充了 `taskType`、`reward`、`publisher` 和 `status`，让任务列表更贴近校园跑腿场景。

同时删除了 Day3 阶段暂时不需要的复杂设计，例如登录 Token、权限控制、真实后端环境变量、复杂请求拦截器等。

## 6. 遇到的问题与解决方法

遇到的一个真实问题是类型检查一开始没有成功运行。执行 `pnpm type-check` 时，终端提示找不到 `node` 命令。后来发现是当前命令环境的 PATH 中没有包含 Node.js 路径。

解决方法是临时把 Codex 自带的 Node.js 和 pnpm 路径加入 PATH，然后重新执行 `pnpm type-check`。调整后类型检查可以正常运行，并发现了一个组件类型问题：`ItemCard.vue` 中 Element Plus 的 `el-tag` 类型默认值不能写成空字符串。最后将默认值调整为 `undefined`，类型检查通过。

另外，在页面接入接口时也需要保证字段名一致。例如页面中展示跑腿任务的取件地点和送达地点时，必须和 `db.json` 中的 `pickupLocation`、`deliveryLocation` 对应，否则页面会显示为空。

## 7. 今日反思

Mock 数据建模、接口请求和列表渲染是前端项目从静态页面走向动态页面的重要一步。通过 `db.json` 可以先模拟后端数据结构，让页面开发不必等待真实后端完成；通过 Axios 和业务 API 模块，可以把请求逻辑集中管理，避免页面代码混乱；通过列表渲染，可以验证数据字段是否能真正支撑页面展示。后续如果接入真实后端，只要接口结构保持一致，页面改动就会比较小。
