// hot reload
import { useEffect, useState } from "react";
import logo from "./logo.png";
// import Form from "@rjsf/core";
import Form from '@rjsf/antd';
import './themes/style.scss';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import _ from "lodash";
import { CustomForm, CustomInput, CustomNetwork, CustomSelect, GasForm } from "./components";
import ReactJson from 'react-json-view';
import CosmJsFactory from "./lib/cosmjs-factory";
import instantiateOptionsSchema from "./types/schema/instantiate-options";
import { AdvancedInteraction } from "./pages";
import { processSchema } from "./lib/utils";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#7954FF" }} spin />
);

const App = () => {
  const [initSchemaData, setInitSchemaData] = useState(undefined);
  const [mnemonic, setMnemonic] = useState('');
  const [isBuilt, setIsBuilt] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [wasmBody, setWasmBody] = useState();
  const [label, setLabel] = useState('');
  const [gasData, setGasData] = useState({ gasPrice: window.chainStore.current.gasPriceStep?.average ? window.chainStore.current.gasPriceStep.average.toString() : "0", gasDenom: window.chainStore.current.feeCurrencies[0].coinMinimalDenom, gasLimit: "" });
  const [contractAddr, setContractAddr] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [initSchema, setInitSchema] = useState(undefined);
  const [querySchema, setQuerySchema] = useState({});
  const [handleSchema, setHandleSchema] = useState({});
  const [resultJson, setResultJson] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInteractionLoading, setIsInteractionLoading] = useState(false);
  const [deploySource, setDeploySource] = useState('');
  const [deployBuilder, setDeployBuilder] = useState('');
  const [instantiateOptions, setOptions] = useState(undefined);
  const [interactOption, setInteractOption] = useState("query");
  const [codeId, setCodeId] = useState(undefined);
  const [ideAction, setIdeAction] = useState('');

  // Handle messages sent from the extension to the webview
  const eventHandler = (event: MessageEvent) => {
    const message = event.data; // The json data that the extension sent
    if (message.payload) setWasmBody(message.payload);
    if (message.mnemonic) {
      setMnemonic(message.mnemonic);
    }
    // if message payload is build => post message back to extension to collect schema file
    if (message.action === "build") {
      setInitSchema(processSchema(JSON.parse(message.schemaFile)));
      setHandleSchema({});
      setQuerySchema({});
      setIsBuilt(true);
      setIsUploaded(false);
      setIsDeployed(false);
      setCodeId(undefined);
      setContractAddr("");
      setErrorMessage("");
    }
    else if (message.action === "deploy") {
      // console.log("query file: ", message.queryFile);
      setHandleSchema(processSchema(JSON.parse(message.handleFile)));
      setQuerySchema(processSchema(JSON.parse(message.queryFile)));
      onDeploy(message.mnemonic, message.payload);
    }
    else if (message.action === "upload") {
      console.log("message upload: ", message);
      setInitSchema(processSchema(JSON.parse(message.schemaFile)));
      onUpload(message.mnemonic, message.payload);
    }
    else if (message.action === "instantiate") {
      console.log("message instantiate: ", message);
      setHandleSchema(processSchema(JSON.parse(message.handleFile)));
      setQuerySchema(processSchema(JSON.parse(message.queryFile)));
      onInstantiate(message.mnemonic);
    }
  };
  useEffect(() => {
    window.addEventListener("message", eventHandler);
    return () => {
      window.removeEventListener("message", eventHandler);
    };
  });

  const updateChain = (value) => {
    console.log("current chain store: ", window.chainStore.current);
    setGasData({ ...gasData, gasPrice: window.chainStore.current.gasPriceStep?.average ? window.chainStore.current.gasPriceStep.average.toString() : "0", gasDenom: window.chainStore.current.feeCurrencies[0].coinMinimalDenom })
  }

  const handleOnChange = _.throttle(({ formData }) => {
    setInitSchemaData(formData);
  }, 2000, { 'trailing': true })

  const handleOnInstantiateOptChange = _.throttle(({ formData }) => {
    setOptions(formData);
  }, 2000, { 'trailing': true })

  const actionHandling = (action) => {
    resetMessage();
    setIsLoading(true);
    setIdeAction(action);
  }

  const errorActionHandling = (error) => {
    setIsBuilt(true);
    setErrorMessage(String(error));
  }

  const onUpload = async (mnemonic: any, wasmBytes: any) => {
    console.log("wasm bytes: ", wasmBytes)
    if (!wasmBytes) {
      setErrorMessage("Wasm bytes is empty!");
      return;
    }
    actionHandling("Uploading");

    try {
      let cosmJs = new CosmJsFactory(window.chainStore.current);
      // let address = await Wasm.handleDeploy({ mnemonic, wasmBody: wasmBytes ? wasmBytes : wasmBody, initInput, label, sourceCode: '' });
      let codeId = await cosmJs.current.handleUpload({ mnemonic, wasmBody: wasmBytes, source: deploySource, builder: deployBuilder ? deployBuilder : undefined, gasAmount: { amount: gasData.gasPrice, denom: gasData.gasDenom } });
      setCodeId(codeId);
      setIsUploaded(true);
      setIsBuilt(true);
      setIsDeployed(false);
      setContractAddr("");

      // clear all uploading data
      setDeploySource("");
      setDeployBuilder("");
    } catch (error) {
      errorActionHandling(String(error));
    }
    setIsLoading(false);
  };

  const onInstantiate = async (mnemonic: any) => {
    console.log("Instantiate data: ", initSchemaData);
    if (!initSchemaData) {
      setErrorMessage("Instantiate data is empty!");
      return;
    };
    if (!codeId) {
      setErrorMessage("Code id is empty!");
      return;
    };
    actionHandling("Instantiating");

    try {
      let cosmJs = new CosmJsFactory(window.chainStore.current);
      // let address = await Wasm.handleDeploy({ mnemonic, wasmBody: wasmBytes ? wasmBytes : wasmBody, initInput, label, sourceCode: '' });
      let address = await cosmJs.current.handleInstantiate({ mnemonic, codeId: parseInt(codeId), initInput: initSchemaData, label, gasAmount: { amount: gasData.gasPrice, denom: gasData.gasDenom }, instantiateOptions });
      console.log("contract address: ", address);
      setContractAddr(address);
      setIsDeployed(true);
      setIsBuilt(false);
      setIsUploaded(false);
      setCodeId(undefined);

      // clear all instantiate data
      setInitSchemaData(undefined);
      setInitSchema(undefined);
      setCodeId(undefined);
      setOptions(undefined);
    } catch (error) {
      errorActionHandling(String(error));
    }
    setIsLoading(false);
  };

  const onDeploy = async (mnemonic: any, wasmBytes?: any) => {
    console.log("Instantiate data: ", initSchemaData);
    if (!initSchemaData) {
      setErrorMessage("Instantiate data is empty!");
      return;
    };
    actionHandling("Deploying");

    try {
      let cosmJs = new CosmJsFactory(window.chainStore.current);
      // let address = await Wasm.handleDeploy({ mnemonic, wasmBody: wasmBytes ? wasmBytes : wasmBody, initInput, label, sourceCode: '' });
      let address = await cosmJs.current.handleDeploy({ mnemonic, wasmBody: wasmBytes ? wasmBytes : wasmBody, source: deploySource, builder: deployBuilder ? deployBuilder : undefined, initInput: initSchemaData, label, gasAmount: { amount: gasData.gasPrice, denom: gasData.gasDenom }, instantiateOptions });
      console.log("contract address: ", address);
      setContractAddr(address);
      setIsDeployed(true);
      setIsBuilt(false);
      setIsUploaded(false);
      setCodeId(undefined);

      // clear all deploy data
      setInitSchema(undefined);
      setInitSchemaData(undefined);
      setCodeId(undefined);
      setOptions(undefined);
      setDeploySource("");
      setDeployBuilder("");

    } catch (error) {
      errorActionHandling(String(error));
    }
    setIsLoading(false);
  };

  const onQuery = async (data) => {
    console.log("data: ", data)
    resetMessage();
    setIsInteractionLoading(true);
    let cosmJs = new CosmJsFactory(window.chainStore.current);
    try {
      const queryResult = await cosmJs.current.query(contractAddr, JSON.stringify(data));
      console.log("query result: ", queryResult);
      setResultJson({ data: queryResult });
    } catch (error) {
      setErrorMessage(String(error));
    }
    setIsInteractionLoading(false);
  }

  const onHandle = async (data) => {
    console.log("data: ", data)
    resetMessage();
    setIsInteractionLoading(true);
    let cosmJs = new CosmJsFactory(window.chainStore.current);
    try {
      const queryResult = await cosmJs.current.execute({ mnemonic, address: contractAddr, handleMsg: JSON.stringify(data), gasAmount: { amount: gasData.gasPrice, denom: gasData.gasDenom } });
      console.log("query result: ", queryResult);
      setResultJson({ data: queryResult });
    } catch (error) {
      setErrorMessage(String(error));
    }
    setIsInteractionLoading(false);
  }

  const resetMessage = () => {
    setErrorMessage("");
    setResultJson({});
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1 className="app-title">COSMWASM IDE</h1>
      </header>
      <div className="app-divider" />
      {
        isBuilt && (
          <div>
            <div className="app-body">
              <CustomNetwork updateChain={updateChain} />
              <div className="wrap-form">
                <span className="please-text">Please fill out the form below to deploy the contract:</span>
                <CustomInput inputHeader="input label" input={label} setInput={setLabel} />
                <GasForm gasData={gasData} setGasData={setGasData} />
                <CustomInput inputHeader="Code Id" input={codeId} setInput={setCodeId} />
                {!isUploaded && (
                  <div>
                    <CustomInput inputHeader="Source code url" input={deploySource} setInput={setDeploySource} placeholder="eg. https://foobar.com" />
                    <CustomInput inputHeader="Contract builder (Docker img with tag)" input={deployBuilder} setInput={setDeployBuilder} placeholder="eg. orai/orai:0.40.1" />
                  </div>
                )}
                <div className="input-form">
                  <Form
                    schema={instantiateOptionsSchema}
                    formData={instantiateOptions}
                    onChange={handleOnInstantiateOptChange}
                    // onSubmit={(data) => setInitSchemaData(data.formData)}
                    children={true}
                  />
                </div>
              </div>
            </div>
            <Form
              schema={initSchema}
              formData={initSchemaData}
              onChange={handleOnChange}
              onSubmit={(data) => setInitSchemaData(data.formData)}
              children={true}
            />
          </div>
        )
      }
      {!isLoading ? (
        (contractAddr && (
          <div className="contract-address">
            <span>Contract address </span>
            <p>{contractAddr}</p>
          </div>
        )) ||
        (errorMessage && (
          <div className="contract-address">
            <span style={{ color: "red" }}>Error message </span>
            <p>{errorMessage}</p>
          </div>
        ))
      ) : (
        <div className="deploying">
          <Spin indicator={antIcon} />
          <span>{ideAction} ...</span>
        </div>
      )}
      {isDeployed && (
        <div className="app-body">
          <CustomSelect setInteractOption={setInteractOption} />
          <div className="app-divider" />
          {interactOption === "execute" &&
            <div>
              <div className="contract-address">
                <span>Contract Execute </span>
              </div>
              <GasForm gasData={gasData} setGasData={setGasData} />
              <CustomForm schema={handleSchema} onSubmit={(data) => onHandle(data)} />
            </div>
          }
          {
            interactOption === "query" &&
            <div>
              <div className="contract-address">
                <span>Contract Query </span>
              </div>
              <CustomForm schema={querySchema} onSubmit={(data) => onQuery(data)} />
            </div>
          }
          <div className="app-divider" />

          {!isInteractionLoading ?
            (errorMessage && (
              <div className="contract-address">
                <span style={{ color: "red" }}>Error message </span>
                <p>{errorMessage}</p>
              </div>
            )
            ) : (
              <div className="deploying">
                <Spin indicator={antIcon} />
                <span>Invoking ...</span>
              </div>
            )
          }
          {!_.isEmpty(resultJson) && (
            <div style={{ marginTop: '10px' }}>
              <ReactJson collapseStringsAfterLength={20} name={false} displayObjectSize={false} src={resultJson} theme={"ocean"} />
            </div>
          )}
        </div>
      )}
      {!isBuilt && !isDeployed && !isLoading && !isUploaded && !errorMessage && (
        <AdvancedInteraction updateChain={updateChain} gasData={gasData}>
          <GasForm gasData={gasData} setGasData={setGasData} />
        </AdvancedInteraction>
      )}
    </div>
  );
};

export default App;
