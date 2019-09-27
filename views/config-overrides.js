const { override, fixBabelImports ,addLessLoader } = require('customize-cra');
  //react-app-rewired 可以读取config-overides
module.exports = override(
    //针对antd实现按需打包;  根据import来打包(使用babel-plugin-import) babel前缀都一样 故可以省 babel-plugin
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
        }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#1DA57A' },
        }),
    );