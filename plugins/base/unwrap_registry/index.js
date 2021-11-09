const Base = require('../base')
module.exports = class extends Base {
  exportSync () {
    const res = {
      validate: (plg) =>
        res.props = Object.entries(plg).filter(e => e[1].run && e[1].approx).map(e => e[0])
    }
    return res
  }
}
