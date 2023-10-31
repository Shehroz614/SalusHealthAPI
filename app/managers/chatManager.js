const APIRequest = require('../helpers/APIRequest');
const {
	getRequest,
	postRequest,
	getRequestWithToken,
	postRequestWithToken
} = require('../helpers/GraphQLRequest');
const {
	GQL_Conversation_Membership,
	GQL_GET_NOTES,
	GQL_Create_Chat,
	GQL_UPDATE_CHAT_VIEWED
} = require('../helpers/Queries');

const getAllChats = async (params = null, token) => {
	try {
		const response = await getRequestWithToken(GQL_Conversation_Membership, params, token);
		if (!!response && response.conversationMemberships == null) {
			return [null, response.messages[0]?.message];
		}
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};

const getConversation = async (params = null, token) => {
	try {
		const response = await getRequestWithToken(GQL_GET_NOTES, params,token)
		if (!!response && response.notes == null ) {
			return [null, 'No Conversation Found.'];
        }
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};

const createNewChat = async (params = null, token) => {
	try {
		const response = await postRequestWithToken(GQL_Create_Chat, params, token);
		if (!!response && response.createNote == null) {
			return [null, response.messages[0]?.message];
		}
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};

const updateChatStatus = async (params = null, token) => {
	try {
		const response = await postRequestWithToken(GQL_UPDATE_CHAT_VIEWED, params, token);
		if (
			!!response &&
			response.updateConversationMembership.conversation_membership == null &&
			response.updateConversationMembership.messages != null
		) {
			return [null, response.updateConversationMembership.messages[0]?.message];
		}
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};

module.exports = {
	getAllChats,
	getConversation,
	createNewChat,
	updateChatStatus
};
