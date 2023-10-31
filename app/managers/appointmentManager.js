const APIRequest = require('../helpers/APIRequest');
const { getRequest, postRequest, getRequestWithToken, postRequestWithToken } = require('../helpers/GraphQLRequest')
const { GET_ALL_APPOINTMENTS,GQL_GET_appointmentTypesData,GQL_Delete_Appointment,GQL_GET_ORGANIZATION,GQL_DAYS_AVAILABLE,GQL_DAY_AVAILABLE_SLOTS ,GQL_Complete_CheckOut_Meeting} = require('../helpers/Queries')
const getAppointments = async (params = null,token) => {
	try {
		const response = await postRequestWithToken(GET_ALL_APPOINTMENTS, params,token)
		if (!!response && response.appointments==null && response.appointments.messages.length > 0) {
			return [null, response.appointments.messages[0]?.message];
        }
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};
const getAppointmentsTypesData = async (params = null,token) => {
	try {
		const response = await postRequestWithToken(GQL_GET_appointmentTypesData, params,token)
		if (!!response && response.appointmentTypes == null && response.appointmentTypes.messages.length > 0) {
			return [null, response.appointmentTypes.messages[0]?.message];
        }
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};
const getOrganization = async (params = null,token) => {
	try {
		const response = await getRequestWithToken(GQL_GET_ORGANIZATION, params,token)
		if (!!response && response.organization == null && response.organization.messages.length > 0) {
			return [null, response.organization.messages[0]?.message];
        }
		return [response, null];
	} catch (error) {
		return [[], error.response.error];
	}
};
const getDaysAvailable = async (params = null,token) => {
	try {
		const response = await getRequestWithToken(GQL_DAYS_AVAILABLE, params,token)
		if (!!response && response.daysAvailableForRange == null && response.daysAvailableForRange.messages.length > 0) {
			return [null, response.daysAvailableForRange.messages[0]?.message];
        }
		return [response, null];
	} catch (error) {
		return [[], error.response.error];
	}
};
const getDaysAvailableSlot = async (params = null,token) => {
	try {
		const response = await getRequestWithToken(GQL_DAY_AVAILABLE_SLOTS, params,token)
		if (!!response && response.availableSlotsForRange == null && response.availableSlotsForRange.messages.length > 0) {
			return [null, response.availableSlotsForRange.messages[0]?.message];
        }
		return [response, null];
	} catch (error) {
		return [[], error.response.error];
	}
};
const createAppointment = async (params = null,token) => {
	try {
		const response = await postRequestWithToken(GQL_Complete_CheckOut_Meeting, params,token)
		if (!!response && response.completeCheckout == null && response.completeCheckout.messages.length > 0) {
			return [null, response.completeCheckout.messages[0]?.message];
        }
		return [response, null];
	} catch (error) {
		return [[], error.response.error];
	}
};
const deleteAppointment = async (params = null,token) => {
	try {
		const response = await postRequestWithToken(GQL_Delete_Appointment, params,token)
		if (!!response && response.deleteAppointment.appointment == null && response.deleteAppointment.messages.length > 0) {
			return [null, response.deleteAppointment.messages[0]?.message];
        }
		return [response, null];
	} catch (error) {
		return [[], error.response.errors[0].message];
	}
};
module.exports = {
	getAppointments,
	getAppointmentsTypesData,
	deleteAppointment,
	getOrganization,
	getDaysAvailable,
	getDaysAvailableSlot,
	createAppointment
	};
