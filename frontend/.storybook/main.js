const path = require('path')

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-viewport'
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@mixin': path.resolve(__dirname, '../src/utils/style/mixin'),
      '@imgs': path.resolve(__dirname, '../src/assets/imgs'),
      '@layout': path.resolve(__dirname, '../src/pages/_layout'),
      '@const': path.resolve(__dirname, '../src/utils/const'),
    }

    return config
  }
}