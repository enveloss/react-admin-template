import React from 'react'
import { useRedirect } from 'react-admin'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SxProps } from '@mui/system'

import FolderIcon from '@mui/icons-material/Folder';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {
    title: string,
    subCategories: Array<any>,
    subItems: Array<any>,
    refCategoryId: number,
    previousRefCategory: number,
    openCategory: (categoryId: number) => void,
    openItem: (itemid: number) => void,
}

/*
@param title - title of the table
@param subCategories - is array of categories
@param subItems - is array of products 
@param refCategoryid - is id of ref category
@param previousRefCategory - is id of previous category
@param openCategory\openProduct - func to open the item
*/
export default function SubFoldersTable({ title, subCategories, subItems, refCategoryId, previousRefCategory, openCategory, openItem }: Props) {
    const redirect = useRedirect()

    const iconSX: SxProps = {verticalAlign: 'bottom', margin: '0 10px'}
    const rowSX: SxProps = { '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{title}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(refCategoryId !== 0)  &&
                    <TableRow 
                        onClick={() => redirect('list', 'categories', undefined, undefined, {refCategoryId: previousRefCategory})} 
                        sx={{cursor: 'pointer'}}
                        hover
                    >
                        <TableCell>
                            <ArrowBackIcon sx={iconSX}/>
                        </TableCell>
                    </TableRow>
                    }
                    {subCategories.map((category, index) => (
                        <TableRow
                            key={index}
                            sx={rowSX}
                            hover
                            onClick={() => {openCategory(category.id)}}
                        >
                            <TableCell><FolderIcon sx={iconSX}/>{category.name}</TableCell>
                        </TableRow>
                    ))}
                    {subItems.map((item, index) => (
                        <TableRow
                            key={index}
                            sx={rowSX}
                            hover
                            onClick={() => openItem(item.id)}
                        >
                            <TableCell><Inventory2Icon sx={iconSX}/>{item.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
