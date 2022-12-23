import { fetchUtils } from 'react-admin';
import config from './config';

export const sendPost = async (resource, method, body) => {
    const response = await fetchUtils.fetchJson(
        CONFIG.apiUrl + resource + method ,
        {
            method: 'POST',
            mode: 'cors',
            body: body 
                ?JSON.stringify(body) 
                :null,
            headers: new Headers({
                'admin-token': sessionStorage.getItem('token')
            })
        }
    )
    return await response.json
}

const sendFile = async (formData) => {
    const response = await fetch(config.API_URL + 'media/uploadFiles', {
        method: 'POST',
        body: formData
    })

    return await response.json()
}

const dataProvider = {
    getList: (resource, params) => {
        return sendPost(resource, '/getList')
    },

    getOne: async (resource, params) => {
        return await sendPost(resource, '/getOne/' + params.id)
    },

    getMany: (resource, params) => {
        return sendPost(resource, '/getMany?ids=' + params.ids.join(' '))
    },

    getManyReference: (resource, params) => {
       
    },

    create: async (resource, params) => {
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

    update: async (resource, params) => {
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

    updateMany: (resource, params) => {
        
    },

    delete: (resource, params) => {
        return sendPost(resource, '/deleteOne/' + params.id)
    },

    deleteMany: (resource, params) => {
        return sendPost(resource, '/deleteMany?ids=' + params.ids.join(' '))
    },
}

export default dataProvider