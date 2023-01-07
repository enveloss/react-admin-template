import React from 'react'
import { Avatar, Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';

type Props = {
    title: string,
    body: string,
    subtitle: string, 
    icon: JSX.Element,
    props: object

}

export default function CardItem({ title, body, subtitle, icon, props }: Props) {
    return (
        <CardContent {...props} className="card">
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="overline"
                >
                    {title}
                </Typography>
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    {body}
                </Typography>
                </Grid>
                <Grid item>
                <Avatar
                    sx={{
                    backgroundColor: 'primary.main',
                    height: 56,
                    width: 56
                    }}
                >
                    {icon}
                </Avatar>
                </Grid>
            </Grid>
            <Box
                sx={{
                pt: 2,
                display: 'flex',
                alignItems: 'center'
                }}
            >
                <Typography
                color="textSecondary"
                variant="caption"
                >
                {subtitle}
                </Typography>
            </Box>
        </CardContent>
    )
}
