import "antd/dist/antd.css";
import { Input, Button, Tooltip } from "antd";
import { CopyOutlined, FormOutlined } from "@ant-design/icons";

const CustomInput = ({
  inputHeader,
  input,
  setInput,
  placeholder = "",
  type = "text"
}) => {

  const _onClickCopyContractAddress = async () => {
    await navigator.clipboard.writeText(input)
  }

  const _onClickPasteContractAddress = async () => {
    const data = await navigator.clipboard.readText()
    setInput(data)
  }

  return (
    <div className="input-form">
      <h4>{inputHeader}</h4>
      <Input.Group compact>
        <Input
          style={{ width: "calc(100% - 200px)" }}
          placeholder={placeholder}
          value={input}
          onInput={(e: any) => setInput(e.target.value)}
          type={type}
        />
        <Tooltip title="copy contract">
          <Button
            icon={<FormOutlined />}
            size={"middle"}
            style={{
              marginTop: "2px",
              marginLeft: "2px"
            }}
            onClick={_onClickCopyContractAddress}
          />
        </Tooltip>

        <Tooltip title="paste contract">
          <Button
            icon={<CopyOutlined />}
            size={"middle"}
            style={{
              marginTop: "2px",
            }}
            onClick={_onClickPasteContractAddress}
          />
        </Tooltip>

        
      </Input.Group>
    </div>
  );
};

export default CustomInput;
