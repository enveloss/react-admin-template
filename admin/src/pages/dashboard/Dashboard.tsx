import React, { useState, useEffect } from 'react'

import CustomCard from './Card';
import { sendPost } from '../../dataProvider';

import { Card } from '@mui/material';
import { SxProps } from '@mui/system'

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CircularProgress from '@mui/material/CircularProgress';

type Response = {
    userCount: number
}

export default function Dashboard() {
    const [response, setResponse] = useState<Response>()

    useEffect(() => {
        (async () => {
            setResponse({
                userCount: (await sendPost('users', '/getCount')).data
            })
        })()
    }, [])

    const cardStyles: SxProps = {
        height: 'fit-content',
        width: '50%'
    }

    return (
        response 
        ? <Card
            sx={{ 
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'start',
                '@media (max-width: 900px)': {
                    flex: 'none',
                    flexDirection: 'column',
                    '.card': {
                        width: '100%'
                    }
                },
            }}
        >
            <CustomCard 
                title="USERS COUNT"
                body={String(response.userCount)}
                subtitle={`Total ${response.userCount}`}
                icon={<PeopleAltIcon />}
                props={{
                    sx: cardStyles
                }}
            />
        </Card>
        : <CircularProgress />
    )
}
