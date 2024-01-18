import {
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CFormLabel,
  CHeader,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
} from '@coreui/react'
import React from 'react'
import { useState } from 'react'
import { donationApi } from 'src/api/services'
import { NumericFormat } from 'react-number-format'
import numeral from 'numeral'
import moment from 'moment/moment'
import { NavLink } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import DonationUsageModal from '../modals/DonationUsageModal'

const DonationTracking = () => {
  const [donations, setDonations] = useState([])
  const [donationHash, setDonationHash] = useState('')
  const [donorToken, setDonorToken] = useState('')

  const [donationUsageDetailVisible, setDonationUsageDetailVisible] = useState(false)
  const [donationDetail, setDonationDetail] = useState(null)

  const handleSearchBtnClick = async () => {
    if (donationHash) {
      try {
        const response = await donationApi.getDonationByDonationHash(donationHash)
        const arr = []
        arr.push(response.result)
        setDonations(arr)
      } catch (error) {
        console.log(error)
        setDonations([])
      }
    } else if (donorToken) {
      try {
        const response = await donationApi.getDonationsByDonorToken(donorToken)
        setDonations(response.result)
      } catch (error) {
        console.log(error)
        setDonations([])
      }
    }
  }

  return (
    <>
      <DonationUsageModal
        isVisible={donationUsageDetailVisible}
        setVisible={setDonationUsageDetailVisible}
        donation={donationDetail}
      />
      <section className="contact-form-area register-area pt-5">
        <div className="container">
          <div className="form-shared-wrap">
            <div className="text-center">
              <h1 className="h1__form__title">Kiểm tra thông tin tài trợ của bạn</h1>
            </div>
            <h3 className="h__form__title">Nhập</h3>
            <CRow className="m-0 pr-0">
              <CCol className="p-0">
                <CFormInput
                  type="text"
                  placeholder="Mã tài trợ"
                  value={donationHash}
                  onChange={(e) => setDonationHash(e.target.value)}
                  disabled={donorToken}
                />
              </CCol>
              <CCol md={1} className="p-0 d-flex align-items-center justify-content-center">
                Hoặc
              </CCol>
              <CCol className="p-0">
                <CFormInput
                  type="text"
                  placeholder="Mã nhà tài trợ"
                  value={donorToken}
                  onChange={(e) => setDonorToken(e.target.value)}
                  disabled={donationHash}
                />
              </CCol>
              <CCol lg={2} className="p-0 d-flex align-items-center justify-content-end">
                <button
                  className="donate-amount-btn-active"
                  disabled={!donationHash && !donorToken}
                  onClick={handleSearchBtnClick}
                >
                  Kiểm tra
                </button>
              </CCol>
            </CRow>
            {donations?.length > 0 && (
              <div className="mt-5">
                <h3 className="h__form__title mb-1">Danh sách tài trợ</h3>
                <CTable bordered responsive>
                  <CTableHead>
                    <tr>
                      <th>#</th>
                      <th>Tên nhà tài trợ</th>
                      <th>Số tiền</th>
                      <th>Thời gian</th>
                      <th>Chiến dịch tài trợ</th>
                      <th>Gia đình nhận tài trợ</th>
                      <th></th>
                    </tr>
                  </CTableHead>
                  <CTableBody>
                    {donations.map((donation, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{donation?.donor_name}</td>
                        <td>{numeral(donation.amount).format('0,0₫')} VND</td>
                        <td>{moment(donation?.donation_time).format('DD/MM/YYYY HH:mm:ss')}</td>
                        <td>{donation?.purpose}</td>
                        <td>{donation?.family?.family_name || '###'}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <CDropdown variant="btn-group">
                              <CDropdownToggle
                                custom
                                style={{ background: 'transparent', border: 'none' }}
                              >
                                <button
                                  type="button"
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                  }}
                                >
                                  <CIcon icon={cilOptions} size="lg" />
                                </button>
                              </CDropdownToggle>
                              <CDropdownMenu>
                                <NavLink
                                  className="text-nodecorate"
                                  to="#"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setDonationDetail(donation)
                                    setDonationUsageDetailVisible(true)
                                  }}
                                >
                                  <CDropdownItem>Trạng thái sử dụng tài trợ</CDropdownItem>
                                </NavLink>
                              </CDropdownMenu>
                            </CDropdown>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default DonationTracking
