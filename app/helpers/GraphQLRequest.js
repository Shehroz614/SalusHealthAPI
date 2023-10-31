// const { gql } = require('graphql-request');
const request = require('graphql-request').request;
const { parsed: env } = require('dotenv').config();


const getRequest = async (query, payload) => {
	return await request(process.env.GRAPH_QL_URL, query, payload);
};


const getRequestWithToken = async (query, payload = null, accessToken) => {
	const headers = {
		authorization: `Basic ${accessToken}`,
		accept: 'application/json',
		authorizationsource: 'API',
		'Content-Type': 'application/json'
	};
	const result = await request(process.env.GRAPH_QL_URL, query, payload, headers);
	return result;
};


const postRequest = async (mutation, payload) => {
	return await request(process.env.GRAPH_QL_URL, mutation, payload);
};
const postRequestWithToken = async (mutation, payload = null, accessToken) => {
	const headers = {
		authorization: `Basic ${accessToken}`,
		accept: 'application/json',
		authorizationsource: 'API',
		'Content-Type': 'application/json'
	};
	return await request(process.env.GRAPH_QL_URL, mutation, payload, headers);
};


module.exports = {
	getRequest,
	postRequest,
	getRequestWithToken,
	postRequestWithToken
};
