const handleOptions = {
    "type": "object",
    "required": [],
    "properties": {
        "funds": {
            "type": "array",
            "title": "Sent funds",
            "items": [
                {
                    "type": "null",
                }
            ],
            "additionalItems": {
                "title": "Coin",
                "type": "object",
                "required": [
                    "amount", "denom"
                ],
                "properties": {
                    "denom": {
                        "title": "denom",
                        "type": "string",
                        "default": "orai"
                    },
                    "amount": {
                        "title": "amount",
                        "type": "string",
                        "default": "1"
                    }
                }
            }
        },
        "memo": {
            "type": "string",
            "title": "memo",
            "required": []
        }
    }
}

export default handleOptions;