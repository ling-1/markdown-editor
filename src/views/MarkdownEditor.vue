<template>
  <div>
    <mavon-editor 
      v-model="markdownContent"
      @change="handleChange"
      ref="mdEditor"
      toolbarsBackground="#333333"
      style="height: 100vh"
      :s_fullScreen = "true"
      :class="[{ 'fullscreen': isFullscreen}]"
      @fullScreen="handleFullScreenChange"
      @save="handleSave"
    />
  </div>
</template>

<script>
import { ref , onMounted , onBeforeMount } from 'vue';
import { saveAs } from 'file-saver';
export default {
  name: 'MarkdownEditor',
  components: {
  },
  setup() {
    let isFullscreen = true // 默认开启全屏模式
    const compiledHtml = ref('');
    const markdownContent = ref(`
# 这是一个模板示例

---

提示：写完文章后，目录可以自动生成，如何生成可参考右边的帮助文档

@[TOC](文章目录)

---

# 前言

提示：这里可以添加本文要记录的大概内容：

例如：随着人工智能的不断发展，机器学习这门技术也越来越重要，很多人都开启了学习机器学习，本文就介绍了机器学习的基础内容。

---

以下是本篇文章正文内容，下面案例可供参考

# 一、pandas是什么？

示例：pandas 是基于NumPy 的一种工具，该工具是为了解决数据分析任务而创建的。

# 二、使用步骤
## 1.引入库
>代码如下（示例）：
  import numpy as np
  import pandas as pd
  import matplotlib.pyplot as plt
  import seaborn as sns
  import warnings
  warnings.filterwarnings('ignore')
  import  ssl
  ssl._create_default_https_context = ssl._create_unverified_context

## 2.读入数据

>代码如下（示例）：
  import pandas as pd
  data = pd.read_csv('https://labfile.oss.aliyuncs.com/courses/1283/adult.data.csv')
  print(data.head())
该处使用的url网络请求的数据。
---

# 总结
提示：这里对文章进行总结：

例如：以上就是今天要讲的内容，本文仅仅简单介绍了pandas的使用，而pandas提供了大量能使我们快速便捷地处理数据的函数和方法。
    `);

    const handleChange = (_value, $instance) => {
      compiledHtml.value = $instance.$html;
    };

    const handleFullScreenChange = () => {
      console.log(isFullscreen)
      isFullscreen = !isFullscreen;
    }

    function handleSave() {
      const blob = new Blob([markdownContent.value], { type: 'text/plain' });
      const filename = 'markdown.md';
      saveAs(blob, filename);
    }

    onMounted(() => {
      // 在这里可以执行DOM操作或数据请求
      // 在组件挂载时添加 beforeunload 事件监听器
      window.addEventListener('beforeunload', handleBeforeUnload);
    });

    onBeforeMount(() => {
    // 在组件卸载时移除 beforeunload 事件监听器，避免内存泄漏
      window.removeEventListener('beforeunload', handleBeforeUnload);
    });

    function handleBeforeUnload(event) {
      // 自定义提示信息（某些浏览器可能忽略这个字符串，并显示默认消息）
      const message = 'Are you sure you want to leave?';
 
      // 对于大多数现代浏览器，你需要设置一个非空字符串到 event.returnValue
      event.returnValue = message; // 兼容标准浏览器
      return message; // 兼容旧版浏览器
    }

    return {
      handleFullScreenChange,
      isFullscreen,
      handleSave,
      markdownContent,
      compiledHtml,
      handleChange,
    };
  },

};
</script>

<style scoped>
.preview {
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
}

</style>