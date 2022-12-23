import React from 'react'
import { Datagrid, List, TextField } from 'react-admin';

export default function ListAdmins() {
    return (
        <List pagination={false}>
            <Datagrid rowClick="edit">
                <TextField source="id" sortable={false}/>
                <TextField source="username" sortable={false}/>
            </Datagrid>
        </List>
    )
}
