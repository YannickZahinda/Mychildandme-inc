import React, { useState } from 'react'
import { publicApi } from 'src/api/services'
import { useEffect } from 'react'
import SpouseForm from './SpouseForm'
import { MaritalStatus } from 'src/constants/AdoptionCode'
import axios from 'axios'
import { fileToBinary } from 'src/utils/fileToBinary'
import ErrorModal from '../modals/ErrorModal'
import SuccessModal from '../modals/SuccessModal'
import accountService from 'src/api/services/accountService'
import AccountFirstApplicantForm from './AccountFirstApplicantForm'
import useAuth from '../hooks/useAuth'
import LoadingModal from '../modals/LoadingModal'
import AccountApplicantForm from './AccountApplicantForm'
import AccountSpouseForm from './AccountSpouseForm'

const AccountAdoptionForm = () => {
  const { auth } = useAuth()
  const accountApi = accountService()
  const [applicant, setApplicant] = useState({})
  const [citizenFrontImage, setCitizenFrontImage] = useState()
  const [citizenBackImage, setCitizenBackImage] = useState()
  const [spouse, setSpouse] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: null,
    ethnicity: '',
    nationality: '',
    religion: '',
    mail_address: '',
    phone_number: '',
    citizen_id_number: '',
    address: {
      province_id: null,
      district_id: null,
      ward_id: null,
      address_detail: '',
    },
  })

  const [changeSpouseState, setChangeSpouseState] = useState(false)
  const [spouseState, setSpouseState] = useState(false)
  const [applicantValid, setApplicantValid] = useState(false)
  const [spouseValid, setSpouseValid] = useState(true)
  const [formValid, setFormValid] = useState(true)

  const [reason, setReason] = useState('')

  const [formData, setFormData] = useState({
    account_id: auth?.userId,
    reason: '',
  })

  const [citizenImage, setCitizenImage] = useState({
    front_image: {
      image_file_name: '',
      image_file_path: '',
    },
    back_image: {
      image_file_name: '',
      image_file_path: '',
    },
  })

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
  const [done, setDone] = useState(false)

  useEffect(() => {
    const getApplicantInfo = async () => {
      try {
        const response = await accountApi.getAccountAdoptionInfo(auth?.userId)
        setApplicant(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    auth?.userId && getApplicantInfo()
  }, [auth])

  useEffect(() => {
    setChangeSpouseState(false)
    if (applicant.marital_status_id == MaritalStatus.married.code) {
      setSpouse({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: null,
        ethnicity: '',
        nationality: '',
        religion: '',
        mail_address: '',
        phone_number: '',
        citizen_id_number: '',
        address: {
          province_id: null,
          district_id: null,
          ward_id: null,
          address_detail: '',
        },
      })
      setSpouseState(true)
      setSpouseValid(false)
    } else {
      setSpouseState(false)
      setSpouseValid(true)
    }
  }, [formData.marital_status_id])

  const handleChangeSpouse = (e) => {
    setChangeSpouseState(e.target.checked)
  }

  useEffect(() => {
    // setFormValid(applicantValid && spouseValid && reason)
    setFormValid(true)
  }, [applicantValid, spouseValid, reason])

  const handleReasonChange = (e) => {
    setFormData({
      ...formData,
      reason: e.target.value,
    })
  }

  const uploadToS3 = async (presignedUrl, file) => {
    const binaryData = await fileToBinary(file)
    try {
      await axios.put(presignedUrl, binaryData, {
        headers: {
          'Content-Type': file.type,
        },
      })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  const handleUploadImage = async () => {
    try {
      const presignedResponses = await Promise.all([
        publicApi.getPresignedUrl(citizenFrontImage.name, 'images'),
        publicApi.getPresignedUrl(citizenBackImage.name, 'images'),
      ])

      try {
        const s3Reponses = await Promise.all([
          uploadToS3(presignedResponses[0].result.presigned_url, citizenFrontImage),
          uploadToS3(presignedResponses[1].result.presigned_url, citizenBackImage),
        ])
        if (s3Reponses[0]) {
          citizenImage.front_image.image_file_name = presignedResponses[0].result.file_name
          citizenImage.front_image.image_file_path = presignedResponses[0].result.file_path
        }
        if (s3Reponses[1]) {
          citizenImage.back_image.image_file_name = presignedResponses[1].result.file_name
          citizenImage.back_image.image_file_path = presignedResponses[1].result.file_path
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    } catch (e) {
      console.log(e)
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (applicant?.is_first_time != null) {
      setLoadingModalVisible(true)
      if (applicant.is_first_time) {
        await handleFirstApplication()
      } else {
        await handleMakeApplication()
      }
    } else {
      return
    }
  }

  const handleFirstApplication = async () => {
    if (formData?.marital_status_id == MaritalStatus.married.code) {
      formData.spouse = spouse
    }
    if (await handleUploadImage()) {
      formData.front_image = citizenImage.front_image
      formData.back_image = citizenImage.back_image
      try {
        await accountApi.accountAddNewApplication(auth.userId, JSON.stringify(formData))
        setLoadingModalVisible(false)
        setSuccessModalMessage((prevSuccessModal) => ({
          ...prevSuccessModal,
          modalTile: 'Thành công!',
          modalContent: 'Đơn đăng ký của bạn sẽ được xem xét và phản hồi qua email.',
        }))
        setSuccessModalVisible(true)
        setDone(true)
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
    } else {
      setLoadingModalVisible(false)
      setErrorModalMessage((prevModalError) => ({
        ...prevModalError,
        modalTile: 'Lỗi',
        modalContent: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
      }))
      setErrorModalVisible(true)
    }
  }

  const handleMakeApplication = async () => {
    if (applicant?.spouse) {
      if (applicant?.marital_status_id == MaritalStatus.married.code && changeSpouseState) {
        formData.spouse = spouse
      }
    } else {
      if (formData?.marital_status_id == MaritalStatus.married.code) {
        formData.spouse = spouse
      }
    }
    try {
      await accountApi.accountAddApplication(auth.userId, JSON.stringify(formData))
      setLoadingModalVisible(false)
      setSuccessModalMessage((prevSuccessModal) => ({
        ...prevSuccessModal,
        modalTile: 'Thành công!',
        modalContent: 'Đơn đăng ký của bạn sẽ được xem xét và phản hồi qua email.',
      }))
      setSuccessModalVisible(true)
      setDone(true)
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

  useEffect(() => {
    done && !successModalVisible && (window.location.href = 'http://localhost:3001/accounts')
  }, [done, successModalVisible])

  return (
    <>
      <LoadingModal
        isVisible={loadingModalVisible}
        setVisible={setLoadingModalVisible}
      ></LoadingModal>
      <SuccessModal
        modalMessage={successModalMessage}
        isVisible={successModalVisible}
        setVisible={setSuccessModalVisible}
      />
      <ErrorModal
        modalMessage={errorModalMessage}
        isVisible={errormodalVisible}
        setVisible={setErrorModalVisible}
      />
      <section className="contact-form-area register-area pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="section-heading text-center">
                <h2 className="section__title">Đăng ký nhận thông tin trẻ đang chờ nhận nuôi</h2>
              </div>
            </div>
          </div>
          <div className="row form-shared-wrap pt-3">
            <div className="mb-1">
              <h3 className="form__title mb-3">Thông tin cá nhân</h3>
              <div>
                <p>
                  <small>
                    <i>Những trường đánh dấu * là bắt buột nhập</i>
                  </small>
                </p>
              </div>
            </div>

            <div className="form-shared">
              <form action="#">
                <div className="row">
                  {applicant?.is_first_time != null ? (
                    applicant?.is_first_time ? (
                      <>
                        <AccountFirstApplicantForm
                          applicant={applicant}
                          setApplicant={setApplicant}
                          citizenFrontImage={citizenFrontImage}
                          setCitizenFrontImage={setCitizenFrontImage}
                          citizenBackImage={citizenBackImage}
                          setCitizenBackImage={setCitizenBackImage}
                          formValid={applicantValid}
                          setFormValid={setApplicantValid}
                          formData={formData}
                          setFormData={setFormData}
                        />
                        {spouseState && (
                          <>
                            <div className="col-lg-12">
                              <h3 className="form__title">Thông tin vợ/chồng</h3>
                            </div>
                            <SpouseForm
                              spouse={spouse}
                              setSpouse={setSpouse}
                              formValid={spouseValid}
                              setFormValid={setSpouseValid}
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <AccountApplicantForm
                          applicant={applicant}
                          setApplicant={setApplicant}
                          citizenFrontImage={citizenFrontImage}
                          setCitizenFrontImage={setCitizenFrontImage}
                          citizenBackImage={citizenBackImage}
                          setCitizenBackImage={setCitizenBackImage}
                          formValid={applicantValid}
                          setFormValid={setApplicantValid}
                          formData={formData}
                          setFormData={setFormData}
                        />
                        {applicant?.spouse ? (
                          (formData?.marital_status_id == null ||
                            formData?.marital_status_id == MaritalStatus.married.code) &&
                          !changeSpouseState ? (
                            <>
                              <div className="col-lg-12">
                                <h3 className="form__title">Thông tin vợ/chồng</h3>
                              </div>
                              <div className="col-lg-12 mt-0">
                                <div className="d-flex align-items-center mb-2 gap-2">
                                  <input
                                    type="checkbox"
                                    checked={changeSpouseState}
                                    onChange={handleChangeSpouse}
                                  />
                                  <label>Thay đổi thông tin vợ chồng</label>
                                </div>
                              </div>
                              <AccountSpouseForm spouse={applicant?.spouse} />
                            </>
                          ) : (
                            (spouseState || changeSpouseState) && (
                              <>
                                <div className="col-lg-12">
                                  <h3 className="form__title">Thông tin vợ/chồng</h3>
                                </div>
                                <SpouseForm
                                  spouse={spouse}
                                  setSpouse={setSpouse}
                                  formValid={spouseValid}
                                  setFormValid={setSpouseValid}
                                />
                              </>
                            )
                          )
                        ) : (
                          spouseState && (
                            <>
                              <div className="col-lg-12">
                                <h3 className="form__title">Thông tin vợ/chồng</h3>
                              </div>
                              <SpouseForm
                                spouse={spouse}
                                setSpouse={setSpouse}
                                formValid={spouseValid}
                                setFormValid={setSpouseValid}
                              />
                            </>
                          )
                        )}
                      </>
                    )
                  ) : (
                    <></>
                  )}
                  <div className="col-lg-12">
                    <h3 className="form__title">Lý do nhận nuôi</h3>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        className="textarea"
                        name="message"
                        placeholder="Nhập lý do*"
                        value={formData.reason}
                        onChange={handleReasonChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button
                      className="theme-btn submit__btn"
                      onClick={handleSubmit}
                      disabled={!formValid}
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AccountAdoptionForm
