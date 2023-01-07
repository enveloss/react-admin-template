import { fetchUtils, AuthProvider, ErrorProps } from 'react-admin';
import { CONFIG } from './config';

export const sendPost = async (resource: string, method: string, body?: any) => {
    const response = await fetchUtils.fetchJson(
        CONFIG.API_URL + resource + method ,
        {
            method: 'POST',
            mode: 'cors',
            body: body 
                ?JSON.stringify(body) 
                :null,
            headers: {
                'admin-token': sessionStorage.getItem('token')
            } as HeadersInit
        }
    )
    return await response.json
}

const authProvider = {
    login: async ({ token }: {token: string}) => {
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
    checkError: (error: any) => {
        if (error.status === 401) {return Promise.reject()}
        else {return Promise.resolve()}
    }
}

export default authProvider