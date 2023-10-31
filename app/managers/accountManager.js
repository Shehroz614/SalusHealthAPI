const APIRequest = require('../helpers/APIRequest');
const { getRequest, postRequest, getRequestWithToken, postRequestWithToken } = require('../helpers/GraphQLRequest')
const { GQL_UPDATE_USER} = require('../helpers/Queries')
const updatePersonalInfo = async (params = null,token) => {
	try {
		const response = await postRequestWithToken(GQL_UPDATE_USER, params,token)
		if (!!response && response.updateUser.messages!=null) {
			return [null, response.updateUser.messages[0]?.message];
        }
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};

module.exports = {
	updatePersonalInfo,
};
