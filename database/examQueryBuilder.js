const dbHandler = require('./dbHandler')
const moment = require('moment-timezone')

/**
 * 
 * @param {*} attrs {status, (createdOn)}
 */
const listExams = async (attrs) => {
	if(!attrs.createdOn){
		// Set as current date
		attrs.createdOn = moment().tz("UTC").valueOf()
	}
	let query = {
		'TableName': process.env.EXAM_TABLE,
		'ExpressionAttributeNames': {
			"#status": "status",
			"#createdOn": "createdOn"
		},
		'ExpressionAttributeValues': {
			":status": {
				"S": attrs.status
			},
			":createdOn": {
				"S": attrs.createdOn
			}
		},
		"KeyConditionExpression": "#status = :status and #createdOn < :createdOn"
	}
	const examResponse = await dbHandler.docClient.query(query).promise();
	return examResponse.Items.length ? examResponse.Items : false;
}

/**
 * 
 * @param {*} attrs {id}
 */
const getExam = async (attrs) => {
	let query = {
		'TableName': process.env.EXAM_TABLE,
		'ExpressionAttributeNames': {
			"#id": "id"
		},
		'ExpressionAttributeValues': {
			":id": {
				"S": attrs.id
			}
		},
		"KeyConditionExpression": "#id = :id"
	}
	const examResponse = await dbHandler.docClient.query(query).promise();
	return examResponse.Items.length ? examResponse.Items[0] : false;
}

module.exports = {
	listExams,
	getExam
}