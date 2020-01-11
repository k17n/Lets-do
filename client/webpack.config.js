const path= require('path')
const HTMLWebpackPLugin= require('html-webpack-plugin')

module.exports={
   
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js',
        publicPath: '/'
    },

    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader','sass-loader'],
            },

            {
                test:/\.(svg|png|otf)$/,
                use:{
                    loader:'file-loader',
                }
                    
                
            }
        ]
    },
    
    devServer: {
        historyApiFallback: true,
      },
      
    plugins:[
        new HTMLWebpackPLugin({
            template:'./src/index.html'
        })
    ]
}