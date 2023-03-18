export default class BitstampCXG {
    'use strict'

    constructor() {
      this.host = [
        'https://https://www.bitstamp.net/'
      ]

      this.public_endpoints = {
        'symbols': '/api/spot/v1/public/currencies',
        'prices': '/api/v2/ticker/'
      }
    }

    getDataRequested(endpoint, host = 0) {
        return `${this.host[host]}${this.public_endpoints[endpoint]}`
    }
}