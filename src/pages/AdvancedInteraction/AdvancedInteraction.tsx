import { useEffect, useRef, useState } from "react";
// import Form from "@rjsf/core";
import "../../themes/style.scss";
import { Button, Spin } from "antd";
import Form from "@rjsf/antd";
import { LoadingOutlined } from "@ant-design/icons";
import _, { isNil } from "lodash";
import ReactJson from "react-json-view";
import CosmJsFactory from "src/lib/cosmjs-factory";
import {
  CustomForm,
  CustomInput,
  GasForm,
  MyDropZone,
  HandleOptions,
  CustomSelect,
  CustomNetwork,
} from "src/components";
import { actionType, parseGasLimits, processSchema } from "src/lib/utils";
import "./AdvancedInteraction.css";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#7954FF" }} spin />
);

const AdvancedInteraction = ({ children, updateChain, gasData, mnemonic }) => {
  const [interactOption, setInteractOption] = useState("query");
  const [contractAddr, setContractAddr] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resultJson, setResultJson] = useState({});
  const [isInteractionLoading, setIsInteractionLoading] = useState(false);
  const [resultTxHash, setResultTxHash] = useState(null);
  const [queryMessage, setQueryMessage] = useState("");
  const [executeMessage, setExecuteMessage] = useState("");
  const [migrateMessage, setMigrateMessage] = useState("");
  const [schema, setSchema] = useState({});
  const [codeId, setCodeId] = useState("");
  const [migrateContractAddr, setMigrateContractAddr] = useState("");
  const handleOptionsRef = useRef(null);

  const onQuery = async (data) => {
    setErrorMessage("");
    setResultTxHash(null);
    setIsInteractionLoading(true);
    let cosmJs = new CosmJsFactory(window.chainStore.current);
    try {
      let finalMessage = queryMessage;
      if (data) finalMessage = JSON.stringify(data);
      const queryResult = await cosmJs.current.query(
        contractAddr,
        finalMessage
      );
      console.log("query result: ", queryResult);
      setResultJson({ data: queryResult });
    } catch (error) {
      setErrorMessage(String(error));
    }
    setIsInteractionLoading(false);
  };

  const onHandle = async (data) => {
    setErrorMessage("");
    setResultTxHash(null);
    setIsInteractionLoading(true);
    let cosmJs = new CosmJsFactory(window.chainStore.current);
    try {
      console.log("data: ", executeMessage);
      console.log("data: ", data);
      let finalMessage = executeMessage;
      if (data) finalMessage = JSON.stringify(data);
      const queryResult = await cosmJs.current.execute({
        mnemonic,
        address: contractAddr,
        handleMsg: finalMessage,
        gasAmount: { amount: gasData.gasPrice, denom: gasData.gasDenom },
        gasLimits: parseGasLimits(gasData.gasLimits),
        handleOptions: handleOptionsRef.current,
      });
      console.log("query result: ", queryResult);
      setResultJson({ data: queryResult });
    } catch (error) {
      setErrorMessage(String(error));
    }
    setIsInteractionLoading(false);
  };

  const onMigrate = async (schemaUploaded) => {
    setErrorMessage("");
    setResultTxHash(null);
    setIsInteractionLoading(true);
    let cosmJs = new CosmJsFactory(window.chainStore.current);

    console.log(migrateMessage, 'MIGRATE')
    try {
      let finalMessage =
        isNil(migrateMessage) || migrateMessage === "" ? {} : migrateMessage;
      if (schemaUploaded) finalMessage = JSON.stringify(schemaUploaded);
      const migrateResult = await cosmJs.current.migrate({
        mnemonic,
        address: migrateContractAddr,
        codeId: !_.isNil(codeId) && parseInt(codeId),
        handleMsg: JSON.stringify(finalMessage),
        gasAmount: { amount: gasData.gasPrice, denom: gasData.gasDenom },
        gasLimits: parseGasLimits(gasData.gasLimits),
        // handleOptions: handleOptionsRef.current,
      });
      console.log("Migrate result: ", migrateResult);
      setResultJson({ data: migrateResult });
      setResultTxHash(migrateResult);
    } catch (error) {
      setErrorMessage(String(error));
    }
    setIsInteractionLoading(false);
  };

  return (
    <div className="app-body">
      {/* <div className="intro">
        Start the Wasm smart contract development journey with CosmWasm IDE by
        building your first contract! Choose a smart contract file and click the
        button 'Build CosmWasm' to build your contract. You can also interact
        with an existing smart contract.
      </div> */}
      <CustomNetwork updateChain={updateChain} />

      <CustomSelect
        displayMigrateOption={true}
        setInteractOption={setInteractOption}
      />
      <div className="wrap-form">
        <CustomInput
          inputHeader="Contract address"
          input={contractAddr}
          setInput={setContractAddr}
          placeholder="eg. orai1ars73g86y4kzajsgam5ee38npgmkq54dlzuz6w"
        />
      </div>

      {interactOption === "execute" && (
        <div>
          <div className="contract-address">
            <span>Contract Execute </span>
          </div>
          <div className="wrap-form">
            {children}
            <HandleOptions handleOptionsRef={handleOptionsRef} />
            <div style={{ marginBottom: "10px" }}>
              <CustomInput
                inputHeader="Execute message"
                input={executeMessage}
                setInput={setExecuteMessage}
                placeholder="eg. {}"
              />
              <Button
                onClick={() => {
                  onHandle(null);
                }}
                className="primary-button"
              >
                Execute
              </Button>
            </div>
          </div>
        </div>
      )}
      {interactOption === "query" && (
        <div>
          <div className="contract-address">
            <span>Contract Query </span>
          </div>
          <div className="wrap-form">
            <div style={{ marginBottom: "24px" }}>
              <CustomInput
                inputHeader="Query message"
                input={queryMessage}
                setInput={setQueryMessage}
                placeholder="eg. {}"
              />
              <Button
                onClick={() => onQuery(null)}
                className="primary-button"
              >
                Query
              </Button>
            </div>
          </div>
        </div>
      )}
      {interactOption === "migrate" && (
        <div>
          <div className="contract-address">
            <span>Contract Migrate </span>
          </div>
          <div className="wrap-form">
            <CustomInput
              inputHeader="Code Id"
              input={codeId}
              setInput={setCodeId}
            />
            {children}

            <div style={{ marginBottom: "24px", marginTop: 14 }}>
              <CustomInput
                inputHeader="Migrate message"
                input={migrateMessage}
                setInput={setMigrateMessage}
                placeholder="eg. {}"
              />
              <Button
                onClick={() => {
                  onMigrate(null);
                }}
                className="primary-button"
              >
                Migrate
              </Button>
            </div>
          </div>
        </div>
      )}
      {
        _.isEmpty(schema) && (
          <div style={{ cursor: "pointer", fontFamily: "Courier" }}>
            <MyDropZone
              setSchema={setSchema}
              setJson={null}
              dropZoneText={"Upload the schema file"}
            />
          </div>
        )
      }
      {!_.isEmpty(schema) && (
        <div style={{ marginBottom: "10px", marginTop: 14 }}>
          {interactOption == "execute" && (
            <CustomForm
              schema={processSchema((schema as any).execute)}
              onSubmit={(data: any) => onHandle(data)}
            />
          )}
          {interactOption == "query" && (
            <CustomForm
              schema={processSchema((schema as any).query)}
              onSubmit={(data: any) => onQuery(data)}
            />
          )}
          {interactOption == "migrate" && (
            <CustomForm
              schema={processSchema((schema as any).migrate)}
              onSubmit={(data: any) => onMigrate(data)}
            />
          )}
          <Button
            onClick={() => {
              setSchema({});
            }}
            className="remove-button"
          >
            Remove schema form
          </Button>
        </div>
      )}
      <div className="app-divider" />

      {!isInteractionLoading ? (
        <>
          {errorMessage && (
            <div className="contract-address">
              <span style={{ color: "red" }}>Error message </span>
              <p>{errorMessage}</p>
            </div>
          )}
          {resultTxHash && (
            <div className="contract-address">
              <span style={{ color: "white" }}>Result Tx hash: </span>
              <p>{resultTxHash}</p>
            </div>
          )}
        </>
      ) : (
        <div className="deploying">
          <Spin indicator={antIcon} />
          <span>Invoking ...</span>
        </div>
      )}
      {!_.isEmpty(resultJson) && (
        <div style={{ marginTop: "10px" }}>
          <ReactJson
            collapseStringsAfterLength={20}
            name={false}
            displayObjectSize={false}
            src={resultJson}
            theme={"ocean"}
          />
        </div>
      )}
    </div>
  );
};

export default AdvancedInteraction;
