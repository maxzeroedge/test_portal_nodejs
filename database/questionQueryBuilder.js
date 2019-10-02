const dbHandler = require('./dbHandler')
const moment = require('moment-timezone')

/**
 * 
 * @param {*} attrs {examId, (createdOn)}
 */
const listQuestions = async (attrs) => {
	if(!attrs.createdOn){
		// Set as current date
		attrs.createdOn = moment().tz("UTC").valueOf()
	}
	let query = {
		'TableName': process.env.QUESTION_TABLE,
		'ExpressionAttributeNames': {
			"#examId": "examId",
			"#createdOn": "createdOn"
		},
		'ExpressionAttributeValues': {
			":examId": {
				"S": attrs.examId
			},
			":createdOn": {
				"S": attrs.createdOn
			}
		},
		"KeyConditionExpression": "#examId = :examId and #createdOn < :createdOn"
	}
	const questionResponse = await dbHandler.docClient.query(query).promise();
	return questionResponse.Items.length ? questionResponse.Items : false;
}

/**
 * 
 * @param {*} attrs {id}
 */
const getQuestion = async (attrs) => {
	let query = {
		'TableName': process.env.QUESTION_TABLE,
		'ExpressionAttributeNames': {
			"#id": "id"
		},
		'ExpressionAttributeValues': {
			":id": {
				"S": attrs.questionId
			}
		},
		"KeyConditionExpression": "#id = :id"
	}
	const questionResponse = await dbHandler.docClient.query(query).promise();
	return questionResponse.Items.length ? questionResponse.Items[0] : false;
}

module.exports = {
	listQuestions,
	getQuestion
}