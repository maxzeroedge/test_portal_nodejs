const constants = require('./constants')
const sanitizer = require('sanitize')()
const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const respondBack = (attrs) => {
	const {error, statusCode, body, headers, callback} = attrs
	if(callback){
		callback( (error || null), {
			statusCode: (statusCode || 200),
			body: JSON.stringify(body),
			headers: (headers || constants.HEADERS)
		})
	}
}

/**
 * 
 * @param {*} data 
 */
const sanitizeData = (data) => {
	// TODO:
	// if(typeof data == 'object'){
	// 	if(Arrays.isArray(data)){
	// 		//
	// 	} else {
	// 		data = data.map((v, k)=>{
	// 			// Don't sanitize email or username
	// 			// TODO: Use /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	// 			// from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
	// 			if(k == 'username'){
	// 				if(emailPattern.test(v)){ // /[\w\d.]+@[\w\d.]+\.\w+/
	// 					return "";
	// 				}
	// 				return v;
	// 			}
	// 			return sanitizeData(v)
	// 		})
	// 	}
	// } else if(typeof data == 'string'){
	// 	// TODO:
	// 	data = sanitizer.value(data, 'string')
	// }
	return data
}

module.exports = {
	respondBack,
	sanitizeData
}