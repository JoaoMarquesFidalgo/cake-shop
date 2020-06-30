module.exports = {
  env: {
    development: {
      sourceMaps: true,
      plugins: ['source-map-support']
    }
  },
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'babel-plugin-transform-typescript-metadata',
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@models': './src/models',
        '@controllers': './src/controllers',
        '@services': './src/services',
        '@utils': './src/utils',
        '@routes': './src/routes',
        '@auth': './src/auth',
        '@enum': './src/enum'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
