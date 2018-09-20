import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import * as React from 'react'
import { SFC } from 'react'

export type TextInputProps = TextFieldProps

const TextInput: SFC<TextInputProps> = props => <TextField {...props} />

export default TextInput
