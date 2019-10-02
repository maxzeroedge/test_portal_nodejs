const dbHandler = require('./dbHandler')
const sanitizeData = require('../utils/utilities').sanitizeData
const uuid = require('uuid/v4')
const moment = require('moment')

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
	if(!attrs.id){
		attrs.id = uuid()
	}
	attrs.lastModifiedOn = moment().valueOf()
	const resp = await dbHandler.docClient.put({
		"TableName": process.env.CANDIDATE_TABLE,
		"Item": attrs,
		"ReturnValues": "ALL_NEW"
	}).promise()
	return resp.Attributes
}

// TODO
const updateAnswer = async(attrs) => {
	let query = {
		"TableName": process.env.CANDIDATE_TABLE,
		"Key": {
			id: attrs.id
		},
		"ExpressionAttributeValues": {},
		"UpdateExpression": "",
		"ReturnValues": "ALL_NEW"
	}
	return await dbHandler.docClient.update(query).promise()
}

// TODO
const updateEntry = async(attrs) => {
	let query = {
		"TableName": process.env.CANDIDATE_TABLE,
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
	listEntries,
	getCandidate,
	registerUser,
	updateAnswer,
	updateEntry
}