import "antd/dist/antd.css";
import _ from "lodash";
import { CustomInput } from "..";

const GasForm = ({ gasPrice, setGasPrice, gasLimit, setGasLimit, gasDenom, setGasDenom }) => {
  return <div className="wrap-form">
    <CustomInput inputHeader="Gas price" input={gasPrice} setInput={setGasPrice} placeholder="eg. 0.0025" />
    {/* <CustomInput inputHeader="Gas limit (optional)" input={gasLimit} setInput={setGasLimit} placeholder="eg. 200000" /> */}
    <CustomInput inputHeader="Gas denom" input={gasDenom} setInput={setGasDenom} placeholder="eg. orai" />
  </div>
}

export default GasForm;
