import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardImage,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import validator from 'validator'
import { useEffect } from 'react'
import { authApi, publicApi } from 'src/api/services'
import { FaExclamationTriangle } from 'react-icons/fa'
import SuccessModal from 'src/components/modals/SuccessModal'
import ConfirmModal from 'src/components/modals/ConfirmModal'
import ReactImg from '../assets/brand/logo2.png'
import { format } from 'date-fns'
import LoadingModal from 'src/components/modals/LoadingModal'
import ErrorModal from 'src/components/modals/ErrorModal'

const VerifyAccount = () => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const email = urlSearchParams.get('email')
  let token = urlSearchParams.get('token')

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone_number: '',
    gender: null,
    ethnicity: '',
    nationality: '',
    religion: '',
    citizen_id_number: '',
    address: {
      province_id: null,
      district_id: null,
      ward_id: null,
      address_detail: '',
    },
  })
  const [formValidate, setFormValidate] = useState({
    nationality: {
      invalid: false,
      errorMessage: 'Please enter nationality',
    },
    religion: {
      invalid: false,
      errorMessage: 'Please enter religion',
    },
    ethnicity: {
      invalid: false,
      errorMessage: 'Please enter ethnicity',
    },
    gender: {
      invalid: false,
      errorMessage: 'Please select gender',
    },
    citizen_id_number: {
      invalid: false,
      errorMessage: 'Invalid ID number',
    },
  })

  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const [formValid, setFormValid] = useState(false)
  const [errorState, setErrorState] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [successModalMessage, setSuccessModalMessage] = useState({
    modalTitle: '',
    modalContent: '',
  })

  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [confirmModalMessage, setConfirmModalMessage] = useState({
    modalTitle: '',
    modalContent: '',
  })
  const [loadingModalVisible, setLoadingModalVisible] = useState(false)
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorModalMessage, setErrorModalMessage] = useState({
    modalTitle: '',
    modalContent: '',
  })

  useEffect(() => {
    const getVerifyInfor = async () => {
      try {
        console.log(token)
        token = token.replace(/ /g, '+')
        console.log(token)
        const data = {
          email: email,
          token: token,
        }
        const response = await authApi.getVerifyInformation(JSON.stringify(data))
        const result = response.result
        setFormData({
          first_name: result.first_name,
          last_name: result.last_name,
          date_of_birth: result.date_of_birth,
          phone_number: result.phone_number,
          gender: null,
          ethnicity: '',
          nationality: '',
          religion: '',
          citizen_id_number: '',
          address: {
            province_id: null,
            district_id: null,
            ward_id: null,
            address_detail: '',
          },
        })
        setErrorState(false)
      } catch (error) {
        console.log(error)
        if (error?.error?.code === '414') {
          setErrorMessage('Your account has been activated!')
          setErrorState(true)
        } else {
          setErrorMessage(
            'There was an error in the account activation process. Please check the link again!',
          )
          setErrorState(true)
        }
      }
    }
    const getProvinces = async () => {
      try {
        const response = await publicApi.getProvince()
        const result = response.result
        setProvinces(result)
      } catch (error) {
        console.log(error)
      }
    }
    if (email && token) {
      getVerifyInfor()
      getProvinces()
    } else {
      setErrorMessage('There was an error in the account activation process. Please check the link again!')
      setErrorState(true)
    }
  }, [email, token])

  // Init districts select options
  useEffect(() => {
    if (formData.address.province_id) {
      const province = provinces.find(
        (province) => province.province_id == formData.address.province_id,
      )
      setDistricts(province.districts)
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          district_id: null,
          ward_id: null,
        },
      })
    }
  }, [formData.address.province_id])

  // Init wards select options
  useEffect(() => {
    if (formData.address.district_id) {
      const district = districts.find(
        (district) => district.district_id == formData.address.district_id,
      )
      console.log()
      setWards(district.wards)
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          ward_id: null,
        },
      })
    }
  }, [formData.address.district_id])

  useEffect(() => {
    let isValid = true

    isValid =
      !!formData.nationality &&
      !!formData.religion &&
      !!formData.ethnicity &&
      !!formData.gender &&
      !!formData.citizen_id_number &&
      !!formData.address.province_id &&
      !!formData.address.district_id &&
      !!formData.address.ward_id
    if (isValid) {
      for (const fieldName of Object.keys(formValidate)) {
        if (formValidate[fieldName].invalid) {
          isValid = false
          break
        }
      }
    }

    setFormValid(isValid)
  }, [formData, formValidate])

  const validateCitizenIdNumber = (citizenIdNumber) => {
    if (citizenIdNumber.length !== 12) {
      return false
    }

    for (let i = 0; i < 12; i++) {
      if (isNaN(citizenIdNumber[i])) {
        return false
      }
    }
    return true
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (errorState) {
      setErrorState(false)
    }

    let isFieldValid = true
    switch (name) {
      case 'citizen_id_number':
        isFieldValid = !validateCitizenIdNumber(value)
        break
      default:
        isFieldValid = validator.isEmpty(value)
        break
    }
    setFormValidate({
      ...formValidate,
      [name]: {
        ...formValidate[name],
        invalid: isFieldValid,
      },
    })
  }

  const handleAddressChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoadingModalVisible(true)
    const data = {
      email: email,
      token: token.replace(/ /g, '+'),
      applicant: formData,
    }

    try {
      await authApi.activeAccount(JSON.stringify(data))
      setLoadingModalVisible(false)
      setSuccessModalMessage((prevSuccessModal) => ({
        ...prevSuccessModal,
        modalTitle: 'Success!',
        modalContent: 'Your account has been successfully verified',
      }))
      setSuccessModalVisible(true)
    } catch (error) {
      console.log(error)
      setLoadingModalVisible(false)
      setErrorModalMessage((prevModalError) => ({
        ...prevModalError,
        modalTitle: 'Error',
        modalContent: 'An error has occurred, please try again later',
      }))
      setErrorModalVisible(true)
    }
  }

  const handleDirect = () => {
    window.location.href = 'http://localhost:3001/login'
  }

  const handleConfirmBtnClick = () => {
    setConfirmModalVisible(false)
  }

  return (
    <>
      {errorState ? (
        <div className="d-flex flex-column aligin-items-center justify-content-center">
          <div className="d-flex justify-content-center mb-3">
            <Link to="/">
              <img src={ReactImg} className="login__image" alt="" />
            </Link>
          </div>
          <h2 className="text-center text-danger">
            {errorMessage}
          </h2>
          {errorMessage === 'Your account has been activated!' && (
            <CButton
              color="primary"
              className="w-50 mx-auto my-3"
              onClick={handleDirect}
            >
              Log In
            </CButton>
          )}
        </div>
      ) : (
        <>
          <CContainer>
            <CRow>
              <CCol md={8} className="mx-auto">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <h1>Confirm Personal Information</h1>
                      <CForm onSubmit={handleSubmit}>
                        <CRow>
                          <CCol md={6} className="mb-3">
                            <CFormLabel htmlFor="first_name">First Name*</CFormLabel>
                            <CFormInput
                              type="text"
                              id="first_name"
                              name="first_name"
                              value={formData.first_name}
                              onChange={handleInputChange}
                              invalid={formValidate.first_name?.invalid}
                            />
                            <CFormFeedback invalid>
                              {formValidate.first_name?.errorMessage}
                            </CFormFeedback>
                          </CCol>
                          <CCol md={6} className="mb-3">
                            <CFormLabel htmlFor="last_name">Last Name*</CFormLabel>
                            <CFormInput
                              type="text"
                              id="last_name"
                              name="last_name"
                              value={formData.last_name}
                              onChange={handleInputChange}
                              invalid={formValidate.last_name?.invalid}
                            />
                            <CFormFeedback invalid>
                              {formValidate.last_name?.errorMessage}
                            </CFormFeedback>
                          </CCol>
                          <CCol md={6} className="mb-3">
                            <CFormLabel htmlFor="phone_number">Phone Number*</CFormLabel>
                            <CFormInput
                              type="text"
                              id="phone_number"
                              name="phone_number"
                              value={formData.phone_number}
                              onChange={handleInputChange}
                              invalid={formValidate.phone_number?.invalid}
                            />
                            <CFormFeedback invalid>
                              {formValidate.phone_number?.errorMessage}
                            </CFormFeedback>
                          </CCol>
                          <CCol md={6} className="mb-3">
                            <CFormLabel htmlFor="date_of_birth">Date of Birth*</CFormLabel>
                            <CFormInput
                              type="date"
                              id="date_of_birth"
                              name="date_of_birth"
                              value={format(new Date(formData.date_of_birth), 'yyyy-MM-dd')}
                              onChange={handleInputChange}
                              invalid={formValidate.date_of_birth?.invalid}
                            />
                            <CFormFeedback invalid>
                              {formValidate.date_of_birth?.errorMessage}
                            </CFormFeedback>
                          </CCol>
                          <CCol md={6} className="mb-3">
                            <CFormLabel htmlFor="gender">Gender</CFormLabel>
                            <CFormSelect
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                              invalid={formValidate.gender?.invalid}
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </CFormSelect>
                            <CFormFeedback invalid>
                              {formValidate.gender?.errorMessage}
                            </CFormFeedback>
                          </CCol>
                          <CCol md={6} className="mb-3">
                            <CFormLabel htmlFor="nationality">Nationality*</CFormLabel>
                            <CFormInput
                              type="text"
                              id="nationality"
                              name="nationality"
                              value={formData.nationality}
                              onChange={handleInputChange}
                              invalid={formValidate.nationality?.invalid}
                            />
                            <CFormFeedback invalid>
                              {formValidate.nationality?.errorMessage}
                            </CFormFeedback>
                          </CCol>
                          <CCol md={6} className="mb-3">
                            <CFormLabel htmlFor="ethnicity">Ethnicity*</CFormLabel>
                            <CFormInput
                              type="text"
                              id="ethnicity"
                              name="ethnicity"
                              value={formData.ethnicity}
                              onChange={handleInputChange}
                              invalid={formValidate.ethnicity?.invalid}
                            />
                            <CFormFeedback invalid>
                              {formValidate.ethnicity?.errorMessage}
                            </CFormFeedback>
                          </CCol>
                          <CCol md={6} className="mb-3">
                            <CFormLabel htmlFor="religion">Religion*</CFormLabel>
                            <CFormInput
                              type="text"
                              id="religion"
                              name="religion"
                              value={formData.religion}
                              onChange={handleInputChange}
                              invalid={formValidate.religion?.invalid}
                            />
                            <CFormFeedback invalid>
                              {formValidate.religion?.errorMessage}
                            </CFormFeedback>
                          </CCol>
                          <CCol md={6} className="mb-3">
                            <CFormLabel htmlFor="citizen_id_number">Citizen ID Number*</CFormLabel>
                            <CFormInput
                              type="text"
                              id="citizen_id_number"
                              name="citizen_id_number"
                              value={formData.citizen_id_number}
                              onChange={handleInputChange}
                              invalid={formValidate.citizen_id_number?.invalid}
                            />
                            <CFormFeedback invalid>
                              {formValidate.citizen_id_number?.errorMessage}
                            </CFormFeedback>
                          </CCol>
                          <CCol md={6} className="mb-3">
                            <CFormLabel htmlFor="province_id">Select Province/City</CFormLabel>
                            <CFormSelect
                              id="province_id"
                              name="province_id"
                              value={formData.address.province_id}
                              onChange={handleAddressChange}
                            >
                              <option value="">Select Province/City</option>
                              {provinces.map((province) => (
                                <option key={province.province_id} value={province.province_id}>
                                  {province.province_name}
                                </option>
                              ))}
                            </CFormSelect>
                          </CCol>
                          <CCol md={6} className="mb-3">
                            <CFormLabel htmlFor="district_id">Select District</CFormLabel>
                            <CFormSelect
                              id="district_id"
                              name="district_id"
                              value={formData.address.district_id}
                              onChange={handleAddressChange}
                            >
                              <option value="">Select District</option>
                              {districts.map((district) => (
                                <option key={district.district_id} value={district.district_id}>
                                  {district.district_name}
                                </option>
                              ))}
                            </CFormSelect>
                          </CCol>
                          <CCol md={6} className="mb-3">
                            <CFormLabel htmlFor="ward_id">Select Ward/Commune</CFormLabel>
                            <CFormSelect
                              id="ward_id"
                              name="ward_id"
                              value={formData.address.ward_id}
                              onChange={handleAddressChange}
                            >
                              <option value="">Select Ward/Commune</option>
                              {wards.map((ward) => (
                                <option key={ward.ward_id} value={ward.ward_id}>
                                  {ward.ward_name}
                                </option>
                              ))}
                            </CFormSelect>
                          </CCol>
                          <CCol md={12} className="mb-3">
                            <CFormLabel htmlFor="address_detail">Detailed Address*</CFormLabel>
                            <CFormInput
                              type="text"
                              id="address_detail"
                              name="address_detail"
                              value={formData.address.address_detail}
                              onChange={handleAddressChange}
                              invalid={formValidate.address_detail?.invalid}
                            />
                            <CFormFeedback invalid>
                              {formValidate.address_detail?.errorMessage}
                            </CFormFeedback>
                          </CCol>
                        </CRow>
                        <CButton type="submit" color="primary" disabled={!formValid}>
                          Confirm
                        </CButton>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
          <SuccessModal
            visible={successModalVisible}
            onClose={() => setSuccessModalVisible(false)}
            title={successModalMessage.modalTitle}
            content={successModalMessage.modalContent}
            onConfirm={() => setSuccessModalVisible(false)}
          />
          <ConfirmModal
            visible={confirmModalVisible}
            onClose={() => setConfirmModalVisible(false)}
            title={confirmModalMessage.modalTitle}
            content={confirmModalMessage.modalContent}
            onConfirm={handleConfirmBtnClick}
          />
          <LoadingModal visible={loadingModalVisible} />
          <ErrorModal
            visible={errorModalVisible}
            onClose={() => setErrorModalVisible(false)}
            title={errorModalMessage.modalTitle}
            content={errorModalMessage.modalContent}
          />
        </>
      )}
    </>
  )
}

export default VerifyAccount
