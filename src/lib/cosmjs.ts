import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { stringToPath } from "@cosmjs/crypto";
import * as cosmwasm from '@cosmjs/cosmwasm-stargate';
import { GasPrice } from '@cosmjs/cosmwasm-stargate/node_modules/@cosmjs/stargate/build'
import { Decimal } from '@cosmjs/math'
import { decode } from "base64-arraybuffer";
import { Coin } from "@cosmjs/cosmwasm-stargate/build/codec/cosmos/base/v1beta1/coin";
import CosmJsAbstract, { HandleOptions } from "./cosmjs-abstract";
import { InstantiateOptions } from "@cosmjs/cosmwasm-launchpad";

class CosmJs extends CosmJsAbstract {
    /**
   * a wrapper method to deploy a smart contract
   * @param mnemonic - Your wallet's mnemonic to deploy the contract
   * @param wasmBody - The bytecode of the wasm contract file
   * @param initInput - initiate message of the contract in object string (use JSON.stringtify)
   * @param label (optional) - contract label
   * @param source (optional) - contract source code
   * @param builder (optional) - contract builder version
   * @param gasAmount - fees to deploy the contract
   * @param sentFunds - funds sent the contract
   * @returns - Contract address after the instantiation process
   */
    async handleDeploy(args: { mnemonic: string, wasmBody: string, initInput: any, label?: string | undefined, source?: string | undefined, builder?: string | undefined, gasAmount: { amount: string, denom: string }, instantiateOptions?: InstantiateOptions, gasLimits?: { upload: number, init: number } }) {
        const { mnemonic, wasmBody, initInput, label, source, gasAmount, builder, instantiateOptions, gasLimits } = args;
        const { current } = window.chainStore;
        // if keplr, we will try to suggest chain & enable it
        if (await window.Keplr.getKeplr()) await window.Keplr.suggestChain();
        // convert wasm body from base64 to bytes array
        const wasmCode = new Uint8Array(decode(wasmBody));
        try {
            const wallet = await this.collectWallet(mnemonic);
            const [firstAccount] = await wallet.getAccounts();
            console.log("first account: ", firstAccount);
            const gasPrice = GasPrice.fromString(`${gasAmount.amount}${gasAmount.denom}`);
            const client = await cosmwasm.SigningCosmWasmClient.connectWithSigner(current.rpc, wallet, { gasPrice: gasPrice, prefix: current.bech32Config.bech32PrefixAccAddr, gasLimits });

            // upload wasm contract to get code id
            const uploadResult = await client.upload(firstAccount.address, wasmCode, { source, builder });
            console.log("upload result: ", uploadResult);

            const codeId = uploadResult.codeId;
            const input = initInput;

            // instantiate contract with input
            const instantiateResult = await client.instantiate(firstAccount.address, codeId, input, label ? label : "smart contract", instantiateOptions);
            console.log("instantiate result: ", instantiateResult);
            return instantiateResult.contractAddress;
        } catch (error) {
            console.log("error in handle deploy CosmJs: ", error);
            throw error;
        }
    }

    async handleUpload(args: { mnemonic: string, wasmBody: string, source?: string | undefined, builder?: string | undefined, gasAmount: { amount: string, denom: string }, gasLimits?: { upload: number } }) {
        const { mnemonic, wasmBody, source, gasAmount, builder, gasLimits } = args;
        const { current } = window.chainStore;
        // if keplr, we will try to suggest chain & enable it
        if (await window.Keplr.getKeplr()) await window.Keplr.suggestChain();
        // convert wasm body from base64 to bytes array
        const wasmCode = new Uint8Array(decode(wasmBody));
        try {
            const wallet = await this.collectWallet(mnemonic);
            const [firstAccount] = await wallet.getAccounts();
            console.log("first account: ", firstAccount);
            const gasPrice = GasPrice.fromString(`${gasAmount.amount}${gasAmount.denom}`);
            const client = await cosmwasm.SigningCosmWasmClient.connectWithSigner(current.rpc, wallet, { gasPrice: gasPrice, prefix: current.bech32Config.bech32PrefixAccAddr, gasLimits });

            // upload wasm contract to get code id
            const uploadResult = await client.upload(firstAccount.address, wasmCode, { source, builder });
            console.log("upload result: ", uploadResult);

            const codeId = uploadResult.codeId;

            return codeId;
        } catch (error) {
            console.log("error in handle upload CosmJs: ", error);
            throw error;
        }
    }

