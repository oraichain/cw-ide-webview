import { useCallback, useEffect, useRef, useState } from "react";
// import Form from "@rjsf/core";
import '../../themes/style.scss';
import { Button, Input, Select, Spin } from 'antd';
import { ReactComponent as IconSelect } from '../../assets/icons/code.svg';
import { ReactComponent as IconChain } from '../../assets/icons/chain.svg';
import { LoadingOutlined } from '@ant-design/icons';
import _ from "lodash";
import ReactJson from 'react-json-view';
import CosmJsFactory from "src/lib/cosmjs-factory";
import { CustomForm, CustomInput, GasForm, MyDropZone, HandleOptions, CustomSelect, CustomNetwork } from "src/components";

const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#7954FF" }} spin />
);

const { Option } = Select;

const AdvancedInteraction = () => {
    const DEFAULT_CHAINMAME = window.chainStore.chainInfos[0].chainName;
    const [mnemonic, setMnemonic] = useState('');
    const [gasPrice, setGasPrice] = useState(window.chainStore.current.gasPriceStep?.average ? window.chainStore.current.gasPriceStep.average.toString() : "0");
    const [gasDenom, setGasDenom] = useState(window.chainStore.chainInfos[0].feeCurrencies[0].coinMinimalDenom);
    const [gasLimit, setGasLimit] = useState(undefined);
    const [chainName, setChainName] = useState(DEFAULT_CHAINMAME);
    const [interactOption, setInteractOption] = useState("query");
    const [contractAddr, setContractAddr] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [resultJson, setResultJson] = useState({});
    const [isInteractionLoading, setIsInteractionLoading] = useState(false);
    const [queryMessage, setQueryMessage] = useState("");
    const [executeMessage, setExecuteMessage] = useState("");
    const [querySchema, setQuerySchema] = useState({});
    const [handleSchema, setHandleSchema] = useState({});
    const handleOptionsRef = useRef(null);

    const updateChain = (value) => {
        setChainName(value);
        setGasPrice(window.chainStore.current.gasPriceStep?.average ? window.chainStore.current.gasPriceStep.average.toString() : "0");
        setGasDenom(window.chainStore.current.feeCurrencies[0].coinMinimalDenom);
    }

    const onQuery = async (data) => {
        setErrorMessage("");
        window.chainStore.setChain(chainName);
        setIsInteractionLoading(true);
        let cosmJs = new CosmJsFactory(window.chainStore.current);
        try {
            let finalMessage = queryMessage;
            if (data) finalMessage = JSON.stringify(data);
            const queryResult = await cosmJs.current.query(contractAddr, finalMessage);
            console.log("query result: ", queryResult);
            setResultJson({ data: queryResult });
        } catch (error) {
            setErrorMessage(String(error));
        }
        setIsInteractionLoading(false);
    }

    const onHandle = async (data) => {
        setErrorMessage("");
        window.chainStore.setChain(chainName);
        setIsInteractionLoading(true);
        let cosmJs = new CosmJsFactory(window.chainStore.current);
        try {
            let finalMessage = executeMessage;
            if (data) finalMessage = JSON.stringify(data);
            const queryResult = await cosmJs.current.execute({
                mnemonic, address: contractAddr, handleMsg: finalMessage, gasAmount: { amount: gasPrice, denom: gasDenom }, gasLimits: {
                    exec: gasLimit ? parseInt(gasLimit) : undefined
                }, handleOptions: handleOptionsRef.current,
            });
            console.log("query result: ", queryResult);
            setResultJson({ data: queryResult });
        } catch (error) {
            setErrorMessage(String(error));
        }
        setIsInteractionLoading(false);
    }

    return (
        <div className="app-body">
            <div className="intro">
                Start the Wasm smart contract development journey with CosmWasm IDE by building your first contract! Choose a smart contract file and click the button 'Build CosmWasm' to build your contract. You can also interact with an existing smart contract.
            </div>
            <CustomNetwork updateChain={updateChain} />
            <div className="wrap-form">
                <CustomInput inputHeader="Contract address" input={contractAddr} setInput={setContractAddr} placeholder="eg. orai1ars73g86y4kzajsgam5ee38npgmkq54dlzuz6w" />
                <CustomInput inputHeader="Wallet mnemonic (optional)" input={mnemonic} setInput={setMnemonic} placeholder="eg. foo bar" />

            </div>

            <CustomSelect setInteractOption={setInteractOption} />

            {interactOption === "execute" &&
                <div>
                    <div className="contract-address">
                        <span>Contract Execute </span>
                    </div>
                    <div className="wrap-form">
                        <GasForm gasPrice={gasPrice} setGasPrice={setGasPrice} gasDenom={gasDenom} setGasDenom={setGasDenom} gasLimit={gasLimit} setGasLimit={setGasLimit} />
                        <HandleOptions handleOptionsRef={handleOptionsRef} />
                        {_.isEmpty(handleSchema) &&
                            <div style={{ marginBottom: '10px' }}>
                                <CustomInput inputHeader="Execute message" input={executeMessage} setInput={setExecuteMessage} placeholder="eg. {}" />
                                <Button onClick={() => { onHandle(null) }}>
                                    Execute
                                </Button>
                                <MyDropZone setSchema={setHandleSchema} setJson={null} dropZoneText={"Upload the schema file"} />
                            </div>
                        }
                        {!_.isEmpty(handleSchema) && <div>
                            <CustomForm schema={handleSchema} onSubmit={(data) => onHandle(data)} />
                            <Button onClick={() => { setHandleSchema({}) }}>
                                Remove schema form
                            </Button>
                        </div>
                        }
                    </div>
                </div>
            }
            {interactOption === "query" &&
                <div>
                    <div className="contract-address">
                        <span>Contract Query </span>
                    </div>
                    <div className="wrap-form">
                        <CustomInput inputHeader="Gas denom" input={gasDenom} setInput={setGasDenom} placeholder="eg. orai" />
                        {_.isEmpty(querySchema) && <div>
                            <CustomInput inputHeader="Query message" input={queryMessage} setInput={setQueryMessage} placeholder="eg. {}" />
                            <Button onClick={() => onQuery(null)}>
                                Query
                            </Button>
                            <MyDropZone setSchema={setQuerySchema} setJson={null} dropZoneText={"Upload the schema file"} />
                        </div>
                        }
                        {!_.isEmpty(querySchema) &&
                            <div style={{ marginBottom: '10px' }}>
                                <CustomForm schema={querySchema} onSubmit={(data) => onQuery(data)} />
                                <Button onClick={() => { setQuerySchema({}) }}>
                                    Remove schema form
                                </Button>
                            </div>
                        }
                    </div>
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
    );
};

export default AdvancedInteraction;
