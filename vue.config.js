module.exports = {
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true,
        proxy: {
            '/one': {
                "target": 'http://openapi.data.go.kr',
                "pathRewrite": { '^/one': '' },
                "changeOrigin": true,
                "secure": false
            },
            '/two': {
                "target": 'https://api.odcloud.kr',
                "pathRewrite": { '^/two': '' },
                "changeOrigin": true,
                "secure": false
            }
        }
        
    }
}