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
		'TableName': process.env.USER_TABLE,
		'IndexName': 'examIdIndex',
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
		'TableName': process.env.USER_TABLE,
		'IndexName': 'idIndex',
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
	attrs.createdOn = moment().valueOf()
	const resp = await dbHandler.docClient.put({
		"TableName": process.env.USER_TABLE,
		"Item": attrs,
		"ReturnValues": "ALL_NEW"
	}).promise()
	return resp.Attributes
}

/**
 * 
 * @param {*} attrs {username, password}
 */
const loginQuery = async (attrs) => {
	const salt = btoa(`${attrs.username}_${attrs.password}`).substring(5)
	let query = {
		'TableName': process.env.USER_TABLE,
		'IndexName': 'emailPasswordIndex',
		'ExpressionAttributeNames': {
			"#username": "email",
			"#password": "password"
		},
		'ExpressionAttributeValues': {
			":username": {
				"S": attrs.username
			},
			":password": {
				"S": attrs.password + salt
			}
		},
		"KeyConditionExpression": "#username = :username and #password = :password"
	}
	const loginResponse = await dbHandler.docClient.query(query).promise();
	return loginResponse.Items.length ? loginResponse.Items[0] : false;
}

module.exports = {
	listEntries,
	getCandidate,
	registerUser,
	loginQuery
}