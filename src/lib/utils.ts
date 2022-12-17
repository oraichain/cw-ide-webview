const processSchema = (schema) => {
    console.log("schema: ", schema)
    try {
        if ((schema.oneOf || schema.anyOf)) {
            let key = 'anyOf';
            if (schema.oneOf) key = 'oneOf';
            schema[key] = ((schema.oneOf || schema.anyOf)).map((item) => {
                console.log("item required: ", item.required[0])
                return {
                    ...item, title: item.required[0]
                        .replace(/_/g, ' ')
                        .replace(/(^|\s+)(\w)/g, (v, g1, g2) => g1 + g2.toUpperCase())
                }
            })
            return schema;
        }
        return schema
    } catch (error) {
        console.log("process schema failed:", error);
        return null;
    }
};

const actionType = {
    QUERY: "query",
    EXECUTE: "execute",
    MIGRATE: "migrate",
}

export const parseGasLimits = (gasLimits) => {
    if (!gasLimits) return undefined;
    const gasLimitsInt = parseInt(gasLimits);
    return { upload: gasLimitsInt, init: gasLimitsInt, exec: gasLimitsInt }
}

export { processSchema, actionType };