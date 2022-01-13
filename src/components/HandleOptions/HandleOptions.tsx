import "antd/dist/antd.css";
import _ from "lodash";
import Form from '@rjsf/antd';
import handleOptionsSchema from "src/types/schema/handle-options";
import { useState } from "react";

const HandleOptions = ({ handleOptionsRef }) => {

    const onHandleOptionsChange = _.throttle(({ formData }) => {
        setHandleOptions(formData);
        handleOptionsRef.current = { ...formData, funds: formData.funds.slice(1) }; // always skip the first index because it is a placeholder
    }, 2000, { 'trailing': true })

    const [handleOptions, setHandleOptions] = useState(undefined);

    return (
        <div className="input-form">
            <Form
                schema={handleOptionsSchema}
                formData={handleOptions}
                onChange={onHandleOptionsChange}
                // onSubmit={(data) => setInitSchemaData(data.formData)}
                children={true}
            />
        </div>
    );
};

export default HandleOptions;
