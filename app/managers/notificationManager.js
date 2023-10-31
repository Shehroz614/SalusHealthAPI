const APIRequest = require('../helpers/APIRequest');
const { getRequest, postRequest, getRequestWithToken, postRequestWithToken } = require('../helpers/GraphQLRequest')
const { GET_NOTIFICATIONS_SETTING,UPDATE_NOTIFICATIONS_SETTING } = require('../helpers/Queries')
const getNotificationSettings = async (params = null,token) => {
	try {
		const response = await getRequestWithToken(GET_NOTIFICATIONS_SETTING, params,token)
		if (!!response && response.notificationSetting == null || response.notificationSetting.messages!=null) {
			return [null, response.notificationSetting?.messages[0]?.message||'No Setting found'];
        }
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};
const updateNotificationSettings = async (params = null,token) => {
	try {
		const response = await postRequestWithToken(UPDATE_NOTIFICATIONS_SETTING, params,token)
		if (!!response && response.updateNotificationSetting?.notificationSetting == null || response.updateNotificationSetting.messages!=null) {
			return [null, response.updateNotificationSetting?.messages[0]?.message];
        }
		return [response, null];
	} catch (error) {
		if(!!error && error?.response?.errors.length>0){
			return [[], error?.response?.errors[0]?.message];
		}
		return [[], error.response.errors[0].message];
	}
};

module.exports = {
	getNotificationSettings,
	updateNotificationSettings,
	};
