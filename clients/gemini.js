export default class BitgetCXG {
    'use strict'

    constructor() {
      this.host = [
        'https://api.gemini.com/'
      ]

      this.v1 = '/v1'

      this.public_endpoints = {
        'symbols': this.v1 + '/symbols',
        'prices': this.v1 + '/pricefeed'
      }
    }

    getDataRequested(endpoint, host = 0) {
        return `${this.host[host]}${this.public_endpoints[endpoint]}`
    }

    getFilteredPrices(response) {
      let array = {}
      let json = response.data

      json.forEach(res => {
        let symbol = res['pair']
        let asset = symbol.substring(symbol.length - 3)
        if (asset == 'USD') {
          array[symbol.replace(asset, '')] = res['price']
        }
      })

      return array
    }
}