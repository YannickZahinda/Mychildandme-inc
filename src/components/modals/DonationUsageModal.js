import React from 'react'
import {
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
} from '@coreui/react'
import numeral from 'numeral'
import moment from 'moment'

const DonationUsageModal = ({ isVisible, setVisible, donation }) => {
  return (
    <CModal alignment="center" visible={isVisible} onClose={() => setVisible(false)} size="xl">
      <CModalHeader>
        <CModalTitle>
          <h3>Chi tiết sử dụng tài trợ</h3>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol md={12} className="mb-4">
            <CRow>
              <CCol md={4} className="d-flex ">
                <div className="col-6 p-0 text-dark text-bold">Số tiền tài trợ:</div>
                <div>
                  <span className="text-nowrap">
                    {numeral(donation?.amount).format('0,0₫')} VND
                  </span>
                </div>
              </CCol>
              <CCol md={4} className="d-flex ">
                <div className="col-6 p-0 text-dark text-bold">Số tiền đã sử dụng:</div>
                <div>
                  <span className="text-nowrap">
                    {numeral(donation?.used_amount).format('0,0₫')} VND
                  </span>
                </div>
              </CCol>
              <CCol md={4} className="d-flex ">
                <div className="col-6 p-0 text-dark text-bold">Số tiền còn lại:</div>
                <div>
                  <span className="text-nowrap">
                    {numeral(donation?.remaining_amount).format('0,0₫')} VND
                  </span>
                </div>
              </CCol>
            </CRow>
          </CCol>
          {donation?.donation_usages?.length > 0 && (
            <CCol md={12}>
              <h5>Lịch sử sử dụng tài trợ</h5>
              <CTable bordered responsive>
                <CTableHead>
                  <tr>
                    <th>#</th>
                    <th>Thời gian</th>
                    <th>Số tiền</th>
                    <th>Phân bổ đến gia đình</th>
                    <th>Chi tiết</th>
                  </tr>
                </CTableHead>
                <CTableBody>
                  {donation?.donation_usages.map((usage, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{moment(usage?.usage_time).format('DD/MM/YYYY HH:mm:ss')}</td>
                      <td>{numeral(usage.amount).format('0,0₫')} VND</td>
                      <td>{usage?.family?.family_name || '###'}</td>
                      <td>{usage?.usage_note}</td>
                    </tr>
                  ))}
                </CTableBody>
              </CTable>
            </CCol>
          )}
        </CRow>
      </CModalBody>
    </CModal>
  )
}

export default DonationUsageModal
