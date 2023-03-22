export default class BitgetCXG {
    'use strict'

    constructor() {
      this.host = [
        'https://api.bitget.com'
      ]

      this.version = '/api/spot/v1'

      this.public_endpoints = {
        'symbols': this.version + '/public/currencies',
        'prices': this.version + '/market/tickers'
      }
    }

    getDataRequested(endpoint, host = 0) {
        return `${this.host[host]}${this.public_endpoints[endpoint]}`
    }

    getFilteredPrices(response) {
      let json = response.data.data

      return json
    }
}