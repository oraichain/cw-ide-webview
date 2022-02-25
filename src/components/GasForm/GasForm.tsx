import "antd/dist/antd.css";
import _ from "lodash";
import { CustomInput } from "..";

const GasForm = ({ gasData, setGasData }) => {

  const setGasPrice = (input) => setGasData({ ...gasData, gasPrice: input });
  const setGasDenom = (input) => setGasData({ ...gasData, gasDenom: input });

  return <div className="wrap-form">
    <CustomInput inputHeader="Gas price" input={gasData.gasPrice} setInput={setGasPrice} placeholder="eg. 0.0025" />
    {/* <CustomInput inputHeader="Gas limit (optional)" input={gasLimit} setInput={setGasLimit} placeholder="eg. 200000" /> */}
    <CustomInput inputHeader="Gas denom" input={gasData.gasDenom} setInput={setGasDenom} placeholder="eg. orai" />
  </div>
}

export default GasForm;
