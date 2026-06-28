<template>
  <section class="page">
    <div class="page-title">
      <h2>发布页面</h2>
      <p>用于发布商品、失物招领、拼单搭子或跑腿委托信息。</p>
    </div>

    <el-card class="section-card" shadow="never">
      <el-form label-width="90px">
        <el-form-item label="发布类型">
          <el-select placeholder="请选择类型">
            <el-option label="二手商品" value="trade" />
            <el-option label="失物招领" value="lost-found" />
            <el-option label="拼单搭子" value="group-buy" />
            <el-option label="跑腿委托" value="errand" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input placeholder="请输入信息标题" />
        </el-form-item>
        <el-form-item label="详细说明">
          <el-input type="textarea" :rows="5" placeholder="请输入详细说明" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交发布</el-button>
          <el-button>保存草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>
