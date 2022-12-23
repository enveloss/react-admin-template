import React from 'react'
import { required } from 'react-admin';

import {
	RichTextInput,
	RichTextInputToolbar,
	FormatButtons,
	ClearButtons,
    LinkButtons
} from 'ra-input-rich-text';

export default function RichTextEditor({ source, validate=[required()], size="medium" }) {
    return (
        <RichTextInput source={source} validate={validate} toolbar={
            <RichTextInputToolbar>
                <FormatButtons size={size} />
                <ClearButtons size={size} />
                <LinkButtons size={size} />
            </RichTextInputToolbar>
        }/>
    )
}
