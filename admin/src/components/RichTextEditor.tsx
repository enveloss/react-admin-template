import React from 'react'
import { required, Validator } from 'react-admin';

import {
	RichTextInput,
	RichTextInputToolbar,
	FormatButtons,
	ClearButtons,
    LinkButtons
} from 'ra-input-rich-text';

type Props = {
    source: string,
    validate:  Validator | Validator[] | undefined,
    size?: "small" | "medium" | "large" | undefined 
}

export default function RichTextEditor({ source, validate, size }: Props) {
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
