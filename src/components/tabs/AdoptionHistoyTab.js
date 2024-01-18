import React, { useEffect, useState } from 'react'
import { CButton, CLink, CTable, CTableBody, CTableHead } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDataTransferDown } from '@coreui/icons'
import accountService from 'src/api/services/accountService'
import moment from 'moment'

const AdoptionHistoryTab = ({ accountId }) => {
  const accountApi = accountService()
  const [applications, setApplications] = useState(null)
  useEffect(() => {
    const getApplications = async () => {
      try {
        const response = await accountApi.getAdoptionApplicationHistory(accountId)
        setApplications(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    accountId && getApplications()
  }, [accountId])
  return (
    <>
      <div className="container account-container">
        <div className="row account-wrapper">
          <div className="col-lg-12">
            <div className=" mt-5">
              <h4 className="event-headline text-bold mt-5 mb-3">
                Lịch sử đăng ký nhận thông tin trẻ
              </h4>
              <CTable bordered responsive>
                <CTableHead>
                  <tr>
                    <th>STT</th>
                    <th>Ngày đăng ký</th>
                    <th>Hạn xử lý</th>
                    <th>Ngày xử lý</th>
                    <th>Trạng thái đơn đăng ký</th>
                    <th>Đơn đăng ký</th>
                    <th>Danh sách trẻ</th>
                  </tr>
                </CTableHead>
                <CTableBody>
                  {applications &&
                    applications?.map((application, index) => (
                      <tr key={index}>
                        <td>#{index + 1}</td>
                        <td>{moment(application?.date_of_application).format('DD/MM/YYYY')}</td>
                        <td>{moment(application?.deadline_date).format('DD/MM/YYYY')}</td>
                        <td>
                          {application?.date_of_processing ? (
                            moment(application?.date_of_processing).format('DD/MM/YYYY')
                          ) : (
                            <>###</>
                          )}
                        </td>
                        <td>{application?.application_status}</td>
                        <td>
                          {application?.application_pdf_file_path ? (
                            <>
                              <CLink
                                href={application?.application_pdf_file_path}
                                className="text-nodecorate"
                              >
                                <CButton className="download-btn w-100">
                                  <div className="download-btn-2-content">Tải xuống</div>
                                  <CIcon size="sm" icon={cilDataTransferDown} />
                                </CButton>
                              </CLink>
                            </>
                          ) : (
                            <>###</>
                          )}
                        </td>
                        <td>
                          {application?.children_pdf_file_path ? (
                            <>
                              <CLink
                                href={application?.children_pdf_file_path}
                                className="text-nodecorate"
                              >
                                <CButton className="download-btn w-100">
                                  <div className="download-btn-2-content">Tải xuống</div>
                                  <CIcon size="sm" icon={cilDataTransferDown} />
                                </CButton>
                              </CLink>
                            </>
                          ) : (
                            <>###</>
                          )}
                        </td>
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

export default AdoptionHistoryTab
