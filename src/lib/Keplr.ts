export default class Keplr {

    constructor() {
        window.onload = async () => {
            if (window.keplr) {
                window.keplr.defaultOptions = {
                    sign: {
                        preferNoSetFee: true,
                        preferNoSetMemo: true,
                    },
                };
            }
        }
    }

    suggestChain = async () => {
        let { current } = window.chainStore;
        console.log("window chainstore current: ", window.chainStore.current);
        await window.keplr.experimentalSuggestChain(current);
        console.log("after suggest chain");
        await window.keplr.enable(current.chainId);
        console.log("enabled");

    };

    async getKeplr(): Promise<keplrType | undefined> {
        return window.keplr
    }

    private async getKeplrKey(): Promise<any | undefined> {
        let { current } = window.chainStore;
        const keplr = await this.getKeplr();
        if (keplr) {
            console.log("keplr key: ", await keplr.getKey(current.chainId));
            return keplr.getKey(current.chainId);
        }
        return undefined;
    }

    async getKeplrAddr(): Promise<String | undefined> {
        const key = await this.getKeplrKey();
        return key.bech32Address;
    }

    async getKeplrPubKey(): Promise<Uint8Array | undefined> {
        const key = await this.getKeplrKey();
        return key.pubKey;
    }
}
