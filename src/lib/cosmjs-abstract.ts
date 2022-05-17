import { Coin, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
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
    async handleUpload(_args: any): Promise<any> {
        throw new Error("Method 'handleUpload()' must be implemented.");
    }
    async handleInstantiate(_args: any): Promise<any> {
        throw new Error("Method 'handleInstantiate()' must be implemented.");
    }
    async query(_address: string, _queryMsg: string): Promise<any> {
        throw new Error("Method 'query()' must be implemented.");
    }
    async execute(_args: { mnemonic: string, address: string, handleMsg: string, handleOptions?: any, gasAmount: { amount: string, denom: string }, gasLimits?: any }): Promise<any> {
        throw new Error("Method 'execute()' must be implemented.");
    }async migrate(_args: { mnemonic: string, address: string, codeId: any, handleMsg: string, handleOptions?: any, gasAmount: { amount: string, denom: string }, gasLimits?: any }): Promise<any> {
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

/**
 * The options of an .instantiate() call.
 * All properties are optional.
 */
export interface HandleOptions {
    readonly memo?: string;
    /**
     * The funds that are transferred from the sender to the newly created contract.
     * The funds are transferred as part of the message execution after the contract address is
     * created and before the instantiation message is executed by the contract.
     *
     * Only native tokens are supported.
     *
     * TODO: Rename to `funds` for consistency (https://github.com/cosmos/cosmjs/issues/806)
     */
    readonly funds?: readonly Coin[];
}