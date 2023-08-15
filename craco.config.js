const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@root': path.resolve(__dirname, 'src'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@static': path.resolve(__dirname, 'src/static'),
            '@actions': path.resolve(__dirname, 'src/actions'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@reducers': path.resolve(__dirname, 'src/reducers'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@constants': path.resolve(__dirname, 'src/constants'),
        }
    }
};