import { fetchUtils } from 'react-admin';
import config from './config';

export const sendPost = async (resource, method, body) => {
    const response = await fetchUtils.fetchJson(
        config.API_URL + resource + method ,
        {
            method: 'POST',
            mode: 'cors',
            body: body 
                ?JSON.stringify(body) 
                :null
        }
    )
    return await response.json
}

const authProvider = {
    login: async ({ token }) => {
        const response = await sendPost('admins', `/getAuth?token=${token}`)

        if (response.ok) {
            sessionStorage.setItem('token', response.token)
        } else {
            throw new Error("The token is invalid")
        }
    },
    logout: () => {
        sessionStorage.removeItem('token')
        return Promise.resolve()
    },
    checkAuth: () => sessionStorage.getItem('token')
        ? Promise.resolve()
        : Promise.reject(),
    getPermissions: () => {
        return Promise.resolve({})
    },
    checkError: (error) => {
        if (error.status === 401) {return Promise.reject()}
        else {return Promise.resolve()}
    }
}

export default authProvider