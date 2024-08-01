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
                Volunteer Event Registration History
              </h4>
              {events?.length > 0 &&
                events?.map((ev, index) => (
                  <Fragment key={index}>
                    <div className="row justify-content-between volunteer-history-card">
                      <div className="col-lg-5 p-0">
                        <img src={ev?.image} className="article-detail-img" alt="Event" />
                      </div>
                      <div className="col-lg-7 col-md-12 p-0">
                        <div className="volunteer-history-box ">
                          <table>
                            <tbody>
                              <tr>
                                <th>Registration Date</th>
                                <td>{moment(ev?.register_time).format('DD/MM/YYYY')}</td>
                              </tr>
                              <tr>
                                <th>Event</th>
                                <td>{ev?.title}</td>
                              </tr>
                              <tr>
                                <th>Time</th>
                                <td>
                                  {moment(ev?.event_start_date).format('DD/MM/YYYY')} ~{' '}
                                  {moment(ev?.event_end_date).format('DD/MM/YYYY')}
                                </td>
                              </tr>
                              <tr>
                                <th>Content</th>
                                <td>
                                  <span className="text-line-3">{ev?.summary}</span>
                                </td>
                              </tr>
                              <tr>
                                <th>Status</th>
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
                  />
                </div>
                <div className="col-7 p-0">
                  <div className="volunteer-history-box ">
                    <table>
                      <tbody>
                        <tr>
                          <th>Registration Date</th>
                          <td>20/12/12</td>
                        </tr>
                        <tr>
                          <th>Event</th>
                          <td>
                            Volunteers, let's come together to bring a warm Christmas to orphaned children
                          </td>
                        </tr>
                        <tr>
                          <th>Time</th>
                          <td>22-12-2023 12:00 AM ~ 31-12-2023 12:00 AM</td>
                        </tr>
                        <tr>
                          <th>Content</th>
                          <td>
                            <span className="text-line-3">
                              An orphanage is a place that nurtures and takes care of children without parents. During the upcoming Christmas, the orphanage needs a lot of help from volunteers to bring a warm Christmas to the children.
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>Confirmed</td>
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
