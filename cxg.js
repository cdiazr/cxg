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

        prices.push({[host]: data})
    });

    return prices
}

function getExchangeName(host) {
    let dotsNum = host.match(/\./g).length
    let pattern = dotsNum == 2? /^[^.]+\.|(\.\w+)$|\.[^.]+/g : /(\.\w+)$|\.[^.]+/g;

    return host.replace(pattern, '')
}

function getData(filename, exchanges) {
    fs.writeFile(`${filename}.json`, JSON.stringify(exchanges), function(err) {
        if(err)
            return console.log(err);

        console.log("The file was saved!");
    });
}

getTablePrices(['binance', 'kucoin', 'gemini']).then( priceTable => {
    console.log(priceTable[2])
})