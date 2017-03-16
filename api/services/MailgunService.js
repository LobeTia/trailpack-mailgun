'use strict'

const Service = require('trails-service')

/**
 * @module MailgunService
 * @description TODO document Service
 */
module.exports = class MailgunService extends Service {
  init() {
    const config = this.app.config.mailgun

    this.mailgunInstance = require('mailgun-js')(config)
  }

  send(data) {

    return new Promise((fullfill, reject) => {

      if (!data.from) {reject('MailgunService.send require a from parameter'); return false}
      if (!data.to) {reject('MailgunService.send require a to parameter'); return false}
      if (!data.subject) {reject('MailgunService.send require a subject parameter'); return false}
      if (!data.text) {reject('MailgunService.send require a text parameter'); return false}

      this.mailgunInstance.messages().send(data, function(error, body) {
        if (error) reject(error)
        fullfill(body)
      })
    })
  }
}

