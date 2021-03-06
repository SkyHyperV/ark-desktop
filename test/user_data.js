const path = require('path')
const fs = require('fs')

const productName = require('../package').productName

module.exports = {
  getPath: function() {
    switch (process.platform) {
      case 'darwin':
        return path.join(process.env.HOME, 'Library', 'Application Support', productName)
      case 'win32':
        return path.join(process.env.APPDATA, productName)
      case 'freebsd':
      case 'linux':
      case 'sunos':
        return path.join(process.env.HOME, '.config', productName)
      default:
        throw new Error(`Unknown userDataPath path for platform ${process.platform}`)
    }
  },

  removeStoredPreferences: function() {
    try {
      fs.unlinkSync(path.join(this.getPath(), 'Settings'))
    } catch (error) {
      if (error.code !== 'ENOENT')
        throw error
    }
  }
}
