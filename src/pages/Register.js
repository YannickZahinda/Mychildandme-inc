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
      errorMessage: 'Vui lòng điền tên',
    },
    last_name: {
      invalid: false,
      errorMessage: 'Vui lòng điền họ',
    },
    date_of_birth: {
      invalid: false,
      errorMessage: 'Ngày sinh không hợp lệ',
    },
    mail_address: {
      invalid: false,
      errorMessage: 'Địa chỉ email không hợp lệ',
    },
    phone_number: {
      invalid: false,
      errorMessage: 'Số điện thoại không hợp lệ',
    },
    password: {
      invalid: false,
      errorMessage: 'Vui lòng nhập mật khẩu',
    },
    confirm_password: {
      invalid: false,
      errorMessage: 'Vui lòng nhập mật khẩu',
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
        modalTile: 'Một liên kết đã được xác minh đã được gửi đến tài khoản email của bạn.',
        modalContent:
          'Vui lòng nhấp vào liên kết trong email vừa được gửi cho để xác minh tài khoản của bạn và hoàn thành quá trình đăng ký!',
      }))
      setSuccessModalVisible(true)
    } catch (error) {
      if (error.status == 409) {
        if (error.error.code == '409') {
          setLoadingModalVisible(false)
          setErrorMessage('Địa chỉ email này đã được sử dụng')
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
            modalTile: 'Email đã được sử dụng',
            modalContent:
              'Email mà bạn đăng ký đã được sử dụng để nhận thông tin trẻ chờ nhận nuôi. Bạn có muốn sử dụng những thông tin đó để tạo tài khoản không.',
          }))
          setConfirmModalVisible(true)
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
        modalTile: 'Một liên kết đã được xác minh đã được gửi đến tài khoản email của bạn.',
        modalContent:
          'Vui lòng nhấp vào liên kết trong email vừa được gửi cho để xác minh tài khoản của bạn và hoàn thành quá trình đăng ký!',
      }))
      setLoadingModalVisible(false)
      setSuccessModalVisible(true)
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
                    <h1 className="text-center">Đăng ký</h1>
                    <CForm className="mt-3">
                      <CRow>
                        <CCol lg={12} className={errorState ? 'd-display' : 'd-none'}>
                          <div className="d-flex justify-content-center mb-3">
                            <div className="pl-1 pr-1 bg-danger d-flex text-white align-items-center gap-2">
                              <FaExclamationTriangle />
                              <span>{errorMessage}</span>
                            </div>
                          </div>
                        </CCol>
                        <CCol lg={6}>
                          <CInputGroup className="mb-3">
                            <CFormInput
                              value={formData.first_name}
                              name="first_name"
                              type="text"
                              placeholder="Tên*"
                              onChange={handleInputChange}
                              invalid={formValidate.first_name.invalid}
                              required
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol lg={6}>
                          <CInputGroup className="mb-3">
                            <CFormInput
                              value={formData.last_name}
                              name="last_name"
                              type="text"
                              placeholder="Họ và tên đệm*"
                              onChange={handleInputChange}
                              invalid={formValidate.last_name.invalid}
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol lg={12}>
                          <CInputGroup className="mb-3">
                            <CFormInput
                              value={formData.date_of_birth}
                              name="date_of_birth"
                              type="text"
                              onFocus={(e) => (e.target.type = 'date')}
                              onBlur={(e) => (e.target.type = 'text')}
                              placeholder="Ngày sinh*"
                              onChange={handleInputChange}
                              invalid={formValidate.date_of_birth.invalid}
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol lg={12}>
                          <CInputGroup className="mb-3">
                            <CFormInput
                              value={formData.mail_address}
                              name="mail_address"
                              type="email"
                              placeholder="Địa chỉ email*"
                              onChange={handleInputChange}
                              invalid={formValidate.mail_address.invalid}
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol lg={12}>
                          <CInputGroup className="mb-3">
                            <CFormInput
                              value={formData.phone_number}
                              name="phone_number"
                              type="number"
                              placeholder="Số điện thoại*"
                              onChange={handleInputChange}
                              invalid={formValidate.phone_number.invalid}
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol lg={12}>
                          <CInputGroup className="mb-3">
                            <CFormInput
                              value={formData.password}
                              name="password"
                              type="password"
                              placeholder="Mật khẩu*"
                              autoComplete="new-password"
                              onChange={handleInputChange}
                              invalid={formValidate.password.invalid}
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol lg={12}>
                          <CInputGroup className="mb-4">
                            <CFormInput
                              value={formData.confirm_password}
                              name="confirm_password"
                              type="password"
                              placeholder="Xác nhận mật khẩu*"
                              onChange={handleInputChange}
                              invalid={formValidate.confirm_password.invalid}
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol lg={12}>
                          <div className="d-flex mb-4 gap-2 align-items-center">
                            <CFormCheck
                              checked={checkState}
                              onChange={(e) => {
                                setCheckState(e.target.checked)
                              }}
                            />
                            <CFormLabel>Tôi đồng ý với các điều khoản và điều kiện</CFormLabel>
                          </div>
                        </CCol>
                        <CCol lg={12}>
                          <div className="d-grid">
                            <CButton color="success" onClick={handleSubmit} disabled={!formValid}>
                              Đăng ký
                            </CButton>
                          </div>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div className="d-flex flex-column justify-content-between h-100">
                      <div>
                        <Link to="/">
                          <CCardImage
                            className="sidebar-brand-full"
                            orientation="bottom"
                            src={ReactImg}
                          />
                        </Link>
                        <h2>Website trại trẻ mồ côi</h2>
                        <br></br>
                        <p>
                          Chúng tôi chăm sóc, nuôi dưỡng, hỗ trợ trẻ em mồ côi, trẻ em bị bỏ rơi và
                          trẻ em có hoàn cảnh khó khăn.
                        </p>
                        <br></br>
                        <p>
                          Truy cập vào website để xem những thông tin cập nhật mới nhất về trại trẻ,
                          tham gia đồng hành cùng chúng tôi bằng chức năng tài trợ trên website.
                        </p>

                        <Link to="/">
                          <CButton color="primary" className="mt-3" active tabIndex={-1}>
                            Vào website
                          </CButton>
                        </Link>
                      </div>
                      <div className="d-flex align-items-center gap-2 justify-content-center">
                        <span>Bạn đã có tài khoản? </span>
                        <Link className="text-black" to="/login">
                          Đăng nhập
                        </Link>
                        <span>ngay.</span>
                      </div>
                    </div>
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
