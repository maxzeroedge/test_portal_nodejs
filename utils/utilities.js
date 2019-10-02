const constants = require('./constants')

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
	if(typeof data == 'object'){
		if(Arrays.isArray(data)){
			//
		} else {
			data = data.map(v=>{
				return sanitizeData(v)
			})
		}
	} else if(typeof data == 'string'){
		// TODO:
	}
	return data
}

module.exports = {
	respondBack,
	sanitizeData
}