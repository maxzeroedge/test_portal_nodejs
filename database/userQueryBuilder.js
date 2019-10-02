const dbHandler = require('./dbHandler')

/**
 * 
 * @param {*} attrs {username, password}
 */
const loginQuery = async (attrs) => {
	const salt = btoa(`${attrs.username}_${attrs.password}`).substring(5)
	let query = {
		'TableName': process.env.USER_TABLE,
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
	loginQuery
}