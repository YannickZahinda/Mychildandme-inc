import React from 'react'
import PropTypes from 'prop-types'
import { CCol, CFormFeedback, CFormInput, CFormLabel } from '@coreui/react'

const FInput = ({ type, id, label, name, onChange, value, invalid, errorMessage, readOnly }) => {
  return (
    <>
      <CFormInput
        type={type}
        id={id}
        value={value}
        name={name}
        placeholder={label}
        onChange={onChange}
        autoComplete="new-password"
        invalid={invalid}
        readOnly={readOnly}
      />
      <CFormFeedback invalid>{errorMessage}</CFormFeedback>
    </>
  )
}
FInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  invalid: PropTypes.bool,
  errorMessage: PropTypes.string,
}

FInput.defaultProps = {
  invalid: false,
  readOnly: false,
}

export { FInput }
