# html-webpack-plugin-chunksSortMode
解决html-webpack-plugin chunks排序痛点
## 想来webpack无疑为前端工程模块化打包神器

大家应该都用过插件html-webpack-plugin插件，其中自动填充js文件功能我非常喜爱，
但是对于多个js文件填充顺序甚是让我费解（按照字符串大小排序），
既然有参数<code>chunksSortMode</code>可以接受'function'形式参数为毛还要在源码上限制成sort排序，不解。
个人认为还是放开sort限制增加灵活性的好吧？


###解决办法： 

  更改该插件下index.js 下修改相应源码为TODO下一行代码，如下：
  <code>
  HtmlWebpackPlugin.prototype.sortChunks = function (chunks, sortMode) {
  // Sort mode auto by default:
  //console.dir(chunks)
  if (typeof sortMode === 'undefined') {
    sortMode = 'auto';
  }
  // Custom function
  if (typeof sortMode === 'function') {
    //TODO 修改源码
    return sortMode(chunks);
  }
  // Disabled sorting:
  if (sortMode === 'none') {
    return chunkSorter.none(chunks);
  }
  // Check if the given sort mode is a valid chunkSorter sort mode
  if (typeof chunkSorter[sortMode] !== 'undefined') {
    return chunkSorter[sortMode](chunks);
  }
  throw new Error('"' + sortMode + '" is not a valid chunk sort mode');
};
  </code>
  
  ### 其次，不得不说该插件审核的严格性可能还有提高的空间---某行注释有错
  
  <code>
  compiler.plugin('emit', function (compilation, callback) {
    var applyPluginsAsyncWaterfall = self.applyPluginsAsyncWaterfall(compilation);
    // Get all chunks => wrong上面注释有问题
    //TODO 增加注释
    // 得到包含chunks的列表
    //参数:  所有入口文件  :   包含的chunks   参数传进来需要排除的chunks
    var chunks = self.filterChunks(compilation.getStats().toJson(), self.options.chunks, self.options.excludeChunks);
    // Sort chunks
    chunks = self.sortChunks(chunks, self.options.chunksSortMode);
    // Let plugins alter the chunks and the chunk sorting
    chunks = compilation.applyPluginsWaterfall('html-webpack-plugin-alter-chunks', chunks, { plugin: self });
  </code>
  根据源码可知
  <code>var chunks = self.filterChunks(compilation.getStats().toJson(), self.options.chunks, self.options.excludeChunks);</code>
  是所有chunks文件去除self.options.excludeChunks 再匹配self.options.chunks之后的文件集合，并非所有chunk文件。
  原注释为Get all chunks 显然上有不妥，已反馈官网 不知道是否会采纳~
  
  
