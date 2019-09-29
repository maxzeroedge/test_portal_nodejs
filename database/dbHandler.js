var AWS = require("aws-sdk");
let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
	options = {
		region: 'localhost',
		endpoint: 'http://localhost:8000',
	};
}
const dynamoDB = new AWS.DynamoDB(options);
const docClient = new AWS.DynamoDB.DocumentClient(options);

// TODO: Check Binary (B), Binary Set (BS), Number Set (BS), String Set (SS)
/**
 * Converts {"abc": "xyz", "def": 2} to {"abc": {"S": "xyz"}, "def": {"N": 2}}
 * As per AWS requirements
 * @param {*} jsonToConvert 
 */

const getAttributeTypedJson = (item) => {
	if(typeof item == "string"){
		item = {"S": item};
	} else if(typeof item == "boolean"){
		item = {"BOOL": item};
	} else if(typeof item == "number"){
		item = {"N": item+""};
	} else if(typeof item == "object"){
		if(Array.isArray(item)){
			item = {"L": createAttributeTypedJson(item)};
		} else {
			item = {"M": createAttributeTypedJson(item)};
		}
	} else if( item === null){
		item = {"NULL": item};
	}
	return item;
}
const createAttributeTypedJson = (jsonToConvert) => {
	Object.keys(jsonToConvert).forEach((v, k)=>{
		jsonToConvert[v] = getAttributeTypedJson(jsonToConvert[v]);
	});
	return jsonToConvert;
}

module.exports = {
	docClient, 
	dynamoDB,
	getAttributeTypedJson,
	createAttributeTypedJson
};