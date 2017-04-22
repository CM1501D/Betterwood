var webpack = require('webpack');

module.exports = {
	entry:{
		'index':'./src/js/index.js',
        'list':'./src/js/list.js',
        'hotel_detail':'./src/js/hotel_detail.js',
        'write':'./src/js/write.js',
        'promise':'./src/js/promise.js',
        'success':'./src/js/success.js'
	},
	output:{
		path:'dist/js',
		filename:'[name].js'
	},
	module:{
		loaders:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {presets: ['es2015']}
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
	}
}