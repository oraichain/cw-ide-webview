# cw-ide-webview

## Add more Cosmos networks

At the moment, you need to create a PR submitting your network information. Afterward, we will review and merge it. Below is an example of the network's metadata:

```js
{
    "rpc": "https://testnet-rpc.orai.io",
    "rest": "https://testnet-lcd.orai.io",
    "chainId": "Oraichain-testnet",
    "chainName": "Oraichain Foobar",
    "stakeCurrency": {
        "coinDenom": "ORAI",
        "coinMinimalDenom": "orai",
        "coinDecimals": 6,
        "coinGeckoId": "oraichain-token",
        "coinImageUrl": "http://localhost:3000/public/assets/tokens/orai.png"
    },
    "bip44": {
        "coinType": 118
    },
    "bech32Config": {
        "bech32PrefixAccAddr": "orai",
        "bech32PrefixAccPub": "oraipub",
        "bech32PrefixConsAddr": "oraivalcons",
        "bech32PrefixConsPub": "oraivalconspub",
        "bech32PrefixValAddr": "oraivaloper",
        "bech32PrefixValPub": "oraivaloperpub"
    },
    "currencies": [
        {
            "coinDenom": "ORAI",
            "coinMinimalDenom": "orai",
            "coinDecimals": 6,
            "coinGeckoId": "oraichain-token",
            "coinImageUrl": "http://localhost:3000/public/assets/tokens/orai.png"
        }
    ],
    "feeCurrencies": [
        {
            "coinDenom": "ORAI",
            "coinMinimalDenom": "orai",
            "coinDecimals": 6,
            "coinGeckoId": "oraichain-token",
            "coinImageUrl": "http://localhost:3000/public/assets/tokens/orai.png"
        }
    ],
    "gasPriceStep": {
        "low": 0,
        "average": 0.0025,
        "high": 0.004
    },
    "features": [
        "stargate",
        "ibc-transfer",
        "cosmwasm"
    ],
    "cosmwasmVersion": "0.13.2" // the cosmwasm std your network is using.
}
```

It follows the same format as that of Keplr so that the webview can work with the extension. We also add a few attributes, which include comments above.

Please append the network information into the [config file](https://github.com/oraichain/vscode-cosmwasm/blob/master/src/config.ts) if you prefer to let your network be included in the IDE permanently. Please note that this requires reviewing & a pull request. The IDE also provides a feature that helps you add and remove custom networks & store them locally.