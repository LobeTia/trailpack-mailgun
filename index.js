'use strict'

const Trailpack = require('trailpack')

module.exports = class MailgunTrailpack extends Trailpack {

  /**
   * TODO document method
   */
  validate() {
    if (!this.app.config.mailgun) throw new Error('config.mailgun missing')
    if (!this.app.config.mailgun.apiKey) throw new Error('config.mailgun.apikey missing')
  }

  /**
   * TODO document method
   */
  configure() {

  }

  /**
   * TODO document method
   */
  initialize() {
    this.app.services.MailgunService.init()
    this.app.emit('trailpack-mailgun:ready')
    return Promise.resolve()
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

