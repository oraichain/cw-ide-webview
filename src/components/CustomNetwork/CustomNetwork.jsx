import "antd/dist/antd.css";
import _ from "lodash";
import { Button, Input, Select, Spin } from "antd";
import { ReactComponent as IconSelect } from "../../assets/icons/code.svg";
import { ReactComponent as IconChain } from "../../assets/icons/chain.svg";
import { useEffect, useState } from "react";
import { MyDropZone } from "..";

const { Option } = Select;

const CustomNetwork = ({ updateChain }) => {
  const DEFAULT_CHAINMAME = window.chainStore.current.chainName;
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

  const onAddChain = () => {
    try {
      setErrorMessage("");
      console.log("json file: ", jsonFile);
      if (jsonFile.chainId) {
        window.chainStore.addChain(jsonFile);
        // set chain to auto trigger new chain store
        setChainInfos(window.chainStore.chainInfos);
        setUpdateMessage("Successfully added the new chain");
      } else throw "Invalid chain data";
    } catch (error) {
      setErrorMessage(String(error));
      setUpdateMessage("");
    }
  };

  const onRemoveChain = () => {
    try {
      setErrorMessage("");
      if (jsonFile.chainId) {
        window.chainStore.removeChain(jsonFile.chainId);
        // set chain to auto trigger new chain store
        setChainInfos(window.chainStore.chainInfos);
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
        defaultValue={DEFAULT_CHAINMAME}
        style={{ width: 240 }}
        suffixIcon={<IconSelect />}
        onSelect={(value) => {
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
