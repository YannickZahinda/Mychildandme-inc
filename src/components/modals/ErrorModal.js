import React from 'react'
import PropTypes from 'prop-types'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilXCircle } from '@coreui/icons'
import { FaRegTimesCircle } from 'react-icons/fa'

const ErrorModal = ({ isVisible, setVisible, modalMessage }) => {
  return (
    <CModal visible={isVisible} onClose={() => setVisible(false)}>
      <CModalHeader className="justify-content-start align-items-center gap-2">
        <FaRegTimesCircle size="25px" />
        <CModalTitle>{modalMessage?.modalTile}</CModalTitle>
      </CModalHeader>
      <CModalBody>{modalMessage?.modalContent}</CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={() => setVisible(false)}>
          OK
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

ErrorModal.propTypes = {
  isVisible: PropTypes.bool,
  setVisible: PropTypes.func,
  modalMessage: PropTypes.shape({
    modalTile: PropTypes.string,
    modalContent: PropTypes.node,
  }),
}

export default ErrorModal
