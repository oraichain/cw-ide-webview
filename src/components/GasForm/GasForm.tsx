import "antd/dist/antd.css";
import _ from "lodash";
import { CustomInput } from "..";

const GasForm = ({ gasData, setGasData, children }) => {

  const setGasPrice = (input) => setGasData({ ...gasData, gasPrice: input });
  const setGasDenom = (input) => setGasData({ ...gasData, gasDenom: input });
  const setGasLimit = (rawInput) => {
    console.log("raw input: ", rawInput)
    if (!rawInput) {
      setGasData({ ...gasData, gasLimits: "" });
    } else {
      const input = parseInt(rawInput);
      setGasData({ ...gasData, gasLimits: input });
    }

  }
  return <div className="wrap-form">
    <CustomInput inputHeader="Gas price" input={gasData.gasPrice} setInput={setGasPrice} placeholder="eg. 0.0025" />
    <CustomInput inputHeader="Gas denom" input={gasData.gasDenom} setInput={setGasDenom} placeholder="eg. orai" />
    {(window.chainStore.current.cosmwasmVersion === "0.13.2") &&
      <CustomInput inputHeader="Gas limit" input={gasData.gasLimits} setInput={setGasLimit} placeholder="eg. 200000" />}
    {children}
  </div>
}

export default GasForm;
