/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('node:path')

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
}
