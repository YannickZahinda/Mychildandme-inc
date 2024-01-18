import React, { useEffect, useState } from 'react'
import { CButton, CLink, CTable, CTableBody, CTableHead } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDataTransferDown } from '@coreui/icons'
import accountService from 'src/api/services/accountService'
import moment from 'moment'
import AppointmentModal from '../modals/AppoinmentModal'
import SuccessModal from '../modals/SuccessModal'
import ErrorModal from '../modals/ErrorModal'
import LoadingModal from '../modals/LoadingModal'

const AppointmentTab = ({ accountId }) => {
  const accountApi = accountService()
  const [appointments, setAppointments] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [pagination, setPagination] = useState({
    limit: 12,
    sortColumn: 'create_date_time',
    sortType: 'desc',
    page: 1,
  })
  const [isChanged, setChanged] = useState(false)
  const [appointmentModalVisible, setAppointmentModalVisible] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [successModalMessage, setSuccessModalMessage] = useState({
    modalTile: '',
    modalContent: '',
  })

  const [errormodalVisible, setErrorModalVisible] = useState(false)
  const [errorModalMessage, setErrorModalMessage] = useState({
    modalTile: '',
    modalContent: '',
  })

  const [loadingModalVisible, setLoadingModalVisible] = useState(false)

  useEffect(() => {
    const params = {
      limit: pagination.limit,
      sortColumn: pagination.sortColumn,
      sortType: pagination.sortType,
      page: page,
    }
    const getAppointments = async () => {
      try {
        const response = await accountApi.getAppointments(accountId, { params })
        setPage(response.result.page)
        setTotalPage(response.result.totalPage)
        setAppointments(response.result.records)
      } catch (error) {
        console.log(error)
      }
    }
    accountId && getAppointments()
  }, [accountId, isChanged])

  const handleAppointmentSubmit = async (data) => {
    setLoadingModalVisible(true)
    try {
      await accountApi.createAppointments(accountId, JSON.stringify(data))
      setLoadingModalVisible(false)
      setAppointmentModalVisible(false)
      setSuccessModalMessage((prevSuccessModal) => ({
        ...prevSuccessModal,
        modalTile: 'Thành công!',
        modalContent: 'Đăng ký lịch hẹn thành công',
      }))
      setSuccessModalVisible(true)
      setPage(1)
      setChanged(!isChanged)
    } catch (error) {
      console.log(error)
      setLoadingModalVisible(false)
      setErrorModalMessage((prevModalError) => ({
        ...prevModalError,
        modalTile: 'Lỗi',
        modalContent: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
      }))
      setErrorModalVisible(true)
    }
  }
  return (
    <>
      <AppointmentModal
        isVisible={appointmentModalVisible}
        setVisible={setAppointmentModalVisible}
        handleSubmit={handleAppointmentSubmit}
      />
      <SuccessModal
        modalMessage={successModalMessage}
        isVisible={successModalVisible}
        setVisible={setSuccessModalVisible}
      ></SuccessModal>
      <ErrorModal
        modalMessage={errorModalMessage}
        isVisible={errormodalVisible}
        setVisible={setErrorModalVisible}
      ></ErrorModal>
      <LoadingModal isVisible={loadingModalVisible} setVisible={setLoadingModalVisible} />
      <div className="container account-container">
        <div className="row account-wrapper">
          <div className="col-lg-12">
            <div className=" mt-5">
              <button className="vol-event-btn" onClick={() => setAppointmentModalVisible(true)}>
                Đăng ký lịch hẹn
              </button>
              <h4 className="event-headline text-bold mt-4 mb-3">Lịch sử đăng ký lịch hẹn</h4>
              <CTable bordered responsive>
                <CTableHead>
                  <tr>
                    <th>STT</th>
                    <th>Thời gian đăng ký</th>
                    <th>Thời gian hẹn</th>
                    <th>Số lượng </th>
                    <th>Chi tiết</th>
                    <th>Trạng thái</th>
                  </tr>
                </CTableHead>
                <CTableBody>
                  {appointments &&
                    appointments?.map((appointment, index) => (
                      <tr key={index}>
                        <td>#{index + 1}</td>
                        <td>{moment(appointment?.create_date_time).format('DD-MM-YYYY hh:mm')}</td>
                        <td>
                          {moment(appointment?.appointment_start_date_time).format(
                            'DD-MM-YYYY hh:mm',
                          )}{' '}
                          ~{' '}
                          {moment(appointment?.appointment_end_date_time).format(
                            'DD-MM-YYYY hh:mm',
                          )}
                        </td>
                        <td>{appointment?.attendees}</td>
                        <td>{appointment?.appointment_reason}</td>
                        <td>{appointment?.status}</td>
                      </tr>
                    ))}
                </CTableBody>
              </CTable>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppointmentTab
