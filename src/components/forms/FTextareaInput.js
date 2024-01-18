import React from 'react'
import PropTypes from 'prop-types'
import { CFormFeedback, CFormLabel, CFormTextarea } from '@coreui/react'

const FTextareaInput = ({ id, label, value, onChange, rows, invalid, errorMessage }) => {
  return (
    <>
      <CFormTextarea id={id} value={value} onChange={onChange} rows={rows} invalid={invalid} />
      <CFormFeedback invalid>{errorMessage}</CFormFeedback>
    </>
  )
}

FTextareaInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  invalid: PropTypes.bool,
  errorMessage: PropTypes.string,
}

FTextareaInput.defaultProps = {
  rows: 3,
  invalid: false,
}

export { FTextareaInput }
