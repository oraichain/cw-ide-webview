import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { stringToPath } from "@cosmjs/crypto";
import * as cosmwasm from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/cosmwasm-stargate/node_modules/@cosmjs/stargate/build";
import { Decimal } from "@cosmjs/math";
import { decode } from "base64-arraybuffer";
import { Coin } from "@cosmjs/cosmwasm-stargate/build/codec/cosmos/base/v1beta1/coin";
import CosmJsAbstract, { HandleOptions } from "./cosmjs-abstract";
import { InstantiateOptions } from "@cosmjs/cosmwasm-launchpad";
import Cosmos from "@oraichain/cosmosjs";

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
  async handleDeploy(args: {
    mnemonic: string;
    wasmBody: string;
    initInput: any;
    label?: string | undefined;
    source?: string | undefined;
    builder?: string | undefined;
    gasAmount: { amount: string; denom: string };
    instantiateOptions?: InstantiateOptions;
    gasLimits?: { upload: 20000000; init: 15000000 };
  }) {
    const {
      mnemonic,
      wasmBody,
      initInput,
      label,
      source,
      gasAmount,
      builder,
      instantiateOptions,
      gasLimits,
    } = args;
    const { current } = window.chainStore;
    // if keplr, we will try to suggest chain & enable it
    if (await window.Keplr.getKeplr()) await window.Keplr.suggestChain();
    // convert wasm body from base64 to bytes array
    const wasmCode = new Uint8Array(decode(wasmBody));
    try {
      const wallet = await this.collectWallet(mnemonic);
      const [firstAccount] = await wallet.getAccounts();
      console.log("first account: ", firstAccount);
      const gasPrice = GasPrice.fromString(
        `${gasAmount.amount}${gasAmount.denom}`
      );
      const client = await cosmwasm.SigningCosmWasmClient.connectWithSigner(
        current.rpc,
        wallet,
        {
          gasPrice: gasPrice,
          prefix: current.bech32Config.bech32PrefixAccAddr,
          gasLimits,
        }
      );

      // upload wasm contract to get code id
      const uploadResult = await client.upload(firstAccount.address, wasmCode, {
        source,
        builder,
      });
      console.log("upload result: ", uploadResult);

      const codeId = uploadResult.codeId;
      const input = initInput;

      // instantiate contract with input
      const instantiateResult = await client.instantiate(
        firstAccount.address,
        codeId,
        input,
        label ? label : "smart contract",
        instantiateOptions
      );
      console.log("instantiate result: ", instantiateResult);
      return instantiateResult.contractAddress;
    } catch (error) {
      console.log("error in handle deploy CosmJs: ", error);
      throw error;
    }
  }

  async handleUpload(args: {
    mnemonic: string;
    wasmBody: string;
    source?: string | undefined;
    builder?: string | undefined;
    gasAmount: { amount: string; denom: string };
    gasLimits?: { upload: 20000000 };
  }) {
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
      const gasPrice = GasPrice.fromString(
        `${gasAmount.amount}${gasAmount.denom}`
      );
      const client = await cosmwasm.SigningCosmWasmClient.connectWithSigner(
        current.rpc,
        wallet,
        {
          gasPrice: gasPrice,
          prefix: current.bech32Config.bech32PrefixAccAddr,
          gasLimits,
        }
      );

      // upload wasm contract to get code id
      const uploadResult = await client.upload(firstAccount.address, wasmCode, {
        source,
        builder,
      });
      console.log("upload result: ", uploadResult);

      const codeId = uploadResult.codeId;

      return codeId;
    } catch (error) {
      console.log("error in handle upload CosmJs: ", error);
      throw error;
    }
  }

  async handleInstantiate(args: {
    mnemonic: string;
    initInput: any;
    label?: string | undefined;
    gasAmount: { amount: string; denom: string };
    instantiateOptions?: InstantiateOptions;
    gasLimits?: { init: 15000000 };
    codeId: number;
  }) {
    const {
      mnemonic,
      initInput,
      label,
      gasAmount,
      instantiateOptions,
      gasLimits,
      codeId,
    } = args;
    const { current } = window.chainStore;
    // if keplr, we will try to suggest chain & enable it
    if (await window.Keplr.getKeplr()) await window.Keplr.suggestChain();
    // convert wasm body from base64 to bytes array
    try {
      const wallet = await this.collectWallet(mnemonic);
      const [firstAccount] = await wallet.getAccounts();
      console.log("first account: ", firstAccount);
      const gasPrice = GasPrice.fromString(
        `${gasAmount.amount}${gasAmount.denom}`
      );
      const client = await cosmwasm.SigningCosmWasmClient.connectWithSigner(
        current.rpc,
        wallet,
        {
          gasPrice: gasPrice,
          prefix: current.bech32Config.bech32PrefixAccAddr,
          gasLimits,
        }
      );

      const input = initInput;

      // instantiate contract with input
      const instantiateResult = await client.instantiate(
        firstAccount.address,
        codeId,
        input,
        label ? label : "smart contract",
        instantiateOptions
      );
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
   getHandleMessage = (contract, msg, sender, amount) => {
    const sent_funds = null;
    const message = Cosmos.message;
    const msgSend = new message.cosmwasm.wasm.v1beta1.MsgExecuteContract({
      contract,
      msg,
      sender,
      sent_funds
    });
  
    const msgSendAny = new message.google.protobuf.Any({
      type_url: '/cosmwasm.wasm.v1beta1.MsgExecuteContract',
      value: message.cosmwasm.wasm.v1beta1.MsgExecuteContract.encode(msgSend).finish()
    });
  
    return msgSendAny
  };

  async execute(args: {
    mnemonic?: string;
    address: string;
    handleMsg: string;
    handleOptions?: HandleOptions;
    gasAmount?: { amount: string; denom: string };
    gasLimits?: { exec: 200000 };
  }) {
    try {
      const {
        mnemonic,
        address,
        handleMsg,
        handleOptions,
        gasAmount,
        gasLimits,
      } = args;
      const { current } = window.chainStore;
      // if keplr, we will try to suggest chain & enable it
      if (await window.Keplr.getKeplr()) await window.Keplr.suggestChain();
      const wallet = await this.collectWallet(mnemonic);
      const [firstAccount] = await wallet.getAccounts();

      const cosmos = new Cosmos(
        "https://testnet-lcd.orai.io",
        "Oraichain-testnet"
      );

      cosmos.setBech32MainPrefix("orai");
      const message = Cosmos.message;
      const msg = this.getHandleMessage(address, Buffer.from(handleMsg), firstAccount.address, 0);
      console.log({ msg});
      
      const result = await cosmos.submitExtension(
        wallet,
        firstAccount.address,
        firstAccount.pubkey,
        {
          messages: [msg],
          gas: gasAmount?.amount,
          fees: 500,
          memo: handleOptions?.memo,
          mode: "BROADCAST_MODE_SYNC",
        }
      );

      //'BROADCAST_MODE_UNSPECIFIED' | 'BROADCAST_MODE_BLOCK' | 'BROADCAST_MODE_SYNC' | 'BROADCAST_MODE_ASYNC';

      // const client = await cosmwasm.SigningCosmWasmClient.connectWithSigner(current.rpc, wallet, { gasPrice: gasAmount ? GasPrice.fromString(`${gasAmount.amount}${gasAmount.denom}`) : undefined, prefix: current.bech32Config.bech32PrefixAccAddr, gasLimits });
      // const input = JSON.parse(handleMsg);
      // const result = await client.execute(firstAccount.address, address, input, handleOptions?.memo, handleOptions?.funds);
      // return result.transactionHash;
    } catch (error) {
      console.log("error in executing contract: ", error);
      throw error;
    }
  }
}

export default CosmJs;
