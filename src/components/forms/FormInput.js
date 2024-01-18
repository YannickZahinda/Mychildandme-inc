import React from 'react'
import { FSelectInput } from './FSelectInput'
import { FFileInput } from './FFileInput'
import PropTypes from 'prop-types'
import { FInput } from './FInput'
import { CCol, CFormFeedback, CFormLabel } from '@coreui/react'
import { FMultiSelectInput } from './FMiltiSelectInput'
import { FRadioInput } from './FRadioInput'
import { FTextareaInput } from './FTextareaInput'

const inputComponents = {
  select: FSelectInput,
  multiselect: FMultiSelectInput,
  file: FFileInput,
  radio: FRadioInput,
  textarea: FTextareaInput,
  default: FInput,
}

const FormInput = ({ ...props }) => {
  const type = props.type
  const xsCol = props.xsCol

  const { id, label } = props
  const Component = inputComponents[type] || inputComponents.default
  return (
    // <CCol xs={xsCol}>

    <>
      {props.formLabel && <CFormLabel htmlFor={id}>{label}</CFormLabel>}
      <Component {...props} />
    </>
    // </CCol>
  )
}

export default FormInput
