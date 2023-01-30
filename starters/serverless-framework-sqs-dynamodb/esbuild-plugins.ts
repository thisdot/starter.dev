import { nodeExternalsPlugin } from 'esbuild-node-externals';

// default export should be an array of plugins
module.exports = [nodeExternalsPlugin()];
