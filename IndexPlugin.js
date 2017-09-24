/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/

// Purpose of this plugin is to create single entry point for single file distribution
function IndexPlugin() {
    // none so far
}

const os = require('os');

IndexPlugin.prototype.apply = function apply(compiler) {
  compiler.plugin('after-emit', (compilation, callback) => {
    let content = '';
    const outputPath = compilation.getPath(compiler.outputPath);
    const targetPath = compiler.outputFileSystem.join(outputPath, 'index.js');
    Object.keys(compilation.assets).forEach((file) => {
      if (!file.endsWith('.js.map')) {
        content = content.concat(`import ${file.replace('.js', '')} from './${file}'; ${os.EOL}`);
      }
    });
    content = content.concat(`export {${os.EOL}`);
    Object.keys(compilation.assets).forEach((file) => {
      if (!file.endsWith('.js.map')) {
        content = content.concat(`${file.replace('.js', '')},${os.EOL}`);
      }
    });
    content = content.concat('}');
    compiler.outputFileSystem.writeFile(targetPath, content, callback);
  });
};
module.exports = IndexPlugin;
