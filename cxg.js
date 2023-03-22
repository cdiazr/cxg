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

function searchDiffs(objectData) {
    const array = []
    objectData.forEach(symbol => {
        if(symbol.exchangers.length == 3) {
            let maxDiff = 0;
            for (let i = 0; i < symbol.exchangers.length; i++) {
                for (let j = i + 1; j < symbol.exchangers.length; j++) {
                    const price1 = parseFloat(symbol.exchangers[i].price);
                    const price2 = parseFloat(symbol.exchangers[j].price);
                    const diff = Math.abs(price1 - price2);
                    if (diff > maxDiff)
                        maxDiff = diff;

                }
            }

            const maxPrice = Math.max(...symbol.exchangers.map(ex => parseFloat(ex.price)));
            const minPrice = Math.min(...symbol.exchangers.map(ex => parseFloat(ex.price)));
            const avgPrice = (maxPrice + minPrice) / 2;
            const percentDiff = (maxDiff / avgPrice) * 100;
            const amountDiff = maxPrice - minPrice;

            symbol.diff.percent = percentDiff;
            symbol.diff.amount = amountDiff;

            array.push(symbol)
        }
    })

    return array
}

getTablePrices(['binance', 'kucoin', 'gemini']).then( priceTable => {
    let counter = 0
    let cryptoPrices = []

    // Construye la colección con los precios de cada crypto en los diferentes exchangers
    priceTable.forEach(result => {
        let exchanger = result.name
        let prices = result.data

        let keys = Object.entries(prices);

        // Main object
        keys.forEach(item => {
            if(!counter)
                cryptoPrices.push({
                    symbol: item[0],
                    exchangers: [
                        {name: exchanger, price: item[1]}
                    ],
                    diff: {
                        percent: 0,
                        amount: 0
                    }
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

    // Searching differences
    const result = searchDiffs(cryptoPrices)
    console.log(result)
})