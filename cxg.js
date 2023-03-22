import axios from 'axios'
import fs from 'fs';

import BinanceCXG from './clients/binance.js'
import KucoinCXG from './clients/kucoin.js'
import BitgetCXG from './clients/bitget.js'
import KrakenCXG from './clients/kraken.js'
import BitfinexCXG from './clients/kraken.js'
import CoinbaseCXG from './clients/coinbase.js'
import GeminiCXG from './clients/gemini.js'
import BitstampCXG from './clients/bitstamp.js'

const activeExchanges = {
    'binance': BinanceCXG,
    'kucoin': KucoinCXG,
    'bitget': BitgetCXG,
    'kraken': KrakenCXG,
    'kraken': BitfinexCXG,
    'coinbase': CoinbaseCXG,
    'gemini': GeminiCXG,
    'bitstamp': BitstampCXG,
}

async function getTablePrices(exchanges) {
    let prices = []
    let awaitingResponses = []

    // Connecting to each given exchanger and retrieving their data
    exchanges.forEach(element => {
        let client = new activeExchanges[element]()
        let endpoint = axios.get(client.getDataRequested('prices'))

        // Recording all promises
        awaitingResponses.push(endpoint)
    });

    const data = await Promise.all(awaitingResponses);

    data.forEach(response => {

        let host = getExchangeName(response.request.host)

        let client = new activeExchanges[host]()
        let data = client.getFilteredPrices(response)

        prices.push({name: host, data: data})
    });

    return prices
}

function getExchangeName(host) {
    let dotsNum = host.match(/\./g).length
    let pattern = dotsNum == 2? /^[^.]+\.|(\.\w+)$|\.[^.]+/g : /(\.\w+)$|\.[^.]+/g;

    return host.replace(pattern, '')
}

getTablePrices(['binance', 'kucoin', 'gemini']).then( priceTable => {
    let counter = 0
    let cryptoPrices = []

    priceTable.forEach(result => {
        let exchanger = result.name
        let prices = result.data

        let keys = Object.entries(prices);

        // Construye la colección con los precios de cada crypto en los diferentes exchangers
        keys.forEach(item => {
            if(!counter)
                cryptoPrices.push({symbol: item[0], exchangers: [
                    {
                        name: exchanger, price: item[1]
                    }]
                })
            else {
                if (cryptoPrices != undefined) {
                    const symbol = cryptoPrices.find(row => row.symbol === item[0])

                    if(symbol != undefined) {
                        symbol.exchangers.push({name: exchanger, price: item[1]})
                    }
                }

                return false
            }
        })

        counter++

    })
})