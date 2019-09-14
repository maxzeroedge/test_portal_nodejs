'use strict';

const loginHandler = async (event, context, callback) => {
	//
}

const registerHandler = async (event, context, callback) => {
	//
}

module.exports.apiAdminHandler = async (event, context, callback) => {
	let body = event.body
	if(typeof body == 'string'){
		body = JSON.parse(body)
	}
	switch (body) {
		case 'login':
			loginHandler(event, context, callback)
			break;
		case 'listExams':
			listExams(event, context, callback)
		case 'listEntries':
			listEntries(event, context, callback)
			break;
	
		default:
			break;
	}
}

module.exports.apiCandidateHandler = async (event, context, callback) => {
	let body = event.body
	if(typeof body == 'string'){
		body = JSON.parse(body)
	}
	switch (body) {
		case 'register':
			registerHandler(event, context, callback)
			break;
		case 'listQuestions':
			listQuestions(event, context, callback)
			break;
		case 'getQuestion':
			getQuestion(event, context, callback)
			break;
		default:
			break;
	}
}