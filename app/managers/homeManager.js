const {getRequest,postRequest,getRequestWithToken,postRequestWithToken} = require('../helpers/GraphQLRequest')
const {GQL_ALL_GOALS,GQL_CREATE_GOAL_HISTORY,GQL_DELETE_GOAL_HISTORY} = require('../helpers/Queries')
const getGoals = async (params = null,token) => {
	try {
		const response = await postRequestWithToken(GQL_ALL_GOALS, params,token)
		if (!!response && response.goalsData==null && response.goalsData.messages.length > 0) {
			return [null, response.goalsData.messages[0]?.message];
        }
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};
const markGoalComplete = async (params = null,token) => {
	try {
		const response = await postRequestWithToken(GQL_CREATE_GOAL_HISTORY, params,token)
		if (!!response && response.createGoalHistory==null && response.createGoalHistory.messages.length > 0) {
			return [null, response.createGoalHistory.messages[0]?.message];
        }
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};
const deleteGoalHistory = async (params = null,token) => {
	try {
		const response = await postRequestWithToken(GQL_DELETE_GOAL_HISTORY, params,token)
		if (!!response && response.deleteGoalHistory==null && response.deleteGoalHistory.messages.length > 0) {
			return [null, response.deleteGoalHistory.messages[0]?.message];
        }
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};
module.exports = {
	getGoals,
	markGoalComplete,
	deleteGoalHistory
};
