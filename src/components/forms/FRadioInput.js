import React from 'react'
import PropTypes from 'prop-types'
import { CFormLabel, CFormCheck, CFormFeedback } from '@coreui/react'

const FRadioInput = ({ id, label, value, onChange, options, invalid, errorMessage }) => {
  return (
    <>
      {options.map((option) => (
        <CFormCheck
          inline
          key={option.value}
          id={`${id}_${option.value}`}
          name={id}
          label={option.label}
          value={option.value}
          checked={value == option.value}
          onChange={onChange}
          invalid={invalid}
        />
      ))}
      <CFormFeedback invalid>{errorMessage}</CFormFeedback>
    </>
  )
}

FRadioInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  invalid: PropTypes.bool,
  errorMessage: PropTypes.string.isRequired,
}
FRadioInput.defaultProps = {
  invalid: false,
}

export { FRadioInput }
