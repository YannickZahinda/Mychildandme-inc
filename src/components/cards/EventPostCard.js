import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import moment from 'moment'
import useAuth from '../hooks/useAuth'
import SuccessModal from '../modals/SuccessModal'
import ErrorModal from '../modals/ErrorModal'
import volunteerService from '../../api/services/vonlunteerService'
import VolunteerBiographyModal from '../modals/VolunteerBiographyModal'
import CreateVolunteerModal from '../modals/CreateVolunteerModal'

const EventPostCard = ({
  eventId,
  title,
  summary,
  startTime,
  endTime,
  isAccepting,
  maxParticipant,
  images,
  isApplied,
  setChangeCount,
}) => {
  const { auth } = useAuth()
  const volunteerApi = volunteerService()
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [successModalMessage, setSuccessModalMessage] = useState({
    modalTitle: '',
    modalContent: '',
  })

  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorModalMessage, setErrorModalMessage] = useState({
    modalTitle: '',
    modalContent: '',
  })

  const [biographyModalVisible, setBiographyModalVisible] = useState(false)
  const [createVolunteerModalVisible, setCreateVolunteerModalVisible] = useState(false)

  const memberApplyEvent = async (biography) => {
    try {
      const data = {
        account_id: auth?.userId,
        event_id: eventId,
      }
      if (biography) {
        data.biography = biography
      }
      await volunteerApi.memberApplyEvent(JSON.stringify(data))
      setSuccessModalMessage((prevSuccessModal) => ({
        ...prevSuccessModal,
        modalTitle: 'Success!',
        modalContent: 'Successfully registered for the volunteer event',
      }))
      setChangeCount((prevChangeCount) => setChangeCount(prevChangeCount + 1))
      setSuccessModalVisible(true)
    } catch (error) {
      console.log(error)
      if (error.status === 408) {
        setBiographyModalVisible(true)
      } else {
        setErrorModalMessage((prevModalError) => ({
          ...prevModalError,
          modalTitle: 'Error',
          modalContent: 'An error occurred, please try again later',
        }))
        setErrorModalVisible(true)
      }
    }
  }

  const createVolunteer = async (formData) => {
    try {
      const data = {
        event_id: eventId,
        ...formData,
      }
      console.log(data)
      await volunteerApi.createVolunteer(JSON.stringify(data))
      setCreateVolunteerModalVisible(false)
      setSuccessModalMessage((prevSuccessModal) => ({
        ...prevSuccessModal,
        modalTitle: 'Success!',
        modalContent: 'Successfully registered for the volunteer event',
      }))
      setSuccessModalVisible(true)
    } catch (error) {
      console.log(error)
      setErrorModalMessage((prevModalError) => ({
        ...prevModalError,
        modalTitle: 'Error',
        modalContent: 'An error occurred, please try again later',
      }))
      setErrorModalVisible(true)
    }
  }

  const handleApplyBtnClick = () => {
    if (auth?.userId) {
      memberApplyEvent()
    } else {
      setCreateVolunteerModalVisible(true)
    }
  }
  
  return (
    <>
      <CreateVolunteerModal
        isVisible={createVolunteerModalVisible}
        setVisible={setCreateVolunteerModalVisible}
        handleSubmit={createVolunteer}
      />
      <VolunteerBiographyModal
        isVisible={biographyModalVisible}
        setVisible={setBiographyModalVisible}
        handleSubmit={memberApplyEvent}
      />
      <SuccessModal
        modalMessage={successModalMessage}
        isVisible={successModalVisible}
        setVisible={setSuccessModalVisible}
      />
      <ErrorModal
        modalMessage={errorModalMessage}
        isVisible={errorModalVisible}
        setVisible={setErrorModalVisible}
      />
      <div className="blog-content">
        <div className="blog-item blog-item1 mb-0">
          <div className="row">
            <div className="col-md-5 mb-2">
              <div className="blog-img">
                <Carousel
                  className="crsl"
                  centerSlidePercentage={100}
                  showArrows={false}
                  showIndicators={false}
                  showStatus={false}
                  infiniteLoop
                  swipeable
                  transitionTime={700}
                  centerMode
                  interval={5000}
                >
                  {images?.map((image, index) => (
                    <img className="cursor-pointer" key={index} src={image} alt="" />
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="col-md-7 vol-event-card-content">
              <div className="vol-event-card-header row justify-content-between m-0">
                <div className="p-0">
                  <div className="vol-event-time">
                    Date {moment(startTime).format('DD-MM-YYYY hh:mm A')} ~{' '}
                    {moment(endTime).format('DD-MM-YYYY hh:mm A')}
                  </div>
                </div>
                <div className="p-0">
                  <div className="vol-event-time">
                    {isApplied
                      ? 'You have registered for this event'
                      : isAccepting
                      ? 'Accepting participation'
                      : 'Volunteer spots are full'}
                  </div>
                </div>
              </div>
              <h3 className="vol-event-title">{title}</h3>
              <div className="dashed-line"></div>
              <div className="vol-event-label">
                <span className="vol-event-summary">
                  <b className="vol-event-summary-b">Event Overview:</b> {summary}
                </span>
              </div>
              <div className="vol-event-label">
                <span className="vol-event-summary">
                  <b className="vol-event-summary-b">Number of participants:</b> {maxParticipant} Volunteers.
                </span>
              </div>
              <div className="d-flex gap-3 vol-event-btn-group">
                <button
                  className="vol-event-btn"
                  disabled={isApplied}
                  onClick={handleApplyBtnClick}
                >
                  Register to participate
                </button>
                <NavLink to={'./' + eventId}>
                  <button className="vol-event-btn">View details</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventPostCard
