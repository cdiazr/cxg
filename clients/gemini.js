export default class BitgetCXG {
    'use strict'

    constructor() {
      this.host = [
        'https://api.gemini.com/'
      ]

      this.public_endpoints = {
        'symbols': '/v1/symbols',
        'prices': '/v1/pricefeed'
      }
    }

    getDataRequested(endpoint, host = 0) {
        return `${this.host[host]}${this.public_endpoints[endpoint]}`
    }

    getFilteredPrices(response) {
      let json = response.data

      return json
    }
}