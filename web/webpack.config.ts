import * as path from 'path';
import * as webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
const isProduction = process.env.NODE_ENV === "production"

const webConfig = {
    mode: isProduction ? "production" : "development",
    entry: {
        main: "./src/client/index.tsx",
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].js",
    },
    module: {
        rules: [{
                test: [/\.tsx?$/, /\.ts$/],
                loader: "ts-loader",
                options: { compilerOptions: { module: "ES2020", moduleResolution: "node" } },
            }
        ]
    },
    devServer: {
        compress: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'public'),
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
}

const serverConfig = {
    mode: isProduction ? "production" : "development",
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        main: "./src/server/index.ts"
    },
    output: {
        path: path.resolve(__dirname, "server"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                options: { compilerOptions: { module: "ES2020", moduleResolution: "node" } },
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    }
}

module.exports = [webConfig, serverConfig]