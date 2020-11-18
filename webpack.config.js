const path = require("path");
const ReviewExtensionPlugin = require("./build-utilities/review-extension-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const prefixResourceFileName = require("./build-utilities/review-extension-utilities").prefixResourceFileName;

// This webpack config is meant as an example of how to use the ReviewExtensionPlugin and may not be production-ready.
module.exports = (env, argv) => {
	const extensionScript = {
		entry: "./src/index.ts",
		output: {
			filename: "review.index.rogue.extension.js",
			path: path.resolve(__dirname, "dist"),
			library: "ext",
			libraryTarget: "var",
			libraryExport: "default",
		},
		module: {
			rules: [
				{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
			],
		},
		resolve: {
			extensions: [ ".ts", ".js" ],
		},
		plugins: [
			new ReviewExtensionPlugin({
				mode: argv.mode,
			}),
			new CopyPlugin([
				 { from: "./src/plugins/inventory_forms.js", to: prefixResourceFileName("inventory-forms-script.js") },
			]),
		]
	};

	return [extensionScript];
};
