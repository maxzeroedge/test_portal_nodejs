const userQB = require('../database/userQueryBuilder')
const constants = require('../utils/constants')

const loginHandler = async (body, context, callback) => {
	const profileData = await userQB.loginQuery(body.query)
	callback(null, {
		statusCode: 200,
		headers: constants.HEADERS,
		body: JSON.stringify({
			profileData
		})
	})
}

const listExams = async (body, context, callback) => {
	
}

const listEntries = async (body, context, callback) => {
	
}