import { fetchUtils, DataProvider } from 'react-admin';
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

const sendFile = async (formData: FormData) => {
    const response = await fetch(CONFIG.API_URL + 'media/uploadFiles', {
        method: 'POST',
        body: formData
    })

    return await response.json()
}

const dataProvider: DataProvider = {
    getList: (resource: string, params: any) => {
        return sendPost(resource, '/getList')
    },

    getOne: async (resource: string, params: any) => {
        return await sendPost(resource, '/getOne/' + params.id)
    },

    getMany: (resource: string, params: any) => {
        return sendPost(resource, '/getMany?ids=' + params.ids.join(' '))
    },

    getManyReference: (resource: string, params: any): any => {
        
    },

    create: async (resource: string, params: any) => {
        if (params.data.image) {                
            const formData = new FormData();
            formData.append("files", params.data.image.rawFile);

            const result = await sendFile(formData)
            
            params.data = {...params.data, image: result.urls[0]}
        }

        return await sendPost(resource, '/create', { 
            ...params.data
        })
    },

    update: async (resource: string, params: any) => {
        if (params.data.image && typeof params.data.image !== 'string')  {                
            const formData = new FormData();
            formData.append("files", params.data.image.rawFile);

            const result = await sendFile(formData)
            
            params.data = {...params.data, image: result.urls[0]}
        }
        return await sendPost(resource, '/update/' + params.id, { 
            fields: {...params.data}
        })
    },

    updateMany: (resource: string, params: any): any => {
        
    },

    delete: (resource: string, params: any) => {
        return sendPost(resource, '/deleteOne/' + params.id)
    },

    deleteMany: (resource: string, params: any) => {
        return sendPost(resource, '/deleteMany?ids=' + params.ids.join(' '))
    },
}

export default dataProvider