import { SimpleForm, TextInput, Create } from 'react-admin';

export default function CreateAdmin () {
    return (
        <Create>
            <SimpleForm>
                <TextInput source="username" required/>
            </SimpleForm>
        </Create>
    )
}
