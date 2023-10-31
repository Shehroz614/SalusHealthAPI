const {
	 ErrorResponse 
} = require('./common');
const { getRequestWithToken } = require('../helpers/GraphQLRequest')
const {GQL_SIGN_IN_USER_DATA } = require('../helpers/Queries')
module.exports = async (req, res, next) => {
	try {

		// I'm passing in the access token in header under key accessToken
		const accessTokenFromClient =
			req.headers.accesstoken || req.headers['Authorization'];

		console.log(accessTokenFromClient);
		if (!accessTokenFromClient) {
			return res.status(401).send(ErrorResponse('Access Token missing from header'));
		}

		
			try {
				const response = await getRequestWithToken(GQL_SIGN_IN_USER_DATA, null, req.headers.accesstoken)
				if(response.currentUser?.is_patient==true){

					next();
				}
				else{
					return res.status(401).send(ErrorResponse('Only patient have access to this.'));
				}
			} catch (error) {
				if (!!error && error?.response?.errors.length > 0) {
					return res.status(401).send(ErrorResponse('UnAuthorized'));
				}
			}
		
	} catch (err) {
		console.log(err);
		res.status(401).send(ErrorResponse(`${err}Invalid request!`));
	}
};
