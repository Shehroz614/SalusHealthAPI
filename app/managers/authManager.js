const APIRequest = require('../helpers/APIRequest');
const { getRequest, postRequest, getRequestWithToken, postRequestWithToken } = require('../helpers/GraphQLRequest')
const { GQL_SIGN_IN, GQL_SIGN_IN_USER_DATA,GQL_FORGOT_PASSWORD } = require('../helpers/Queries')
const signIn = async (params = null) => {
	try {
		const response = await postRequest(GQL_SIGN_IN, params)
		if (!!response && response.signIn.user == null && response.signIn.messages.length > 0) {
			return [null, response.signIn.messages[0]?.message];
        }
		if(process.env.PATIENTS_ALLOWED_ONLY==true && !response.signIn.user?.is_patient)
		return [null,'Only patients are allowed to access this portal.']
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};
const getLoggedInUser = async (params = null) => {
	try {
		const response = await getRequestWithToken(GQL_SIGN_IN_USER_DATA, null, params)
		return [response, null];
	} catch (error) {
		if(!!error && error?.response?.errors.length>0){
			return [[], error?.response?.errors[0]?.message];
		}
		return [[], error.response.errors[0].message];
	}
};
const forgetPassword = async (params = null) => {
	try {
		const response = await postRequest(GQL_FORGOT_PASSWORD, params)
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};
module.exports = {
	signIn,
	getLoggedInUser,
	forgetPassword
};
