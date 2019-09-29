const constants = require('../utils/constants')
var adminHandler = require('./adminHandler');
var candidateHandler = require('./candidateHandler')


module.exports.apiAdminHandler = async (event, context, callback) => {
	let body = event.body
	if(typeof body == 'string'){
		body = JSON.parse(body)
	}
	try{
		switch (body.eventType) {
			case 'login':
				adminHandler.loginHandler(body, context, callback)
				break;
			case 'listExams':
				adminHandler.listExams(body, context, callback)
			case 'listEntries':
				adminHandler.listEntries(body, context, callback)
				break;
		
			default:
				break;
		}
	} catch(e){
		callback(null, {
			statusCode: 500,
			headers: constants.HEADERS,
			body: JSON.stringify({
				message: e.getMessage()
			})
		})
	}
}

module.exports.apiCandidateHandler = async (event, context, callback) => {
	let body = event.body
	if(typeof body == 'string'){
		body = JSON.parse(body)
	}
	try {
		switch (body.eventType) {
			case 'register':
				candidateHandler.registerHandler(body, context, callback)
				break;
			case 'listQuestions':
				candidateHandler.listQuestions(body, context, callback)
				break;
			case 'getQuestion':
				candidateHandler.getQuestion(body, context, callback)
				break;
			default:
				break;
		}
	} catch(e){
		callback(null, {
			statusCode: 500,
			headers: constants.HEADERS,
			body: JSON.stringify({
				message: e.getMessage()
			})
		})
	}
}