const path = require('path');

module.exports = {
    entry: './app/entry',
    entry: ['./app/entry1', './app/entry2'],
    entry: {
        a: './app/entry1',
        b: ['./app/entry1', './app/entry2']
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        filename: '[name].js',
        filenmae: '[chunkhash].js',

    }
}