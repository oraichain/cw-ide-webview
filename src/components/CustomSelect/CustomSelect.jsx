import "antd/dist/antd.css";
import _ from "lodash";
import { Button, Input, Select, Spin } from 'antd';
import { ReactComponent as IconSelect } from '../../assets/icons/code.svg';
import { ReactComponent as IconChain } from '../../assets/icons/chain.svg';

const interactList = [{ key: 1, value: "execute" }, { key: 2, value: "query" }];
const { Option } = Select;

const CustomSelect = ({ setInteractOption }) => {
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
                <h3> Select interaction type</h3>
            </div>
            <Select
                defaultValue={interactList[1].value}
                style={{ width: 240 }}
                suffixIcon={<IconSelect />}
                onSelect={(value) => {
                    setInteractOption(value);
                }}
            >
                {interactList.map((info) => (
                    <Option key={info.key} value={info.value}>
                        {info.value}
                    </Option>
                ))}
            </Select>
        </div>
    )
}

export default CustomSelect;
