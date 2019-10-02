const constants = require('../utils/constants')
const respondBack = require('../utils/utilities').respondBack
const questionsQB = require('../database/questionQueryBuilder')
const candidateQB = require('../database/candidateQueryBuilder')

const registerHandler = async (body, context, callback) => {
	const candidate = await candidateQB.registerUser(body.query)
	respondBack({
		callback,
		body: {candidate}
	})
}

/**
 * 
 * @param {*} body { query: { examId, (createdOn) } }
 * @param {*} context 
 * @param {*} callback 
 */
const listQuestions = async (body, context, callback) => {
	const questions = await questionsQB.listQuestions(body.query)
	respondBack({
		callback,
		body: {questions}
	})
}

/**
 * 
 * @param {*} body {query: {id}}
 * @param {*} context 
 * @param {*} callback 
 */
const getQuestion = async (body, context, callback) => {
	const question = await questionsQB.getQuestion(body.query)
	respondBack({
		callback,
		body: {question}
	})
}

// TODO: Decide Structure
const updateAnswer = async (body, context, callback) => {
	const candidate = await candidateQB.updateAnswer(body.query)
	respondBack({
		callback,
		body: {
			candidate
		}
	})
}

module.exports = {
	registerHandler,
	listQuestions,
	getQuestion,
	updateAnswer
}