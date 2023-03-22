export default class BinanceCXG {
  'use strict'

  constructor() {
    this.host = [
      'https://api.binance.com',
      'https://api1.binance.com',
      'https://api2.binance.com',
      'https://api3.binance.com',
      'https://api4.binance.com'
    ]

    this.version = '/api/v3'

    this.public_endpoints = {
      'aggTrades': this.version + '/aggTrades',
      'avgPrice': this.version + '/avgPrice',
      'bookTicker': this.version + '/bookTicker',
      'dayTicker': this.version + '/24hr',
      'depth': this.version + '/depth',
      'info': this.version + '/exchangeInfo',
      'klines': this.version + '/klines',
      'ping': this.version + '/ping',
      'price': this.version + '/price',
      'prices': this.version + '/ticker/price',
      'ticker': this.version + '/ticker',
      'time': this.version + '/time',
      'trades': this.version + '/trades',
      'uiKlines': this.version + '/uiKlines',
    }
  }

  getDataRequested(endpoint, host = 0) {
    return `${this.host[host]}${this.public_endpoints[endpoint]}`
  }

  getFilteredPrices(response) {
    let array = {}
    let json = response.data

    json.forEach(res => {
      let symbol = res['symbol']
      let asset = symbol.substring(symbol.length - 4)
      if (asset == 'USDT') {
        array[symbol.replace(asset, '')] = res['price']
      }
    })

    return array
  }
}
