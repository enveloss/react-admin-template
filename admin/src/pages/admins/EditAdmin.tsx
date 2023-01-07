import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin';


export default function EditAdmin() {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="username" />
            </SimpleForm>
        </Edit>
    )
}
