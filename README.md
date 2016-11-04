# html-webpack-plugin-chunksSortMode
解决html-webpack-plugin chunks排序痛点
## 想来webpack无疑为前端工程模块化打包神器

大家应该都用过插件html-webpack-plugin插件，其中自动填充js文件功能我非常喜爱，<br/>
但是对于多个js文件填充顺序甚是让我费解（按照字符串大小排序），<br/>
既然有参数<code>chunksSortMode</code>可以接受'function'形式参数为毛还要在源码上限制成sort排序，不解。<br/>
个人认为还是放开sort限制增加灵活性的好吧？<br/>


###解决办法： 

  更改该插件下index.js 下修改相应源码为TODO下一行代码，如下：<br/>
 
  HtmlWebpackPlugin.prototype.sortChunks = function (chunks, sortMode) {<br/>
  // Sort mode auto by default:<br/>
  //console.dir(chunks)<br/>
  if (typeof sortMode === 'undefined') {<br/>
    sortMode = 'auto';<br/>
  }<br/>
  // Custom function<br/>
  if (typeof sortMode === 'function') {<br/>
    //TODO 修改源码<br/>
    return sortMode(chunks);<br/>
  }<br/>
  // Disabled sorting:<br/>
  if (sortMode === 'none') {<br/>
    return chunkSorter.none(chunks);<br/>
  }<br/>
  // Check if the given sort mode is a valid chunkSorter sort mode<br/>
  if (typeof chunkSorter[sortMode] !== 'undefined') {<br/>
    return chunkSorter[sortMode](chunks);<br/>
  }<br/>
  throw new Error('"' + sortMode + '" is not a valid chunk sort mode');<br/>
};
 
  <br/>
  ### 其次，不得不说该插件审核的严格性可能还有提高的空间---某行注释有错
  <br/>
 
  compiler.plugin('emit', function (compilation, callback) {<br/>
    var applyPluginsAsyncWaterfall = self.applyPluginsAsyncWaterfall(compilation);<br/>
    // Get all chunks => wrong该注释可能有问题<br/>
    // TODO 增加注释<br/>
    // 得到包含chunks的列表<br/>
    //参数:  所有入口文件  :   包含的chunks   参数传进来需要排除的chunks<br/>
    var chunks = self.filterChunks(compilation.getStats().toJson(), self.options.chunks, self.options.excludeChunks);<br/>
    // Sort chunks<br/>
    chunks = self.sortChunks(chunks, self.options.chunksSortMode);<br/>
    // Let plugins alter the chunks and the chunk sorting<br/>
    chunks = compilation.applyPluginsWaterfall('html-webpack-plugin-alter-chunks', chunks, { plugin: self });<br/>
 <br/>
  根据源码可知<br/>
  <code>var chunks = self.filterChunks(compilation.getStats().toJson(), self.options.chunks, self.options.excludeChunks);</code><br/>
  是所有chunks文件去除self.options.excludeChunks 再匹配self.options.chunks之后的文件集合，并非所有chunk文件。<br/>
  原注释为Get all chunks 显然上有不妥，已反馈官网 不知道是否会采纳~<br/>
  
  
  免责： 
  
   该文仅为个人留记文章，不含任何批判等恶略含义，如果有不合适言辞，还请多多包涵！
