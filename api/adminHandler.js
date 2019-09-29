const constants = require('../utils/constants')
const userQB = require('../database/userQueryBuilder')
const examQB = require('../database/examQueryBuilder')

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
	const exams = await examQB.listExams(body.query)
	callback(null, {
		statusCode: 200,
		headers: constants.HEADERS,
		body: JSON.stringify({
			exams
		})
	})
}

const listEntries = async (body, context, callback) => {
	
}
module.exports = {
	loginHandler,
	listExams,
	listEntries
}