    async handleInstantiate(args: { mnemonic: string, initInput: any, label?: string | undefined, gasAmount: { amount: string, denom: string }, instantiateOptions?: InstantiateOptions, gasLimits?: { init: number }, codeId: number }) {
        const { mnemonic, initInput, label, gasAmount, instantiateOptions, gasLimits, codeId } = args;
        const { current } = window.chainStore;
        // if keplr, we will try to suggest chain & enable it
        if (await window.Keplr.getKeplr()) await window.Keplr.suggestChain();
        // convert wasm body from base64 to bytes array
        try {
            const wallet = await this.collectWallet(mnemonic);
            const [firstAccount] = await wallet.getAccounts();
            console.log("first account: ", firstAccount);
            const gasPrice = GasPrice.fromString(`${gasAmount.amount}${gasAmount.denom}`);
            const client = await cosmwasm.SigningCosmWasmClient.connectWithSigner(current.rpc, wallet, { gasPrice: gasPrice, prefix: current.bech32Config.bech32PrefixAccAddr, gasLimits });

            const input = initInput;

            // instantiate contract with input
            const instantiateResult = await client.instantiate(firstAccount.address, codeId, input, label ? label : "smart contract", instantiateOptions);
            console.log("instantiate result: ", instantiateResult);
            return instantiateResult.contractAddress;
        } catch (error) {
            console.log("error in handle instantiate CosmJs: ", error);
            throw error;
        }
    }

    /**
     * A wrapper method to query state of a smart contract
     * @param address - contract address
     * @param queryMsg - input to query in JSON string
     * @returns - returns the parsed JSON document of the contract's query
     */
    async query(address: string, queryMsg: string) {
        const { current } = window.chainStore;
        try {
            const client = await cosmwasm.SigningCosmWasmClient.connect(current.rpc);
            const input = JSON.parse(queryMsg);
            return client.queryContractSmart(address, input);
        } catch (error) {
            console.log("error in query contract: ", error);
            throw error;
        }
    }

    /**
     * A wrapper method to execute a smart contract
     * @param args - an object containing essential parameters to execute contract
     * @returns - transaction hash after executing the contract
     */
    async execute(args: { mnemonic?: string, address: string, handleMsg: string, handleOptions?: HandleOptions, gasAmount?: { amount: string, denom: string }, gasLimits?: { exec: number } }) {
        try {
            const { mnemonic, address, handleMsg, handleOptions, gasAmount, gasLimits } = args;
            const { current } = window.chainStore;
            // if keplr, we will try to suggest chain & enable it
            if (await window.Keplr.getKeplr()) await window.Keplr.suggestChain();
            const wallet = await this.collectWallet(mnemonic);
            const [firstAccount] = await wallet.getAccounts();
            const client = await cosmwasm.SigningCosmWasmClient.connectWithSigner(current.rpc, wallet, { gasPrice: gasAmount ? GasPrice.fromString(`${gasAmount.amount}${gasAmount.denom}`) : undefined, prefix: current.bech32Config.bech32PrefixAccAddr, gasLimits });
            const input = JSON.parse(handleMsg);
            const result = await client.execute(firstAccount.address, address, input, handleOptions?.memo, handleOptions?.funds);
            return result.transactionHash;
        } catch (error) {
            console.log("error in executing contract: ", error);
            throw error;
        }
    }

    /**
     * A wrapper method to migrate a smart contract
     * @param args - an object containing essential parameters to execute contract
     * @returns - transaction hash after executing the contract
     */
    async migrate(args: { mnemonic?: string, codeId: number, address: string, handleMsg: string, handleOptions?: HandleOptions, gasAmount?: { amount: string, denom: string }, gasLimits?: { exec: number } }) {
        try {
            const { mnemonic, address, handleMsg, handleOptions, gasAmount, gasLimits, codeId } = args;
            const { current } = window.chainStore;
            // if keplr, we will try to suggest chain & enable it
            if (await window.Keplr.getKeplr()) await window.Keplr.suggestChain();
            const wallet = await this.collectWallet(mnemonic);
            const [firstAccount] = await wallet.getAccounts();
            const client = await cosmwasm.SigningCosmWasmClient.connectWithSigner(current.rpc, wallet, { gasPrice: gasAmount ? GasPrice.fromString(`${gasAmount.amount}${gasAmount.denom}`) : undefined, prefix: current.bech32Config.bech32PrefixAccAddr, gasLimits });
            const input = JSON.parse(handleMsg);
            const result = await client.migrate(firstAccount.address, address, codeId, input);
            return result.transactionHash;
        } catch (error) {
            console.log("error in executing contract: ", error);
            throw error;
        }
    }
};

export default CosmJs;