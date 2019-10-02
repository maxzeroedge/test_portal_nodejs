const dbHandler = require('./dbHandler')
const sanitizeData = require('../utils/utilities').sanitizeData

/**
 * 
 * @param {*} attrs {examId, (createdOn)}
 */
const listEntries = async (attrs) => {
	let query = {
		'TableName': process.env.CANDIDATE_TABLE,
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
	const entriesResponse = await dbHandler.docClient.query(query).promise();
	return entriesResponse.Items.length ? entriesResponse.Items : false;
}

/**
 * 
 * @param {*} attrs {id}
 */
const getCandidate = async (attrs) => {
	let query = {
		'TableName': process.env.CANDIDATE_TABLE,
		'ExpressionAttributeNames': {
			"#id": "id"
		},
		'ExpressionAttributeValues': {
			':id': {
				"S": attrs.id
			}
		},
		'KeyConditionExpression': "#id = :id"
	}
	const candidateResponse = await dbHandler.docClient.query(query).promise();
	return candidateResponse.Items.length ? candidateResponse.Items[0] : false;
}

/**
 * 
 * @param {*} attrs {candidateData}
 */
const registerUser = async (attrs) => {
	const {name, instituteId, branch, experience} = attrs
	const resp = await dbHandler.docClient.put({
		"TableName": process.env.CANDIDATE_TABLE,
		"Item": attrs,
		"ReturnValues": "ALL_NEW"
	}).promise()
	return resp.Attributes
}

module.exports = {
	listEntries,
	getCandidate,
	registerUser
}