import React from 'react'
import PropTypes from 'prop-types'
import { CFormFeedback, CFormInput, CFormLabel } from '@coreui/react'

const FFileInput = ({ id, label, onChange, invalid, errorMessage, ...props }) => {
  return (
    <>
      <CFormInput type="file" id={id} onChange={onChange} invalid={invalid} props />
      <CFormFeedback invalid>{errorMessage}</CFormFeedback>
    </>
  )
}
FFileInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  errorMessage: PropTypes.string,
}

FFileInput.defaultProps = {
  invalid: false,
}

export { FFileInput }
