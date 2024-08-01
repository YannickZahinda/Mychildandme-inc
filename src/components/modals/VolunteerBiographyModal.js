import React, { useEffect, useState } from 'react'
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'

const VolunteerBiographyModal = ({ isVisible, setVisible, handleSubmit }) => {
  const [biography, setBiography] = useState('')
  return (
    <CModal
      backdrop="static"
      alignment="center"
      size="lg"
      visible={isVisible}
      onClose={() => setVisible()}
    >
      <CModalHeader className="border-0 pb-0">
        <CModalTitle>
          <p>
            <small>
              <i>
                Since this is your first time registering as a volunteer, please fill out the information below to complete the registration.
              </i>
            </small>
          </p>
        </CModalTitle>
      </CModalHeader>
      <CModalBody className="">
        <div className="text-dark"></div>
        <div className="mt-3">
          <div className="text-dark mb-3 event-headline">Personal Biography</div>
          <div className="form-shared">
            <form action="#">
              <div className="form-group w-100">
                <textarea
                  className="textarea h-auto w-100 p-3"
                  value={biography}
                  name="message"
                  placeholder="Hãy mô tả về bản thân bạn để giúp chúng tôi đánh giá bạn có phù hợp hay không tham gia hoạt động tình nguyện."
                  rows={8}
                  onChange={(e) => setBiography(e.target.value)}
                ></textarea>
              </div>
            </form>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="main-btn"
            onClick={() => {
              handleSubmit(biography)
              setVisible(false)
            }}
          >
            SEND
          </button>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default VolunteerBiographyModal
