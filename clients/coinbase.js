export default class CoinbaseCXG {
    'use strict'

    constructor() {
      this.host = [
        'https://api.coinbase.com'
      ]

      this.public_endpoints = {
        'prices': '/v2/prices/usd/spot'
      }
    }

    getDataRequested(endpoint, host = 0) {
        return `${this.host[host]}${this.public_endpoints[endpoint]}`
    }
}