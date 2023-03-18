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

    this.public_endpoints = {
      'aggTrades': '/api/v3/aggTrades',
      'avgPrice': '/api/v3/avgPrice',
      'bookTicker': '/api/v3/bookTicker',
      'dayTicker': '/api/v3/24hr',
      'depth': '/api/v3/depth',
      'info': '/api/v3/exchangeInfo',
      'klines': '/api/v3/klines',
      'ping': '/api/v3/ping',
      'price': '/api/v3/price',
      'prices': '/api/v3/ticker/price',
      'ticker': '/api/v3/ticker',
      'time': '/api/v3/time',
      'trades': '/api/v3/trades',
      'uiKlines': '/api/v3/uiKlines',
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
