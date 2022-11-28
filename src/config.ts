import { Bech32Address } from "@keplr-wallet/cosmos";
import { ChainInfoWithExplorer } from "./stores/chain";

/**
 * A list of Cosmos chain infos. If we need to add / remove any chains, just directly update this variable.
 */
export const EmbedChainInfos: ChainInfoWithExplorer[] = [
  {
    rpc: "https://testnet-rpc.orai.io",
    rest: "https://testnet-lcd.orai.io",
    chainId: "Oraichain-testnet",
    chainName: "Oraichain Testnet",
    stakeCurrency: {
      coinDenom: "ORAI",
      coinMinimalDenom: "orai",
      coinDecimals: 6,
      coinGeckoId: "oraichain-token",
      coinImageUrl: window.location.origin + "/public/assets/tokens/orai.png"
    },
    bip44: {
      coinType: 118
    },
    bech32Config: Bech32Address.defaultBech32Config("orai"),
    currencies: [
      {
        coinDenom: "ORAI",
        coinMinimalDenom: "orai",
        coinDecimals: 6,
        coinGeckoId: "oraichain-token",
        coinImageUrl: window.location.origin + "/public/assets/tokens/orai.png"
      }
    ],
    feeCurrencies: [
      {
        coinDenom: "ORAI",
        coinMinimalDenom: "orai",
        coinDecimals: 6,
        coinGeckoId: "oraichain-token",
        coinImageUrl: window.location.origin + "/public/assets/tokens/orai.png"
      }
    ],
    gasPriceStep: {
      low: 0,
      average: 0.0025,
      high: 0.004
    },
    features: ["stargate", "ibc-transfer", "cosmwasm"],
    explorerUrlToTx: "https://testnet.scan.orai.io/txs/${txHash}",
    cosmwasmVersion: "1.0.0",
    faucet: "https://testnet-faucet.web.app/"
  },
  {
    rpc: "https://rpc.orai.io",
    rest: "https://lcd.orai.io",
    chainId: "Oraichain",
    chainName: "Oraichain",
    stakeCurrency: {
      coinDenom: "ORAI",
      coinMinimalDenom: "orai",
      coinDecimals: 6,
      coinGeckoId: "oraichain-token",
      coinImageUrl: window.location.origin + "/public/assets/tokens/orai.png"
    },
    walletUrl: "https://api.wallet.orai.io",
    bip44: {
      coinType: 118
    },
    bech32Config: Bech32Address.defaultBech32Config("orai"),
    currencies: [
      {
        coinDenom: "ORAI",
        coinMinimalDenom: "orai",
        coinDecimals: 6,
        coinGeckoId: "oraichain-token",
        coinImageUrl: window.location.origin + "/public/assets/tokens/orai.png"
      },
      {
        coinDenom: "ORAI",
        coinMinimalDenom: "orai",
        coinDecimals: 6,
        coinGeckoId: "oraichain-token",
        coinImageUrl: window.location.origin + "/public/assets/tokens/orai.png"
      }
    ],
    feeCurrencies: [
      {
        coinDenom: "ORAI",
        coinMinimalDenom: "orai",
        coinDecimals: 6,
        coinGeckoId: "oraichain-token",
        coinImageUrl: window.location.origin + "/public/assets/tokens/orai.png"
      }
    ],
    gasPriceStep: {
      low: 0,
      average: 0.0025,
      high: 0.004
    },
    features: ["stargate", "ibc-transfer", "cosmwasm"],
    explorerUrlToTx: "https://scan.orai.io/txs/${txHash}",
    cosmwasmVersion: "1.0.0"
  },
  {
    rpc: "https://rpc.malaga-420.cosmwasm.com",
    rest: "https://api.malaga-420.cosmwasm.com",
    chainId: "malaga-420",
    chainName: "Malaga",
    stakeCurrency: {
      coinDenom: "Málaga",
      coinMinimalDenom: "umlg",
      coinDecimals: 6,
      coinImageUrl: ""
    },
    bip44: {
      coinType: 118
    },
    bech32Config: {
      bech32PrefixAccAddr: "wasm",
      bech32PrefixAccPub: "wasmpub",
      bech32PrefixConsAddr: "wasmvalcons",
      bech32PrefixConsPub: "wasmvalconspub",
      bech32PrefixValAddr: "wasmvaloper",
      bech32PrefixValPub: "wasmvaloperpub"
    },
    currencies: [
      {
        coinDenom: "Málaga",
        coinMinimalDenom: "umlg",
        coinDecimals: 6,
        coinImageUrl: ""
      }
    ],
    feeCurrencies: [
      {
        coinDenom: "Málaga",
        coinMinimalDenom: "umlg",
        coinDecimals: 6,
        coinImageUrl: ""
      }
    ],
    gasPriceStep: {
      low: 0,
      average: 0.025,
      high: 0.004
    },
    features: ["stargate", "ibc-transfer", "cosmwasm"],
    cosmwasmVersion: "1.0.0"
  },
  {
    rpc: "https://rpc-test.osmosis.zone",
    rest: "https://lcd-test.osmosis.zone",
    chainId: "osmo-test-4",
    chainName: "Osmosis Testnet",
    stakeCurrency: {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinImageUrl: ""
    },
    bip44: {
      coinType: 118
    },
    bech32Config: {
      bech32PrefixAccAddr: "osmo",
      bech32PrefixAccPub: "osmopub",
      bech32PrefixConsAddr: "osmovalcons",
      bech32PrefixConsPub: "osmovalconspub",
      bech32PrefixValAddr: "osmosvaloper",
      bech32PrefixValPub: "osmovaloperpub"
    },
    currencies: [
      {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6,
        coinImageUrl: ""
      }
    ],
    feeCurrencies: [
      {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6,
        coinImageUrl: ""
      }
    ],
    gasPriceStep: {
      low: 0,
      average: 0.025,
      high: 0.004
    },
    features: ["stargate", "ibc-transfer", "cosmwasm"],
    cosmwasmVersion: "1.0.0",
    faucet: "https://faucet.osmosis.zone/"
  },
  {
    rpc: "https://rpc.osmosis.zone",
    rest: "https://lcd.osmosis.zone",
    chainId: "osmosis-1",
    chainName: "Osmosis Mainnet",
    stakeCurrency: {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
      coinImageUrl: ""
    },
    bip44: {
      coinType: 118
    },
    bech32Config: {
      bech32PrefixAccAddr: "osmo",
      bech32PrefixAccPub: "osmopub",
      bech32PrefixConsAddr: "osmovalcons",
      bech32PrefixConsPub: "osmovalconspub",
      bech32PrefixValAddr: "osmosvaloper",
      bech32PrefixValPub: "osmovaloperpub"
    },
    currencies: [
      {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6,
        coinImageUrl: ""
      }
    ],
    feeCurrencies: [
      {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6,
        coinImageUrl: ""
      }
    ],
    gasPriceStep: {
      low: 0,
      average: 0.025,
      high: 0.004
    },
    features: ["stargate", "ibc-transfer", "cosmwasm"],
    cosmwasmVersion: "1.0.0",
    explorerUrlToTx: "https://www.mintscan.io/osmosis/txs/${txHash}",
  },
  {
    rpc: "https://rpc.one.theta-devnet.polypore.xyz",
    rest: "https://rest.one.theta-devnet.polypore.xyz",
    chainId: "theta-testnet-001",
    chainName: "CosmosHub Testnet",
    stakeCurrency: {
      coinDenom: "ATOM",
      coinMinimalDenom: "uatom",
      coinDecimals: 6,
      coinImageUrl: ""
    },
    bip44: {
      coinType: 118
    },
    bech32Config: {
      bech32PrefixAccAddr: "atom",
      bech32PrefixAccPub: "atompub",
      bech32PrefixConsAddr: "atomvalcons",
      bech32PrefixConsPub: "atomvalconspub",
      bech32PrefixValAddr: "atomsvaloper",
      bech32PrefixValPub: "atomvaloperpub"
    },
    currencies: [
      {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinImageUrl: ""
      }
    ],
    feeCurrencies: [
      {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinImageUrl: ""
      }
    ],
    gasPriceStep: {
      low: 0,
      average: 0.025,
      high: 0.004
    },
    features: ["stargate", "ibc-transfer", "cosmwasm"],
    cosmwasmVersion: "1.0.0",
    explorerUrlToTx: "https://explorer.theta-testnet.polypore.xyz/transactions/{txhash}"
  },
  // {
  //   rpc: "https://rpc.uni.juno.deuslabs.fi",
  //   rest: "https://lcd.uni.juno.deuslabs.fi",
  //   chainId: "uni",
  //   chainName: "uni",
  //   stakeCurrency: {
  //     coinDenom: "JUNO",
  //     coinMinimalDenom: "ujunox",
  //     coinDecimals: 6,
  //     coinGeckoId: "none"
  //   },
  //   bip44: {
  //     coinType: 118
  //   },
  //   bech32Config: Bech32Address.defaultBech32Config("juno"),
  //   currencies: [
  //     {
  //       coinDenom: "JUNO",
  //       coinMinimalDenom: "ujunox",
  //       coinDecimals: 6,
  //       coinGeckoId: "none"
  //     }
  //   ],
  //   feeCurrencies: [
  //     {
  //       coinDenom: "JUNO",
  //       coinMinimalDenom: "ujunox",
  //       coinDecimals: 6,
  //       coinGeckoId: "none"
  //     }
  //   ],
  //   gasPriceStep: {
  //     low: 0,
  //     average: 0.001,
  //     high: 0.004
  //   },
  //   features: ["stargate", "ibc-transfer", "cosmwasm"],
  //   explorerUrlToTx: "https://uni.junoscan.com",
  //   cosmwasmVersion: "0.16.0",
  //   faucet: "https://faucet.uni.juno.deuslabs.fi"
  // },
  // {
  //   rpc: "https://rpc.test.provenance.io",
  //   rest: "https://lcd.test.provenance.io",
  //   chainId: "pio-testnet-1",
  //   chainName: "Proverance Testnet",
  //   stakeCurrency: {
  //     coinDenom: "HASH",
  //     coinMinimalDenom: "nhash",
  //     coinDecimals: 9,
  //     coinGeckoId: "hash-token",
  //     coinImageUrl: window.location.origin + "/public/assets/tokens/terra.png"
  //   },
  //   bip44: {
  //     coinType: 118
  //   },
  //   bech32Config: Bech32Address.defaultBech32Config("tp"),
  //   currencies: [
  //     {
  //       coinDenom: "HASH",
  //       coinMinimalDenom: "nhash",
  //       coinDecimals: 9,
  //       coinGeckoId: "hash-token",
  //       coinImageUrl: window.location.origin + "/public/assets/tokens/terra.png"
  //     },
  //     {
  //       coinDenom: "HASH",
  //       coinMinimalDenom: "nhash",
  //       coinDecimals: 9,
  //       coinGeckoId: "hash-token",
  //       coinImageUrl: window.location.origin + "/public/assets/tokens/terra.png"
  //     }
  //   ],
  //   feeCurrencies: [
  //     {
  //       coinDenom: "HASH",
  //       coinMinimalDenom: "nhash",
  //       coinDecimals: 9,
  //       coinGeckoId: "hash-token",
  //       coinImageUrl: window.location.origin + "/public/assets/tokens/terra.png"
  //     }
  //   ],
  //   features: ["stargate", "ibc-transfer", "cosmwasm"],
  //   explorerUrlToTx: "https://explorer.test.provenance.io/tx/{txHash}",
  //   cosmwasmVersion: "0.16.0"
  // },
  // {
  //   rpc: "https://rpc-stargateworld.fetch.ai",
  //   rest: "https://rest-stargateworld.fetch.ai",
  //   chainId: "stargateworld-3",
  //   chainName: "Fetch AI Testnet",
  //   stakeCurrency: {
  //     coinDenom: "testfet",
  //     coinMinimalDenom: "atestfest",
  //     coinDecimals: 18,
  //     coinGeckoId: "fetch-ai",
  //     coinImageUrl:
  //       window.location.origin + "/public/assets/tokens/fetch-ai.png"
  //   },
  //   bip44: {
  //     coinType: 118
  //   },
  //   bech32Config: Bech32Address.defaultBech32Config("fetch"),
  //   currencies: [
  //     {
  //       coinDenom: "testfet",
  //       coinMinimalDenom: "atestfest",
  //       coinDecimals: 18,
  //       coinGeckoId: "fetch-ai",
  //       coinImageUrl:
  //         window.location.origin + "/public/assets/tokens/fetch-ai.png"
  //     },
  //     {
  //       coinDenom: "testfet",
  //       coinMinimalDenom: "atestfest",
  //       coinDecimals: 18,
  //       coinGeckoId: "fetch-ai",
  //       coinImageUrl:
  //         window.location.origin + "/public/assets/tokens/fetch-ai.png"
  //     }
  //   ],
  //   feeCurrencies: [
  //     {
  //       coinDenom: "testfet",
  //       coinMinimalDenom: "atestfest",
  //       coinDecimals: 18,
  //       coinGeckoId: "fetch-ai",
  //       coinImageUrl:
  //         window.location.origin + "/public/assets/tokens/fetch-ai.png"
  //     }
  //   ],
  //   features: ["stargate", "ibc-transfer", "cosmwasm"],
  //   explorerUrlToTx:
  //     "https://explore-stargateworld.fetch.ai/transactions/{txHash}",
  //   cosmwasmVersion: "0.14.0"
  // },
  // {
  //   rpc: "https://rpc.cliffnet.cosmwasm.com/",
  //   rest: "https://lcd.cliffnet.cosmwasm.com/",
  //   chainId: "cliffnet-1",
  //   chainName: "Cliffnet",
  //   stakeCurrency: {
  //     coinDenom: "ROCK",
  //     coinMinimalDenom: "urock",
  //     coinDecimals: 6,
  //     coinGeckoId: "none"
  //   },
  //   bip44: {
  //     coinType: 118
  //   },
  //   bech32Config: Bech32Address.defaultBech32Config("wasm"),
  //   currencies: [
  //     {
  //       coinDenom: "PEBBLE",
  //       coinMinimalDenom: "upebble",
  //       coinDecimals: 6,
  //       coinGeckoId: "none"
  //     },
  //     {
  //       coinDenom: "ROCK",
  //       coinMinimalDenom: "urock",
  //       coinDecimals: 6,
  //       coinGeckoId: "none"
  //     }
  //   ],
  //   feeCurrencies: [
  //     {
  //       coinDenom: "PEBBLE",
  //       coinMinimalDenom: "upebble",
  //       coinDecimals: 6,
  //       coinGeckoId: "none"
  //     }
  //   ],
  //   gasPriceStep: {
  //     low: 0,
  //     average: 0.0025,
  //     high: 0.004
  //   },
  //   features: ["stargate", "ibc-transfer", "cosmwasm"],
  //   explorerUrlToTx:
  //     "https://block-explorer.cliffnet.cosmwasm.com/transactions/{txHash}",
  //   cosmwasmVersion: "1.0.0",
  //   faucet: "https://faucet.cliffnet.cosmwasm.com/"
  // },
  // {
  //     rpc: 'https://rpc-regen.keplr.app',
  //     rest: 'https://lcd-regen.keplr.app',
  //     chainId: 'regen-1',
  //     chainName: 'Regen Network',
  //     stakeCurrency: {
  //         coinDenom: 'REGEN',
  //         coinMinimalDenom: 'uregen',
  //         coinDecimals: 6,
  //         coinImageUrl: window.location.origin + '/public/assets/tokens/regen.png',
  //         coinGeckoId: 'regen',
  //     },
  //     bip44: { coinType: 118 },
  //     bech32Config: Bech32Address.defaultBech32Config('regen'),
  //     currencies: [
  //         {
  //             coinDenom: 'REGEN',
  //             coinMinimalDenom: 'uregen',
  //             coinDecimals: 6,
  //             coinImageUrl: window.location.origin + '/public/assets/tokens/regen.png',
  //             coinGeckoId: 'regen',
  //         },
  //     ],
  //     feeCurrencies: [
  //         {
  //             coinDenom: 'REGEN',
  //             coinMinimalDenom: 'uregen',
  //             coinDecimals: 6,
  //             coinImageUrl: window.location.origin + '/public/assets/tokens/regen.png',
  //             coinGeckoId: 'regen',
  //         },
  //     ],
  //     features: ['stargate', 'ibc-transfer', 'cosmwasm'],
  //     explorerUrlToTx: 'https://regen.aneka.io/txs/{txHash}',
  // },
  // {
  //     rpc: 'https://rpc-sentinel.keplr.app',
  //     rest: 'https://lcd-sentinel.keplr.app',
  //     chainId: 'sentinelhub-2',
  //     chainName: 'Sentinel',
  //     stakeCurrency: {
  //         coinDenom: 'DVPN',
  //         coinMinimalDenom: 'udvpn',
  //         coinDecimals: 6,
  //         coinGeckoId: 'sentinel',
  //         coinImageUrl: window.location.origin + '/public/assets/tokens/dvpn.png',
  //     },
  //     bip44: { coinType: 118 },
  //     bech32Config: Bech32Address.defaultBech32Config('sent'),
  //     currencies: [
  //         {
  //             coinDenom: 'DVPN',
  //             coinMinimalDenom: 'udvpn',
  //             coinDecimals: 6,
  //             coinGeckoId: 'sentinel',
  //             coinImageUrl: window.location.origin + '/public/assets/tokens/dvpn.png',
  //         },
  //     ],
  //     feeCurrencies: [
  //         {
  //             coinDenom: 'DVPN',
  //             coinMinimalDenom: 'udvpn',
  //             coinDecimals: 6,
  //             coinGeckoId: 'sentinel',
  //             coinImageUrl: window.location.origin + '/public/assets/tokens/dvpn.png',
  //         },
  //     ],
  //     explorerUrlToTx: 'https://www.mintscan.io/sentinel/txs/{txHash}',
  //     features: ['stargate', 'ibc-transfer', 'cosmwasm'],
  // },
  // {
  //     rpc: 'https://rpc-persistence.keplr.app',
  //     rest: 'https://lcd-persistence.keplr.app',
  //     chainId: 'core-1',
  //     chainName: 'Persistence',
  //     stakeCurrency: {
  //         coinDenom: 'XPRT',
  //         coinMinimalDenom: 'uxprt',
  //         coinDecimals: 6,
  //         coinGeckoId: 'persistence',
  //         coinImageUrl: window.location.origin + '/public/assets/tokens/xprt.png',
  //     },
  //     bip44: {
  //         coinType: 750,
  //     },
  //     bech32Config: Bech32Address.defaultBech32Config('persistence'),
  //     currencies: [
  //         {
  //             coinDenom: 'XPRT',
  //             coinMinimalDenom: 'uxprt',
  //             coinDecimals: 6,
  //             coinGeckoId: 'persistence',
  //             coinImageUrl: window.location.origin + '/public/assets/tokens/xprt.png',
  //         },
  //     ],
  //     feeCurrencies: [
  //         {
  //             coinDenom: 'XPRT',
  //             coinMinimalDenom: 'uxprt',
  //             coinDecimals: 6,
  //             coinGeckoId: 'persistence',
  //             coinImageUrl: window.location.origin + '/public/assets/tokens/xprt.png',
  //         },
  //     ],
  //     features: ['stargate', 'ibc-transfer', 'cosmwasm'],
  //     explorerUrlToTx: 'https://www.mintscan.io/persistence/txs/{txHash}',
  // },
  // {
  //     rpc: 'https://rpc-iris.keplr.app',
  //     rest: 'https://lcd-iris.keplr.app',
  //     chainId: 'irishub-1',
  //     chainName: 'IRISnet',
  //     stakeCurrency: {
  //         coinDenom: 'IRIS',
  //         coinMinimalDenom: 'uiris',
  //         coinDecimals: 6,
  //         coinGeckoId: 'iris-network',
  //         coinImageUrl: window.location.origin + '/public/assets/tokens/iris.svg',
  //     },
  //     bip44: {
  //         coinType: 118,
  //     },
  //     bech32Config: Bech32Address.defaultBech32Config('iaa'),
  //     currencies: [
  //         {
  //             coinDenom: 'IRIS',
  //             coinMinimalDenom: 'uiris',
  //             coinDecimals: 6,
  //             coinGeckoId: 'iris-network',
  //             coinImageUrl: window.location.origin + '/public/assets/tokens/iris.svg',
  //         },
  //     ],
  //     feeCurrencies: [
  //         {
  //             coinDenom: 'IRIS',
  //             coinMinimalDenom: 'uiris',
  //             coinDecimals: 6,
  //             coinGeckoId: 'iris-network',
  //             coinImageUrl: window.location.origin + '/public/assets/tokens/iris.svg',
  //         },
  //     ],
  //     features: ['stargate', 'ibc-transfer', 'cosmwasm'],
  //     explorerUrlToTx: 'https://www.mintscan.io/iris/txs/{txHash}',
  // },
  // {
  //     rpc: 'http://35.234.10.84:26657',
  //     rest: 'http://35.234.10.84:1317',
  //     chainId: 'nyancat-9',
  //     chainName: 'IRISnet Testnet',
  //     stakeCurrency: {
  //         coinDenom: 'IRIS',
  //         coinMinimalDenom: 'uiris',
  //         coinDecimals: 6,
  //         coinGeckoId: 'iris-network',
  //         coinImageUrl: window.location.origin + '/public/assets/tokens/iris.svg',
  //     },
  //     bip44: {
  //         coinType: 118,
  //     },
  //     bech32Config: Bech32Address.defaultBech32Config('iaa'),
  //     currencies: [
  //         {
  //             coinDenom: 'IRIS',
  //             coinMinimalDenom: 'uiris',
  //             coinDecimals: 6,
  //             coinGeckoId: 'iris-network',
  //             coinImageUrl: window.location.origin + '/public/assets/tokens/iris.svg',
  //         },
  //     ],
  //     feeCurrencies: [
  //         {
  //             coinDenom: 'IRIS',
  //             coinMinimalDenom: 'uiris',
  //             coinDecimals: 6,
  //             coinGeckoId: 'iris-network',
  //             coinImageUrl: window.location.origin + '/public/assets/tokens/iris.svg',
  //         },
  //     ],
  //     features: ['stargate', 'ibc-transfer', 'cosmwasm'],
  //     explorerUrlToTx: 'https://nyancat.iobscan.io/#/tx?txHash={txHash}',
  // },
  // {
  //     rpc: 'https://rpc-emoney.keplr.app',
  //     rest: 'https://lcd-emoney.keplr.app',
  //     chainId: 'emoney-3',
  //     chainName: 'e-Money',
  //     stakeCurrency: {
  //         coinDenom: 'NGM',
  //         coinMinimalDenom: 'ungm',
  //         coinDecimals: 6,
  //         coinGeckoId: 'e-money',
  //         coinImageUrl: window.location.origin + '/public/assets/tokens/ngm.png',
  //     },
  //     bip44: {
  //         coinType: 118,
  //     },
  //     bech32Config: Bech32Address.defaultBech32Config('emoney'),
  //     currencies: [
  //         {
  //             coinDenom: 'NGM',
  //             coinMinimalDenom: 'ungm',
  //             coinDecimals: 6,
  //             coinGeckoId: 'e-money',
  //             coinImageUrl: window.location.origin + '/public/assets/tokens/ngm.png',
  //         },
  //         {
  //             coinDenom: 'EEUR',
  //             coinMinimalDenom: 'eeur',
  //             coinDecimals: 6,
  //             coinGeckoId: 'e-money-eur',
  //             coinImageUrl: window.location.origin + '/public/assets/tokens/ngm.png',
  //         },
  //     ],
  //     feeCurrencies: [
  //         {
  //             coinDenom: 'NGM',
  //             coinMinimalDenom: 'ungm',
  //             coinDecimals: 6,
  //             coinGeckoId: 'e-money',
  //             coinImageUrl: window.location.origin + '/public/assets/tokens/ngm.png',
  //         },
  //     ],
  //     gasPriceStep: {
  //         low: 1,
  //         average: 1,
  //         high: 1,
  //     },
  //     features: ['stargate', 'ibc-transfer', 'cosmwasm'],
  //     explorerUrlToTx: 'https://emoney.bigdipper.live/transactions/${txHash}',
  // },
];
