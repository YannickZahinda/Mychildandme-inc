import React from 'react'
import PropTypes from 'prop-types'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { FaRegCheckCircle } from 'react-icons/fa'

const SuccessModal = ({ isVisible, setVisible, modalMessage, size, onConfirmClick }) => {
  return (
    <CModal visible={isVisible} onClose={() => setVisible(false)} size={size || 'md'}>
      <CModalHeader>
        <FaRegCheckCircle size="25px" />
        <CModalTitle>{modalMessage?.modalTile}</CModalTitle>
      </CModalHeader>
      <CModalBody>{modalMessage?.modalContent}</CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={() => {
            onConfirmClick ? onConfirmClick() : setVisible(false)
          }}
        >
          OK
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default SuccessModal
