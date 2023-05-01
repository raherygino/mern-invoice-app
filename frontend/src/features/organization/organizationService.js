import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000/api/organizations/'

// Create Organization
const createOrganization = async (organizationData) => {
    const response = await axios.post(API_URL, organizationData)
    return response.data
}

// get Organization by Id
const getOrganization = async (id) => {
    const response = await axios.get(`${API_URL}show/${id}`)
    return response.data
}


const organizationService = {
    createOrganization,
    getOrganization,
}


export default organizationService