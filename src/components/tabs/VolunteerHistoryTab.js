import React, { Fragment, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import avatarman from 'src/assets/images/avatar-profile-man.jpg'
import moment from 'moment'
import accountService from 'src/api/services/accountService'

const VolunteerHistoryTab = ({ accountId }) => {
  const accountApi = accountService()
  const [events, setEvents] = useState([])
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await accountApi.getVolunteerEventHistory(accountId)
        setEvents(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    accountId && getEvents()
  }, [accountId])
  return (
    <>
      <div className="container account-container">
        <div className="row account-wrapper">
          <div className="col-lg-12">
            <div className="mt-5">
              <h4 className="event-headline text-bold mt-5 mb-3">
                Lịch sử đăng ký sự kiện tình nguyện
              </h4>
              {events?.length > 0 &&
                events?.map((ev, index) => (
                  <Fragment key={index}>
                    <div className="row justify-content-between volunteer-history-card">
                      <div className="col-lg-5 p-0">
                        <img src={ev?.image} className="article-detail-img"></img>
                      </div>
                      <div className="col-lg-7 col-md-12 p-0">
                        <div className="volunteer-history-box ">
                          <table>
                            <tbody>
                              <tr>
                                <th>Ngày đăng ký</th>
                                <td>{moment(ev?.register_time).format('DD/MM/YYYY')}</td>
                              </tr>
                              <tr>
                                <th>Sự kiện</th>
                                <td>{ev?.title}</td>
                              </tr>
                              <tr>
                                <th>Thời gian</th>
                                <td>
                                  {moment(ev?.event_start_date).format('DD/MM/YYYY')} ~{' '}
                                  {moment(ev?.event_end_date).format('DD/MM/YYYY')}
                                </td>
                              </tr>
                              <tr>
                                <th>Nội dung</th>
                                <td>
                                  <span className="text-line-3">{ev?.summary}</span>
                                </td>
                              </tr>
                              <tr>
                                <th>Trạng thái</th>
                                <td>{ev?.apply_status}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {index < events.length - 1 && <div className="solid-line"></div>}
                  </Fragment>
                ))}
              {/* <div className="d-flex justify-content-between">
                <div className="col-5 p-0">
                  <img
                    src={
                      'https://media.licdn.com/dms/image/D5612AQG9kyNA_gJKQA/article-cover_image-shrink_720_1280/0/1654793377068?e=2147483647&v=beta&t=X4oj21kQQkDtBQW2_94Q0_9Y7tIhUFL69U9ltjkD9RY'
                    }
                    className="article-detail-img"
                    alt=""
                  ></img>
                </div>
                <div className="col-7 p-0">
                  <div className="volunteer-history-box ">
                    <table>
                      <tbody>
                        <tr>
                          <th>Ngày đăng ký</th>
                          <td>20/12/12</td>
                        </tr>
                        <tr>
                          <th>Sự kiện</th>
                          <td>
                            Tình nguyện viên ơi, hãy cùng chung tay mang đến một Giáng sinh ấm áp
                            cho trẻ em mồ côi
                          </td>
                        </tr>
                        <tr>
                          <th>Thời gian</th>
                          <td>Ngày 22-12-2023 12:00 AM ~ 31-12-2023 12:00 AM</td>
                        </tr>
                        <tr>
                          <th>Nội dung</th>
                          <td>
                            <span className="text-line-3">
                              Trại trẻ mồ côi là nơi nuôi dưỡng, chăm sóc những đứa trẻ không có cha
                              mẹ. Trong dịp Giáng sinh sắp tới, trại trẻ mồ côi cần rất nhiều sự
                              giúp đỡ của các tình nguyện viên để mang đến một Giáng sinh ấm áp cho
                              các em.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>Trạng thái</th>
                          <td>Đã xác nhận</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="solid-line"></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VolunteerHistoryTab
