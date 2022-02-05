module.exports = {
  // 修改 examples 目录 为 examples 目录
  pages: {
    index: {
      // page 的入口
      entry: "examples/main.js",
      // 模板来源
      template: "examples/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("js")
      .include.add("/src")
      .end()
      .use("babel")
      .loader("babel-loader");
  },
};
