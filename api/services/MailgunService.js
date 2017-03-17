'use strict'

const Service = require('trails-service')
const _ = require('lodash')
/**
 * @module MailgunService
 * @description TODO document Service
 */
module.exports = class MailgunService extends Service {
  init() {
    const config = this.app.config.mailgun

    this.mailgunInstance = require('mailgun-js')(config)
    this.templateRender  = null
  }

  messagesSend(data) {
    return new Promise((fullfill, reject) => {
      data.from = data.from || this.app.config.mailgun.defaultFrom

      this.mailgunInstance.messages().send(data, function(error, body) {
        if (error) reject(error)
        fullfill(body)
      })
    })
  }

  messagesSendTemplate(templateName, templateOptions, mailgunOptions) {
    if (!this.templateRender) throw new Error('should configure a templateRender first')

    return this.renderTemplate(templateName, templateOptions)
      .then(render => {
        return this.messagesSend(
          _.extend({
            subject: render.subject,
            html: render.html
          }, mailgunOptions)
        )
      })
  }

  renderTemplate(name, options) {
    return new Promise((fullfill, reject) => {
      this.templateRender.render(name, options, (error, render) => {
        if (error) reject(error)
        else {
          fullfill({
            subject: render.match(/<title[^>]*>(.*?)<\/title>/i)[1] || null,
            html: render
          })
        }
      })
    })
  }

  configureTemplateRender(fn) {
    this.templateRender = fn
  }

  getMailgunInstance() {
    return this.getMailgunInstance()
  }
}

