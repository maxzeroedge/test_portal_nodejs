const constants = require('../utils/constants')
const respondBack = require('../utils/utilities').respondBack
const userQB = require('../database/userQueryBuilder')
const examQB = require('../database/examQueryBuilder')
const candidateQB = require('../database/candidateQueryBuilder')

/**
 * 
 * @param {*} body { query: { username, password } }
 * @param {*} context 
 * @param {*} callback 
 */
const loginHandler = async (body, context, callback) => {
	const profileData = await userQB.loginQuery(body.query)
	respondBack({
		callback,
		body: {profileData}
	})
}

/**
 * 
 * @param {*} body { query: { status, (createdOn) } }
 * @param {*} context 
 * @param {*} callback 
 */
const listExams = async (body, context, callback) => {
	const exams = await examQB.listExams(body.query)
	respondBack({
		callback,
		body: {exams}
	})
}

/**
 * 
 * @param {*} body { query: { examId, (createdOn) } }
 * @param {*} context 
 * @param {*} callback 
 */
const listEntries = async (body, context, callback) => {
	const entries = await candidateQB.listEntries(body.query)
	respondBack({
		callback,
		body: {entries}
	})
}

// TODO: Decide Structure
const updateEntry = async (body, context, callback) => {
	const entry = await candidateQB.updateEntry(body.query)
	respondBack({
		callback,
		body: {entry}
	})
}

module.exports = {
	loginHandler,
	listExams,
	listEntries,
	updateEntry
}