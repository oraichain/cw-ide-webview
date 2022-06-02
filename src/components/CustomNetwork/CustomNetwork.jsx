import "antd/dist/antd.css";
import _ from "lodash";
import { Button, Input, Select, Spin } from "antd";
import { ReactComponent as IconSelect } from "../../assets/icons/code.svg";
import { ReactComponent as IconChain } from "../../assets/icons/chain.svg";
import { useEffect, useState } from "react";
import { MyDropZone } from "..";

// import { evmosToEth } from '@tharsis/address-converter'
import { generateEndpointBroadcast, generatePostBodyBroadcast } from '@tharsis/provider'
import { createMessageSend, createTxRawEIP712, signatureToWeb3Extension, createMessageConvertCoin } from '@tharsis/transactions'
import { createTxRaw } from '@tharsis/proto';
import {
  GasPrice,
  SigningStargateClient,
  StargateClient,
} from "@cosmjs/stargate";

const { Option } = Select;

const CustomNetwork = ({ updateChain }) => {
  const [defaultChainName, setDefaultChainName] = useState(window.chainStore.current.chainName);
  const [chainInfos, setChainInfos] = useState(window.chainStore.chainInfos);
  const [jsonFile, setJsonFile] = useState({});
  const [jsonFileName, setJsonFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const handleJsonFile = (file) => {
    setJsonFile(file.content);
    setJsonFileName(file.fileName);
    setUpdateMessage("");
  };

  const handleTestKeplr = async () => {

    window.chainStore.setChain(window.chainStore.current.chainName)

    await window.Keplr.suggestChain();


    const keplr = await window.Keplr.getKeplr();
    const wallet = keplr.getOfflineSigner(window.chainStore.current.chainId);

    const accounts = await wallet.getAccounts();

    console.log("wallet get accounts: ", accounts)

    const chain = {
      chainId: 6666,
      cosmosChainId: window.chainStore.current.chainId,
    }

    const accAddress = accounts[0].address;

    let accountInfo = await fetch(
      `${window.chainStore.current.rest}/cosmos/auth/v1beta1/accounts/${accAddress}`,
      { method: 'GET' }
    ).then(data => data.json());

    console.log("account info: ", accountInfo)
    console.log("pubkey: ", Buffer.from(accounts[0].pubkey).toString('base64'))

    const sender = {
      accountAddress: accAddress,
      sequence: parseInt(accountInfo.account.base_account.sequence),
      accountNumber: parseInt(accountInfo.account.base_account.account_number),
      pubkey: Buffer.from(accounts[0].pubkey).toString('base64'),
    }
    const fee = {
      amount: '0',
      denom: 'oraie',
      gas: '2000000',
    }

    const memo = 'foobar'

    const params = {
      destinationAddress: '0x3C5C6b570C1DA469E8B24A2E8Ed33c278bDA3222',
      amount: '1',
      denom: 'ibc/E8734BEF4ECF225B71825BC74DE30DCFF3644EAC9778FFD4EF9F94369B6C8377',
    }

    const msg = createMessageConvertCoin(chain, sender, fee, memo, params)

    const bodyBytes = msg.signDirect.body.serialize();
    const authInfoBytes = msg.signDirect.authInfo.serialize();

    const result = await wallet.signDirect(accounts[0].address, { bodyBytes, authInfoBytes, chainId: chain.cosmosChainId, accountNumber: sender.accountNumber });
    console.log("result signing: ", result);
    const signature = Buffer.from(result.signature.signature, "base64");
    const txRaw = createTxRaw(result.signed.bodyBytes, result.signed.authInfoBytes, [signature]).message.serialize();

    const client = await StargateClient.connect(window.chainStore.current.rpc);

    // const client = await SigningStargateClient.connectWithSigner('http://localhost:26657', wallet, { prefix: 'evmos', gasPrice: GasPrice.fromString("0aphoton") });
    const txResult = await client.broadcastTx(txRaw);
    // const txResult = await client.sendTokens(accounts[0].address, accounts[0].address, [{ amount: "1", denom: "ibc/E8734BEF4ECF225B71825BC74DE30DCFF3644EAC9778FFD4EF9F94369B6C8377" }], 'auto');
    console.log("tx result: ", txResult)
  }

  const handleTestEvmOs = async () => {

    const chain = {
      chainId: 6886,
      cosmosChainId: 'kawaii_6886-1',
    }

    const accAddress = 'oraie1sa2qx2k8je4fp83ww5es3h6khvyd40tfq0hf8j';

    let accountInfo = await fetch(
      `${window.chainStore.current.rest}/cosmos/auth/v1beta1/accounts/${accAddress}`,
      { method: 'GET' }
    ).then(data => data.json());

    console.log("account info: ", accountInfo)

    const sender = {
      accountAddress: accAddress,
      sequence: parseInt(accountInfo.account.base_account.sequence),
      accountNumber: parseInt(accountInfo.account.base_account.account_number),
      pubkey: accountInfo.account.base_account.pub_key.key,
    }

    const fee = {
      amount: '0',
      denom: 'oraie',
      gas: '2000000',
    }

    const memo = 'foobar'

    const params = {
      destinationAddress: '0x3C5C6b570C1DA469E8B24A2E8Ed33c278bDA3222',
      amount: '1',
      denom: 'ibc/E8734BEF4ECF225B71825BC74DE30DCFF3644EAC9778FFD4EF9F94369B6C8377',
    }

    const msg = createMessageConvertCoin(chain, sender, fee, memo, params)

    console.log("msg: ", JSON.stringify(msg.eipToSign))

    // Request the signature
    let signature = await window.ethereum.request({
      method: 'eth_signTypedData_v4',
      params: ['0x3C5C6b570C1DA469E8B24A2E8Ed33c278bDA3222', JSON.stringify(msg.eipToSign)],
    });

    // The chain and sender objects are the same as the previous example
    let extension = signatureToWeb3Extension(chain, sender, signature)

    console.log("extension: ", extension);

    // Create the txRaw
    let rawTx = createTxRawEIP712(msg.legacyAmino.body, msg.legacyAmino.authInfo, extension)

    // Broadcast it
    const postOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: generatePostBodyBroadcast(rawTx, 'BROADCAST_MODE_BLOCK'),
    };

    let broadcastPost = await fetch(
      `${window.chainStore.current.rest}${generateEndpointBroadcast()}`,
      postOptions
    );
    let response = await broadcastPost.json();
    console.log("response: ", response);
  }

  const onAddChain = async () => {
    try {

      await window.ethereum.enable();
      // console.log("window ethereum: ", window.ethereum);
      await handleTestEvmOs();

      // setErrorMessage("");
      // console.log("json file: ", jsonFile);
      // if (jsonFile.chainId) {
      //   window.chainStore.addChain(jsonFile);
      //   // set chain to auto trigger new chain store
      //   setChainInfos(window.chainStore.chainInfos);
      //   setUpdateMessage("Successfully added the new chain");
      // } else throw "Invalid chain data";
    } catch (error) {
      setErrorMessage(String(error));
      setUpdateMessage("");
    }
  };

  const onRemoveChain = () => {
    try {
      setErrorMessage("");
      if (jsonFile.chainId) {
        // check if current chain id is the removed one. if yes => reset current chain id to the first chain id in list
        const currentChainId = window.chainStore.current.chainId;
        if (currentChainId === jsonFile.chainId) {
          let chainName = window.chainStore.chainInfos[0].chainName;
          window.chainStore.setChain(chainName);
          updateChain(chainName);
          window.location.reload();
        }
        window.chainStore.removeChain(jsonFile.chainId);
        // set chain to auto trigger new chain store
        setChainInfos(window.chainStore.chainInfos);
        window.chainStore.setChain(window.chainStore.current.chainName);
        setUpdateMessage("Successfully removed the provided chain");
      } else throw "invalid chain data";
    } catch (error) {
      setErrorMessage(String(error));
      setUpdateMessage("");
    }
  };

  return (
    <div className="chain-select">
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconChain
          style={{
            width: "16px",
            height: "16px",
            marginRight: "5px",
            marginBottom: "8px",
          }}
        />
        <h3> Select chain name</h3>
      </div>
      <Select
        defaultValue={defaultChainName}
        style={{ width: 240 }}
        suffixIcon={<IconSelect />}
        onSelect={(value) => {
          console.log("on select change chain data")
          window.chainStore.setChain(value);
          updateChain(value);
          // setChainName(value);
          // setGasPrice(window.chainStore.current.gasPriceStep?.average ? window.chainStore.current.gasPriceStep.average.toString() : "0");
          // setGasDenom(window.chainStore.current.feeCurrencies[0].coinMinimalDenom);
        }}
      >
        {chainInfos.map((info) => (
          <Option key={info.chainName} value={info.chainName}>
            {info.chainName}
          </Option>
        ))}
      </Select>
      <div className="chain-management">
        <div className="update-chain">
          <Button onClick={onAddChain} className="primary-button">
            Add new chain
          </Button>
          <Button onClick={onRemoveChain} className="remove-button">
            Remove chain
          </Button>
        </div>
        {_.isEmpty(jsonFile) && (
          <div
            style={{
              display: "flex",
              cursor: "pointer",
              fontFamily: "Courier",
            }}
          >
            <MyDropZone
              setSchema={null}
              setJson={handleJsonFile}
              dropZoneText={
                "Drop the chain info json file here to add / remove chain"
              }
            />
          </div>
        )}
        {jsonFileName && (
          <div>
            <div
              style={{
                display: "flex",
                color: "#c4c6c9",
                fontFamily: "Courier",
                paddingBottom: "8px",
              }}
            >
              {`file name: ${jsonFileName}`}
            </div>
            <Button
              onClick={() => {
                setJsonFile({});
                setJsonFileName("");
                setUpdateMessage("");
                setErrorMessage("");
              }}
              className="remove-secondary"
            >
              Remove json chain
            </Button>
          </div>
        )}
        {errorMessage && (
          <div className="contract-address">
            <span style={{ color: "red" }}>Error message </span>
            <p>{errorMessage}</p>
          </div>
        )}
        {updateMessage && (
          <div className="contract-address">
            <p>{updateMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomNetwork;
