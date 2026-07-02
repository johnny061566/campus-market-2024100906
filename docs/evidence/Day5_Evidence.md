# Day5 Evidence - 状态管理与用户中心

## 1. 今日完成内容

今天主要完成了 Pinia 状态管理相关功能，重点包括用户状态 Store、收藏状态 Store、导航栏用户信息展示、发布页当前用户读取、四类列表页收藏操作，以及个人中心的用户资料、我的收藏和我的发布展示。

项目原本已经在 `main.ts` 中挂载了 Pinia。本次在 `src/stores` 下新增了 `user.ts` 和 `favorite.ts`，分别管理当前用户信息和收藏列表。用户信息可以在导航栏、发布页和个人中心中共享；收藏信息可以在列表页和个人中心中共享。

## 2. Store 设计说明

| Store 文件 | 管理内容 | 主要状态 | 主要方法 |
|---|---|---|---|
| `src/stores/user.ts` | 当前用户信息 | `isLoggedIn`、`currentUser` | `updateProfile`、`login`、`logout` |
| `src/stores/favorite.ts` | 收藏状态 | `favorites` | `addFavorite`、`removeFavorite`、`toggleFavorite`、`isFavorite` |

`userStore` 中保存了模拟登录用户，包括姓名、学院、年级、头像和个人简介。`favoriteStore` 中保存收藏列表，每条收藏数据包含业务类型、id、标题、描述、标签和地点，方便个人中心统一展示不同类型的信息。

## 3. 状态边界说明

本次只把多个页面或多个组件都需要共享的数据放入 Store。

- 当前用户信息放入 `userStore`，因为导航栏、发布页和个人中心都需要读取当前用户；
- 收藏列表放入 `favoriteStore`，因为四类列表页需要修改收藏状态，个人中心需要展示收藏结果；
- 表单校验错误没有放入 Store，因为它只属于发布页面，不需要跨页面共享；
- 发布表单的临时输入内容没有放入 Store，因为这些内容只在提交前临时使用；
- 列表页接口返回的数据没有全部放入 Store，因为它们主要服务于当前页面，直接保留在页面组件中更清晰；
- loading、errorMessage 等请求状态没有放入 Store，因为这些状态通常只和当前页面的一次请求有关。

这样划分以后，Store 的职责比较清楚：只管理共享状态，不代替所有页面局部状态。

## 4. 页面使用记录

- `AppHeader.vue` 使用 `userStore` 显示当前用户名称、学院和年级；
- `AppNav.vue` 使用 `favoriteStore` 显示收藏数量；
- `PublishView.vue` 使用 `userStore.displayName` 作为发布人或联系人；
- `TradeView.vue` 使用 `favoriteStore` 实现二手交易收藏；
- `LostFoundView.vue` 使用 `favoriteStore` 实现失物招领收藏；
- `GroupBuyView.vue` 使用 `favoriteStore` 实现拼单搭子收藏；
- `ErrandView.vue` 使用 `favoriteStore` 实现跑腿委托收藏；
- `UserCenterView.vue` 使用 `userStore` 展示用户资料，使用 `favoriteStore` 展示我的收藏，并根据当前用户筛选我的发布。

## 5. AI 协作记录

本次开发使用 Codex 作为 AI 编程辅助工具。

输入的核心提示词包括：

- 根据 Day5 任务要求完成 Pinia 状态管理；
- 新增用户 Store 和收藏 Store；
- 在导航栏、发布页、列表页和个人中心中使用 Store；
- 修复发布后个人中心“我的发布”不更新的问题；
- 按 Day5 Evidence 模板整理证据文档。

AI 生成和辅助完成的内容包括：

- 新建 `src/stores/user.ts`，用于管理当前用户信息；
- 新建 `src/stores/favorite.ts`，用于管理收藏列表；
- 修改 `AppHeader.vue` 和 `AppNav.vue`，展示用户信息和收藏数量；
- 修改 `PublishView.vue`，发布人改为来自 `userStore.displayName`；
- 修改四类列表页，增加收藏和取消收藏操作；
- 修改 `UserCenterView.vue`，展示用户资料、我的收藏和我的发布；
- 运行类型检查、ESLint 和生产构建，确认项目能够正常编译。

AI 生成内容中不合理的地方是，最开始“我的发布”只做了静态结构展示，没有真正根据当前用户筛选接口数据。后来根据测试发现问题后，重新补充了四类数据请求和筛选逻辑。

## 6. 人工调整内容

在 AI 辅助基础上，我结合项目实际做了以下调整：

- 没有加入复杂登录系统，只保留模拟当前用户；
- 没有加入 JWT、权限校验等后端登录逻辑；
- 将用户状态和收藏状态拆分成 `userStore` 和 `favoriteStore`；
- 调整收藏数据结构，使四类业务数据可以统一显示在个人中心；
- 根据项目现有路径使用 `@/stores/user` 和 `@/stores/favorite` 导入 Store；
- 修正个人中心读取 Store 和接口数据的方式；
- 对不同业务字段做适配，例如失物招领使用 `contact`，二手交易、拼单搭子和跑腿委托使用 `publisher`。

## 7. 测试记录

本次完成了以下真实测试：

1. 打开二手交易页面，点击某条商品的“收藏”按钮；
2. 按钮文字从“收藏”变为“已收藏”；
3. 进入个人中心，“我的收藏”中能够看到刚才收藏的内容；
4. 在个人中心点击“取消收藏”，该内容从收藏列表中移除；
5. 进入发布页面，页面显示当前发布人为 `校园用户`；
6. 发布一条二手交易信息后，列表页可以看到新增数据；
7. 回到个人中心，“我的发布”中能够看到当前用户发布的内容。

同时执行了以下命令进行验证：

```bash
pnpm exec vue-tsc --noEmit
pnpm exec eslint .
pnpm run build
```

验证结果：类型检查通过，ESLint 通过，生产构建通过。

## 8. 遇到的问题与解决方法

遇到的第一个问题是个人中心“我的发布”没有更新。原因是最开始只写了静态展示结构，没有真正请求业务数据。解决方法是在 `UserCenterView.vue` 中请求 `trades`、`lostFounds`、`groupBuys`、`errands` 四类数据，再根据当前用户姓名筛选发布内容。

遇到的第二个问题是四类业务数据结构不完全一致。二手交易、拼单搭子和跑腿委托使用 `publisher` 字段，失物招领使用 `contact` 字段。解决方法是在个人中心中分别处理这些字段，再转换成统一展示结构。

遇到的第三个问题是收藏数据刷新页面后会丢失。这是因为当前收藏状态只保存在 Pinia 内存中。Day5 阶段可以接受这种情况，后续如果需要持久化，可以继续结合 `localStorage` 或后端接口。

## 9. 今日反思

Pinia 状态管理可以让多页面前端应用中的共享数据更加清晰。像当前用户信息、收藏列表这类会被多个页面使用的数据，如果一直通过 props 或重复请求来传递，代码会越来越混乱。使用 Store 后，导航栏、发布页、列表页和个人中心可以围绕同一份状态工作，减少重复逻辑，也让页面之间的数据联动更自然。
