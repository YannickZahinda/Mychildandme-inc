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
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import validator from 'validator'
import { useEffect } from 'react'
import { authApi } from 'src/api/services'
import { FaExclamationTriangle } from 'react-icons/fa'
import SuccessModal from 'src/components/modals/SuccessModal'
import ConfirmModal from 'src/components/modals/ConfirmModal'
import ReactImg from '../assets/brand/logo3.png'
import useAuth from 'src/components/hooks/useAuth'
import ErrorModal from 'src/components/modals/ErrorModal'
import LoadingModal from 'src/components/modals/LoadingModal'

const Register = () => {
  const { auth } = useAuth()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mail_address: '',
    date_of_birth: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  })

  const [formValidate, setFormValidate] = useState({
    first_name: {
      invalid: false,
      errorMessage: 'Please enter your first name',
    },
    last_name: {
      invalid: false,
      errorMessage: 'Please enter your last name',
    },
    date_of_birth: {
      invalid: false,
      errorMessage: 'Invalid date of birth',
    },
    mail_address: {
      invalid: false,
      errorMessage: 'Invalid email address',
    },
    phone_number: {
      invalid: false,
      errorMessage: 'Invalid phone number',
    },
    password: {
      invalid: false,
      errorMessage: 'Please enter a password',
    },
    confirm_password: {
      invalid: false,
      errorMessage: 'Please enter a password',
    },
  })

  const [formValid, setFormValid] = useState(false)
  const [checkState, setCheckState] = useState(false)
  const [errorState, setErrorState] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [successModalMessage, setSuccessModalMessage] = useState({
    modalTile: '',
    modalContent: '',
  })

  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [confirmModalMessage, setConfirmModalMessage] = useState({
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
    let isValid = true

    isValid =
      formData.first_name &&
      formData.last_name &&
      formData.date_of_birth &&
      formData.phone_number &&
      formData.mail_address &&
      formData.password &&
      formData.confirm_password &&
      checkState

    if (isValid) {
      for (const fieldName of Object.keys(formValidate)) {
        if (formValidate[fieldName].invalid) {
          isValid = false
          break
        }
      }
    }

    setFormValid(isValid)
  }, [formData, formValidate, checkState])

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
      case 'mail_address':
        isFieldValid = !validator.isEmail(value)
        break
      case 'phone_number':
        isFieldValid = !(validator.isMobilePhone(value) && value.length == 10)
        break
      case 'date_of_birth':
        const currentDate = new Date()
        const selectedDate = new Date(value)
        if (validator.isEmpty(value)) {
          isFieldValid = validator.isEmpty(value)
        } else {
          isFieldValid = selectedDate > currentDate
        }
        break
      case 'password':
        isFieldValid = !validator.isStrongPassword(value)
        break
      case 'confirm_password':
        isFieldValid = !(value == formData.password)
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

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      mail_address: '',
      date_of_birth: '',
      phone_number: '',
      password: '',
      confirm_password: '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoadingModalVisible(true)
    try {
      await authApi.register(JSON.stringify(formData))
      setLoadingModalVisible(false)
      resetForm()
      setSuccessModalMessage((prevSuccessModal) => ({
        ...prevSuccessModal,
        modalTile: 'A verification link has been sent to your email account.',
        modalContent:
          'Please click the link in the email just sent to verify your account and complete the registration process!',
      }))
      setSuccessModalVisible(true)
    } catch (error) {
      if (error.status == 409) {
        if (error.error.code == '409') {
          setLoadingModalVisible(false)
          setErrorMessage('This email address has already been used')
          setErrorState(true)
          setFormData({
            ...formData,
            mail_address: '',
          })
          setFormValidate({
            ...formValidate,
            mail_address: {
              ...formValidate.mail_address,
              invalid: true,
            },
          })
        } else if (error.error.code == '408') {
          setLoadingModalVisible(false)
          setConfirmModalMessage((prevModalMessage) => ({
            ...prevModalMessage,
            modalTile: 'Email has been used',
            modalContent:
              'The email you registered has been used to receive information about children waiting for adoption. Do you want to use that information to create an account?',
          }))
          setConfirmModalVisible(true)
        } else {
          setLoadingModalVisible(false)
          setErrorModalMessage((prevModalError) => ({
            ...prevModalError,
            modalTile: 'Error',
            modalContent: 'An error occurred, please try again later',
          }))
          setErrorModalVisible(true)
        }
      }
    }
  }

  const handleDirect = () => {
    window.location.href = 'http://localhost:3001/'
  }

  const handleConfirmBtnClick = async () => {
    setConfirmModalVisible(false)
    try {
      await authApi.applicantRegister(JSON.stringify(formData))
      resetForm()
      setSuccessModalMessage((prevSuccessModal) => ({
        ...prevSuccessModal,
        modalTile: 'A verification link has been sent to your email account.',
        modalContent:
          'Please click the link in the email just sent to verify your account and complete the registration process!',
      }))
      setLoadingModalVisible(false)
      setSuccessModalVisible(true)
    } catch (error) {
      console.log(error)
      setLoadingModalVisible(false)
      setErrorModalMessage((prevModalError) => ({
        ...prevModalError,
        modalTile: 'Error',
        modalContent: 'An error occurred, please try again later',
      }))
      setErrorModalVisible(true)
    }
  }

  if (auth?.accessToken) {
    return <Navigate to="../" replace />
  }

  return (
    <>
      <LoadingModal isVisible={loadingModalVisible} setVisible={setLoadingModalVisible} />
      <SuccessModal
        modalMessage={successModalMessage}
        isVisible={successModalVisible}
        setVisible={setSuccessModalVisible}
        onConfirmClick={handleDirect}
        size="lg"
      ></SuccessModal>
      <ConfirmModal
        modalMessage={confirmModalMessage}
        isVisible={confirmModalVisible}
        setVisible={setConfirmModalVisible}
        handleConfirmBtnClick={handleConfirmBtnClick}
      ></ConfirmModal>
      <ErrorModal
        modalMessage={errorModalMessage}
        isVisible={errormodalVisible}
        setVisible={setErrorModalVisible}
      />
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={10}>
              <CCardGroup>
                <CCard className="mx-4">
                  <CCardBody className="p-4">
                    <h1 className="text-center">Register</h1>
                    <CForm className="mt-3">
                      <CRow>
                        <CCol lg={12} className={errorState ? 'd-display' : 'd-none'}>
                          <div className="alert alert-danger">
                            <FaExclamationTriangle className="me-2" />
                            {errorMessage}
                          </div>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol md={6}>
                          <CFormLabel htmlFor="first_name">First Name*</CFormLabel>
                          <CFormInput
                            id="first_name"
                            name="first_name"
                            placeholder="Enter your first name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            invalid={formValidate.first_name.invalid}
                          />
                          <CFormFeedback invalid>
                            {formValidate.first_name.errorMessage}
                          </CFormFeedback>
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel htmlFor="last_name">Last Name*</CFormLabel>
                          <CFormInput
                            id="last_name"
                            name="last_name"
                            placeholder="Enter your last name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            invalid={formValidate.last_name.invalid}
                          />
                          <CFormFeedback invalid>
                            {formValidate.last_name.errorMessage}
                          </CFormFeedback>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol md={6}>
                          <CFormLabel htmlFor="date_of_birth">Date of Birth*</CFormLabel>
                          <CFormInput
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            value={formData.date_of_birth}
                            onChange={handleInputChange}
                            invalid={formValidate.date_of_birth.invalid}
                          />
                          <CFormFeedback invalid>
                            {formValidate.date_of_birth.errorMessage}
                          </CFormFeedback>
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel htmlFor="phone_number">Phone Number*</CFormLabel>
                          <CFormInput
                            id="phone_number"
                            name="phone_number"
                            placeholder="Enter your phone number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            invalid={formValidate.phone_number.invalid}
                          />
                          <CFormFeedback invalid>
                            {formValidate.phone_number.errorMessage}
                          </CFormFeedback>
                        </CCol>
                      </CRow>
                      <CFormLabel htmlFor="mail_address">Email Address*</CFormLabel>
                      <CFormInput
                        id="mail_address"
                        name="mail_address"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.mail_address}
                        onChange={handleInputChange}
                        invalid={formValidate.mail_address.invalid}
                      />
                      <CFormFeedback invalid>
                        {formValidate.mail_address.errorMessage}
                      </CFormFeedback>
                      <CFormLabel htmlFor="password">Password*</CFormLabel>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          invalid={formValidate.password.invalid}
                        />
                        <CFormFeedback invalid>
                          {formValidate.password.errorMessage}
                        </CFormFeedback>
                      </CInputGroup>
                      <CFormLabel htmlFor="confirm_password">Confirm Password*</CFormLabel>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          id="confirm_password"
                          name="confirm_password"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirm_password}
                          onChange={handleInputChange}
                          invalid={formValidate.confirm_password.invalid}
                        />
                        <CFormFeedback invalid>
                          {formValidate.confirm_password.errorMessage}
                        </CFormFeedback>
                      </CInputGroup>
                      <CFormCheck
                        id="terms"
                        name="terms"
                        label="I agree with the terms and conditions"
                        checked={checkState}
                        onChange={() => setCheckState(!checkState)}
                      />
                      <CButton
                        color="primary"
                        className="px-4"
                        onClick={handleSubmit}
                        disabled={!formValid}
                      >
                        Register
                      </CButton>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-center">
                  <CCardBody className="p-4">
                    <img
                      src={ReactImg}
                      width="300"
                      height="200"
                      alt="Logo"
                      className="mb-4"
                    />
                    <h3 className="mb-4">
                      We care for, nurture, and support orphaned children, abandoned children, and children in difficult circumstances.
                    </h3>
                    <h5 className="mb-4">
                      Access the website to view the latest updates about the orphanage and join us through the sponsorship feature on the website.
                    </h5>
                    <Link to="/">Enter the Website</Link>
                    <p className="mt-3">
                      Already have an account? <Link to="/login">Log in</Link>
                    </p>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Register
