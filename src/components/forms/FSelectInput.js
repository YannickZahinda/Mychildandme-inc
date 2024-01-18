import React from 'react'
import PropTypes from 'prop-types'
import { CCol, CFormFeedback, CFormLabel, CFormSelect, CInputGroup } from '@coreui/react'

const FSelectInput = ({
  id,
  label,
  value,
  name,
  onChange,
  options,
  invalid,
  errorMessage,
  readOnly,
}) => {
  // console.log(value)
  return (
    <>
      <CFormSelect
        id={id}
        name={name}
        onChange={onChange}
        defaultValue={value}
        invalid={invalid}
        disabled={readOnly}
      >
        {!value && (
          <option disabled selected>
            {label}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} selected={option.value == value}>
            {option.label}
          </option>
        ))}
      </CFormSelect>
      <CFormFeedback invalid>{errorMessage}</CFormFeedback>
    </>
  )
}

FSelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.any,
    }),
  ).isRequired,
  invalid: PropTypes.bool,
  errorMessage: PropTypes.any,
}

FSelectInput.defaultProps = {
  invalid: false,
  readOnly: false,
}

export { FSelectInput }
