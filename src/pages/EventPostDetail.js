import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { postApi } from 'src/api/services'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import moment from 'moment'
import EventDetailCard from 'src/components/cards/EventDetailCard'
import img from 'src/assets/images/volunteer.jpg'
import useAuth from 'src/components/hooks/useAuth'
import volunteerService from 'src/api/services/vonlunteerService'
import VolunteerBiographyModal from 'src/components/modals/VolunteerBiographyModal'
import SuccessModal from 'src/components/modals/SuccessModal'
import ErrorModal from 'src/components/modals/ErrorModal'
import CreateVolunteerModal from 'src/components/modals/CreateVolunteerModal'

const EventPostDetailPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState()
  const { auth } = useAuth()
  const [applyState, setApplyState] = useState(false)

  const volunteerApi = volunteerService()
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [successModalMessage, setSuccessModalMessage] = useState({
    modalTile: '', // "Modal Title"
    modalContent: '', // "Modal Content"
  })

  const [errormodalVisible, setErrorModalVisible] = useState(false)
  const [errorModalMessage, setErrorModalMessage] = useState({
    modalTile: 'Error',
    modalContent: 'An error occurred, please try again later',
  })

  const [biographyModalVisible, setBiographyModalVisible] = useState(false)
  const [createVolunteerModalVisible, setCreateVolunteerModalVisible] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      try {
        const params = {}
        if (auth?.userId) {
          params.accountId = auth?.userId
        }
        const response = await postApi.getEventPostDetail(id, { params })
        setPost(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    id && !applyState && getPost()
    applyState && getPost()
  }, [id, applyState])

  const memberApplyEvent = async (biography) => {
    try {
      const data = {
        account_id: auth?.userId,
        event_id: post?.event_id,
      }
      if (biography) {
        data.biography = biography
      }
      await volunteerApi.memberApplyEvent(JSON.stringify(data))
      setSuccessModalMessage((prevSuccessModal) => ({
        ...prevSuccessModal,
        modalTile: 'Success!',
        modalContent: 'Successfully registered to participate in the volunteer event',
      }))
      setApplyState(true)
      setSuccessModalVisible(true)
    } catch (error) {
      console.log(error)
      if (error.status === 408) {
        setBiographyModalVisible(true)
      } else {
        setErrorModalMessage((prevModalError) => ({
          ...prevModalError,
          modalTile: 'Error',
          modalContent: 'An error occurred, please try again later',
        }))
        setErrorModalVisible(true)
      }
    }
  }

  const createVolunteer = async (formData) => {
    try {
      const data = {
        event_id: post.event_id,
        ...formData,
      }
      console.log(data)
      await volunteerApi.createVolunteer(JSON.stringify(data))
      setCreateVolunteerModalVisible(false)
      setSuccessModalMessage((prevSuccessModal) => ({
        ...prevSuccessModal,
        modalTile: 'Success!',
        modalContent: 'Successfully registered to participate in the volunteer event',
      }))
      setSuccessModalVisible(true)
    } catch (error) {
      console.log(error)
      setErrorModalMessage((prevModalError) => ({
        ...prevModalError,
        modalTile: 'Error',
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
      <VolunteerBiographyModal
        isVisible={biographyModalVisible}
        setVisible={setBiographyModalVisible}
        handleSubmit={memberApplyEvent}
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
      <CreateVolunteerModal
        isVisible={createVolunteerModalVisible}
        setVisible={setCreateVolunteerModalVisible}
        handleSubmit={createVolunteer}
      />
      <section className="donation-banner-area" style={{ backgroundImage: 'url(' + img + ')' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">Volunteer</h1>
              <h4 className="text__white">
                We are looking for compassionate souls who want to make a positive change in the lives of orphaned children. Become a volunteer at the orphanage to share love and create meaningful memories for these children, helping them build a hopeful and promising future.
              </h4>
            </div>
          </div>
        </div>
      </section>
      <section className="causes-detail-area  pt-5">
        <div className="container">
          <div className="row blog-content-wrap">
            <div className="col-lg-12 mb-3">
              <div className="blog-content">
                <div className="blog-item">
                  <h3 className="vol-event-title event-headline mb-3">{post?.title}</h3>
                  <div className="blog-img mb-3">
                    <img className="vol-event-img" src={post?.banner_image} alt="" />
                  </div>
                  <div className="vol-event-card-header d-flex gap-3">
                    <div className="vol-event-time">
                      Date {moment(post?.event_start_date).format('DD-MM-YYYY hh:mm A')} ~{' '}
                      {moment(post?.event_end_date).format('DD-MM-YYYY hh:mm A')}
                    </div>
                    <div className="vol-event-time">
                      {post?.is_applied
                        ? 'You have registered for this event'
                        : post?.is_accepting
                        ? 'Accepting participants'
                        : 'Volunteer slots are full'}
                    </div>
                  </div>
                  <div className="vol-event-label">
                    <span className="vol-event-summary">
                      <b className="vol-event-summary-b">Event Overview:</b> {post?.summary}
                    </span>
                  </div>
                  <div className="vol-event-label">
                    <span className="vol-event-summary">
                      <b className="vol-event-summary-b">Number of participants:</b>{' '}
                      {post?.event_maximum_participant} Volunteers.
                    </span>
                  </div>
                  <div className="d-flex gap-3 vol-event-btn-group">
                    <button
                      className="vol-event-btn"
                      disabled={post?.is_applied}
                      onClick={handleApplyBtnClick}
                    >
                      Register to participate
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 mt-5">
              <h3 className="vol-event-title event-headline mb-0">Detailed Content</h3>
              <div className="solid-line"></div>
              {post?.event_details?.map((eventDetail, index) => (
                <Fragment key={index}>
                  <EventDetailCard
                    headline={eventDetail?.headline}
                    contents={eventDetail?.contents}
                    image={eventDetail?.image}
                    reverse={index % 2 === 0 ? false : true}
                  />
                  {index !== post?.event_details?.length - 1 && <div className="solid-line"></div>}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default EventPostDetailPage
