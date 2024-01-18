import React, { useState } from 'react'
import { adoptionApi, publicApi } from 'src/api/services'
import { useEffect } from 'react'
import SpouseForm from './SpouseForm'
import ApplicantForm from './ApplicantForm'
import { MaritalStatus } from 'src/constants/AdoptionCode'
import axios from 'axios'
import { fileToBinary } from 'src/utils/fileToBinary'
import ErrorModal from '../modals/ErrorModal'
import SuccessModal from '../modals/SuccessModal'
import LoadingModal from '../modals/LoadingModal'

const AdoptionForm = () => {
  const [applicant, setApplicant] = useState({
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
    marital_status_id: null,
    front_image: {
      image_file_name: '',
      image_file_path: '',
    },
    back_image: {
      image_file_name: '',
      image_file_path: '',
    },
  })

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
    address: {
      province_id: null,
      district_id: null,
      ward_id: null,
      address_detail: '',
    },
  })

  const [spouseState, setSpouseState] = useState(false)
  const [applicantValid, setApplicantValid] = useState(false)
  const [spouseValid, setSpouseValid] = useState(true)
  const [formValid, setFormValid] = useState(true)

  const [reason, setReason] = useState('')

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
  }, [applicant.marital_status_id])

  useEffect(() => {
    // setFormValid(applicantValid && spouseValid && reason)
    setFormValid(true)
  }, [applicantValid, spouseValid, reason])

  const handleReasonChange = (e) => {
    setReason(e.target.value)
  }

  const handleUploadImage = async (imageFile) => {
    try {
      const response = await publicApi.getPresignedUrl(imageFile.name, 'images')
      console.log(response)
      if (response.status === 200) {
        const result = response.result
        let presignedUrl = result.presigned_url
        const binaryData = await fileToBinary(imageFile)
        try {
          const responseS3 = await axios.put(presignedUrl, binaryData, {
            headers: {
              'Content-Type': imageFile.type,
            },
          })
          const imgReturn = {
            image_file_name: result?.file_name,
            image_file_path: result?.file_path,
          }

          return imgReturn
        } catch (err) {
          console.log(err)
          return false
        }
      }
    } catch (error) {
      console.log(error)
      return false
    }
    return false
  }
  const resetForm = () => {
    setApplicant({
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
      marital_status_id: null,
      front_image: {
        image_file_name: '',
        image_file_path: '',
      },
      back_image: {
        image_file_name: '',
        image_file_path: '',
      },
    })
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
    setReason('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoadingModalVisible(true)
    const uploadFrontImgResult = await handleUploadImage(citizenFrontImage)
    const uploadBackImgResult = await handleUploadImage(citizenBackImage)

    if (uploadFrontImgResult && uploadBackImgResult) {
      applicant.front_image.image_file_name = uploadFrontImgResult.image_file_name
      applicant.front_image.image_file_path = uploadFrontImgResult.image_file_path

      applicant.back_image.image_file_name = uploadBackImgResult.image_file_name
      applicant.back_image.image_file_path = uploadBackImgResult.image_file_path

      const data = {
        applicant: applicant,
        reason: reason,
      }

      if (spouseState) {
        data.spouse = spouse
      }

      try {
        await adoptionApi.createAdoptionApplication(JSON.stringify(data))
        setLoadingModalVisible(false)
        setSuccessModalMessage((prevSuccessModal) => ({
          ...prevSuccessModal,
          modalTile: 'Thành công!',
          modalContent: 'Đơn đăng ký của bạn sẽ được xem xét và phản hồi qua email.',
        }))
        setSuccessModalVisible(true)
        setDone(true)
      } catch (e) {
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

  useEffect(() => {
    done && !successModalVisible && (window.location.href = 'http://localhost:3001/')
  }, [done, successModalVisible])
  return (
    <>
      <LoadingModal isVisible={loadingModalVisible} setVisible={setLoadingModalVisible} />
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
          <div className="row form-shared-wrap">
            <h3 className="form__title">Thông tin cá nhân</h3>
            <div className="form-shared">
              <form action="#">
                <div className="row">
                  <ApplicantForm
                    applicant={applicant}
                    setApplicant={setApplicant}
                    citizenFrontImage={citizenFrontImage}
                    setCitizenFrontImage={setCitizenFrontImage}
                    citizenBackImage={citizenBackImage}
                    setCitizenBackImage={setCitizenBackImage}
                    formValid={applicantValid}
                    setFormValid={setApplicantValid}
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
                  <div className="col-lg-12">
                    <h3 className="form__title">Lý do nhận nuôi</h3>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        className="textarea"
                        name="message"
                        placeholder="Nhập lý do*"
                        value={reason}
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

export default AdoptionForm
