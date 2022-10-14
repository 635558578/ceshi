// const { turn } = require("core-js/core/array");

let proxyObj = {};
proxyObj['/'] = {
    target: '127.0.0.1:8000/api/home/insert',
    ws: false,
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
}

module.exports = {
    // Solution For Issue:You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
    //zhengkai.blog.csdn.net
    runtimeCompiler: true,
    lintOnSave: false
}
