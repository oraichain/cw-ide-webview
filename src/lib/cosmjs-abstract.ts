import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { stringToPath } from "@cosmjs/crypto";

/**
 * Abstract Class CosmJsAbstract.
 *
 * @class CosmJsAbstract
 */
export default class CosmJsAbstract {
    constructor() {
        if (this.constructor == CosmJsAbstract) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    async handleDeploy(_args: any): Promise<any> {
        throw new Error("Method 'handleDeploy()' must be implemented.");
    }
    async query(_address: string, _queryMsg: string): Promise<any> {
        throw new Error("Method 'query()' must be implemented.");
    }
    async execute(_args: { mnemonic: string, address: string, handleMsg: string, memo?: string, amount?: any, gasAmount: { amount: string, denom: string }, fees?: number }): Promise<any> {
        throw new Error("Method 'execute()' must be implemented.");
    }

    collectWallet = async (mnemonic?: string) => {
        const { current } = window.chainStore;
        if (!mnemonic) {
            const keplr = await window.Keplr.getKeplr();
            if (!keplr) {
                throw "You have to install Keplr first if you do not use a mnemonic to sign transactions";
            }
            // use keplr instead
            const wallet = keplr.getOfflineSigner(current.chainId);
            return wallet;
        } else {
            const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
                mnemonic,
                {
                    hdPaths: [stringToPath(current.hdPath ? current.hdPath : "m/44'/118'/0'/0/0")],
                    prefix: current.bech32Config.bech32PrefixAccAddr
                }
            );
            return wallet;
        }
    }
}