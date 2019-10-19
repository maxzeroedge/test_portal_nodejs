const dbHandler = require('./dbHandler')
const sanitizeData = require('../utils/utilities').sanitizeData
const uuid = require('uuid/v4')
const moment = require('moment')

const updateAnswer = async(attrs) => {
	let query = {
		"TableName": process.env.RESPONSE_TABLE,
		"Item": {
			examId: attrs.examId,
			questionId: attrs.questionId,
			response: attrs.response
		},
		"ReturnValues": "ALL_NEW"
	}
	const response = await dbHandler.docClient.put(query).promise()
	return response.Attributes
}

const updateEntry = async(attrs) => {
	let query = {
		"TableName": process.env.RESPONSE_TABLE,
		"IndexName": "idIndex",
		"Key": {
			id: attrs.id
		},
		"ExpressionAttributeValues": {},
		"UpdateExpression": "",
		"ReturnValues": "ALL_NEW"
	}
	return await dbHandler.docClient.update(query).promise()
}

module.exports = {
	updateAnswer,
	updateEntry
}