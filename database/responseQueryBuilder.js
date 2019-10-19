const dbHandler = require('./dbHandler')
const sanitizeData = require('../utils/utilities').sanitizeData
const uuid = require('uuid/v4')
const moment = require('moment')

const getResponse = async(attrs) => {
	let query = {
		'TableName': process.env.RESPONSE_TABLE,
		'IndexName': 'examIdUserIdIndex',
		'ExpressionAttributeNames': {
			'#examId': 'examId',
			'#candidateId': 'candidateId'
		},
		'ExpressionAttributeValues': {
			':examId': {
				"S": attrs.examId
			}, 
			':candidateId': {
				"S": attrs.candidateId
			}
		},
		'KeyConditionExpression': '#examId = :examId and #candidateId = :candidateId'
	}
	const responseItem = await dbHandler.docClient.query(query).promise();
	return responseItem.Items.length ? responseItem.Items[0] : false;
}

/**
 * 
 * @param {*} attrs {examId, candidateId, candidateResponse: {questionId, response, marks}} 
 */
const updateAnswer = async (attrs) => {
	let responseItem = getResponse(attrs)
	if(!responseItem){
		responseItem = {
			id: uuid(),
			examId: attrs.examId,
			candidateId: attrs.candidateId,
			answerSheet: []
		}
	}
	let candidateResponseIndex = -1;
	let candidateResponse = attrs.candidateResponse || {}
	responseItem.answerSheet.forEach((v,k)=>{
		if(v.questionId == attrs.questionId){
			candidateResponseIndex = k;
			candidateResponse = v;
		}
	})
	if(candidateResponseIndex > -1){
		responseItem.answerSheet.splice(candidateResponseIndex, 1, candidateResponse)
	}
	let query = {
		"TableName": process.env.RESPONSE_TABLE,
		"Item": responseItem,
		"ReturnValues": "ALL_NEW"
	}
	const response = await dbHandler.docClient.put(query).promise()
	return response.Attributes
}
/**
 * 
 * @param {*} attrs {examId, candidateId, candidateResponse: {questionId, response, marks}} 
 */
const updateEntry = async (attrs) => {
	return await updateAnswer(attrs)
}

module.exports = {
	updateAnswer,
	updateEntry
}