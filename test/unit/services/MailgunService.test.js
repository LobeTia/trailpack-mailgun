'use strict'
/* global describe, it */

const Chai = require('chai')
const should = Chai.should()
const expect = Chai.expect
const MailgunService = require('../../../api/services/MailgunService')

describe('MailgunService', () => {
  describe('class & methods', () => {
    it('should exist', () => {
      should.exist(global.app.api.services.MailgunService)
    })
  })

  describe('configureTemplateRender', () => {
    const mailgunServiceInstance = new MailgunService()

    it('calling without an object should trigger error', () => {
      expect(function () {
        mailgunServiceInstance.configureTemplateRender(null)
      }).to.throw(Error)
    })
    it('calling without an object with .render method should trigger error', () => {
      expect(function () {
        mailgunServiceInstance.configureTemplateRender({})
      }).to.throw(Error)
    })
    it('passing an object with .render method should return true', () => {
      expect(mailgunServiceInstance.configureTemplateRender({
        render: function () {
        }
      })).to.equal(true)
    })
  })

  describe('getMailgunInstance', () => {
    it('should return Mailgun instance', () => {
      global.app.services.MailgunService.getMailgunInstance().should.be.a('object')
    })
  })
})
