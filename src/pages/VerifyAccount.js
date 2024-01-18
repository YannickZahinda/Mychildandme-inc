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
      errorMessage: 'Vui lòng điền quốc tịch',
    },
    religion: {
      invalid: false,
      errorMessage: 'Vui lòng điền tôn giáo',
    },
    ethnicity: {
      invalid: false,
      errorMessage: 'Vui lòng điền dân tộc',
    },
    gender: {
      invalid: false,
      errorMessage: 'Vui lòng chọn giới tính',
    },
    citizen_id_number: {
      invalid: false,
      errorMessage: 'Số CCCD không hợp lệ',
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
    modalTile: '',
    modalContent: '',
  })

  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [confirmModalMessage, setConfirmModalMessage] = useState({
    modalTile: '',
    modalContent: '',
  })
  const [loadingModalVisible, setLoadingModalVisible] = useState(false)
  const [errormodalVisible, setErrorModalVisible] = useState(false)
  const [errorModalMessage, setErrorModalMessage] = useState({
    modalTile: '',
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
          setErrorMessage('Tài khoản của bạn đã được kích hoạt!')
          setErrorState(true)
        } else {
          setErrorMessage(
            'Quá trình kích hoạt tài khoản xảy ra lỗi. Vui lòng kiểm tra lại đường dẫn!',
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
      setErrorMessage('Quá trình kích hoạt tài khoản xảy ra lỗi. Vui lòng kiểm tra lại đường dẫn!')
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
        modalTile: 'Thành Công!',
        modalContent: 'Tài khoản của bạn đã được xác minh thành công',
      }))
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
              <CCardImage
                className="sidebar-brand-full"
                orientation="bottom"
                src={ReactImg}
                style={{ width: '100%' }}
              />
            </Link>
          </div>
          <h1 className="text-center">Xác nhận thông tin cá nhân</h1>
          <div className="d-flex justify-content-center mb-3">
            <div className="mt-3 p-4 bg-info text-red d-flex text-white align-items-center gap-2">
              <span>{errorMessage}</span>
            </div>
          </div>
        </div>
      ) : (
        formData?.first_name && (
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
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center mb-5">
              <CContainer>
                <CRow className="justify-content-center">
                  <CCol md={8}>
                    <div className="mx-4 mb-3">
                      <CCardImage
                        className="sidebar-brand-full"
                        orientation="bottom"
                        src={ReactImg}
                        style={{ width: '20%' }}
                      />
                    </div>
                    <CCardGroup>
                      <CCard className="mx-4">
                        <CCardBody className="p-4">
                          <h1 className="text-center">Xác nhận thông tin cá nhân</h1>

                          <CForm className="mt-2">
                            <div className="mb-2">
                              <small>
                                <i>
                                  * Vui lòng hoàn thành thông tin cá nhân của bạn bên dưới để hoàn
                                  tất quá trình đăng ký
                                </i>
                              </small>
                            </div>
                            <CRow>
                              <CCol lg={6}>
                                <CInputGroup className="mb-3">
                                  <CFormInput
                                    value={formData?.first_name}
                                    name="first_name"
                                    type="text"
                                    placeholder="Tên*"
                                    readOnly
                                  />
                                </CInputGroup>
                              </CCol>
                              <CCol lg={6}>
                                <CInputGroup className="mb-3">
                                  <CFormInput
                                    value={formData?.last_name}
                                    name="last_name"
                                    type="text"
                                    placeholder="Họ và tên đệm*"
                                    readOnly
                                  />
                                </CInputGroup>
                              </CCol>
                              <CCol lg={6}>
                                <CInputGroup className="mb-3">
                                  <CFormInput
                                    value={email}
                                    name="mail_address"
                                    type="email"
                                    placeholder="Địa chỉ email*"
                                    readOnly
                                  />
                                </CInputGroup>
                              </CCol>
                              <CCol lg={6}>
                                <CInputGroup className="mb-3">
                                  <CFormInput
                                    value={formData?.phone_number}
                                    name="phone_number"
                                    type="number"
                                    placeholder="Số điện thoại*"
                                    readOnly
                                  />
                                </CInputGroup>
                              </CCol>
                              <CCol lg={6}>
                                <CInputGroup className="mb-3">
                                  <CFormInput
                                    value={
                                      formData?.date_of_birth &&
                                      format(new Date(formData?.date_of_birth), 'dd/MM/yyyy')
                                    }
                                    name="date_of_birth"
                                    type="text"
                                    placeholder="Ngày sinh*"
                                    readOnly
                                  />
                                </CInputGroup>
                              </CCol>
                              <CCol lg={6}>
                                <CInputGroup className="mb-3">
                                  <CFormSelect
                                    className="form-control"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                  >
                                    {!formData.gender && (
                                      <option disabled selected>
                                        Giới tính
                                      </option>
                                    )}
                                    <option value={1}>Nam</option>
                                    <option value={2}>Nữ</option>
                                    <option value={0}>Khác</option>
                                  </CFormSelect>
                                </CInputGroup>
                              </CCol>
                              <CCol lg={12}>
                                <CInputGroup className="mb-3">
                                  <CFormInput
                                    value={formData.nationality}
                                    name="nationality"
                                    type="text"
                                    placeholder="Quốc tịch*"
                                    onChange={handleInputChange}
                                    invalid={formValidate.nationality.invalid}
                                  />
                                  <CFormFeedback invalid>
                                    {formValidate.nationality.errorMessage}
                                  </CFormFeedback>
                                </CInputGroup>
                              </CCol>
                              <CCol lg={12}>
                                <CInputGroup className="mb-4">
                                  <CFormInput
                                    value={formData.ethnicity}
                                    name="ethnicity"
                                    type="text"
                                    placeholder="Dân tộc*"
                                    onChange={handleInputChange}
                                    invalid={formValidate.ethnicity.invalid}
                                  />
                                  <CFormFeedback invalid>
                                    {formValidate.ethnicity.errorMessage}
                                  </CFormFeedback>
                                </CInputGroup>
                              </CCol>
                              <CCol lg={12}>
                                <CInputGroup className="mb-4">
                                  <CFormInput
                                    value={formData.religion}
                                    name="religion"
                                    type="text"
                                    placeholder="Tôn giáo*"
                                    onChange={handleInputChange}
                                    invalid={formValidate.religion.invalid}
                                  />
                                  <CFormFeedback invalid>
                                    {formValidate.religion.errorMessage}
                                  </CFormFeedback>
                                </CInputGroup>
                              </CCol>
                              <CCol lg={12}>
                                <CInputGroup className="mb-4">
                                  <CFormInput
                                    value={formData.citizen_id_number}
                                    name="citizen_id_number"
                                    type="number"
                                    placeholder="Số căn cước công dân*"
                                    onChange={handleInputChange}
                                    invalid={formValidate.citizen_id_number.invalid}
                                  />
                                  <CFormFeedback invalid>
                                    {formValidate.citizen_id_number.errorMessage}
                                  </CFormFeedback>
                                </CInputGroup>
                              </CCol>
                              <CCol lg={6}>
                                <CInputGroup className="mb-3">
                                  <CFormSelect
                                    className="form-control"
                                    name="province_id"
                                    value={formData.address.province_id}
                                    onChange={handleAddressChange}
                                  >
                                    {!formData.address.province_id && (
                                      <option disabled selected>
                                        Chọn Tỉnh/Thành phố
                                      </option>
                                    )}

                                    {provinces?.map((province, index) => (
                                      <option key={index} value={province.province_id}>
                                        {province.province_name}
                                      </option>
                                    ))}
                                  </CFormSelect>
                                </CInputGroup>
                              </CCol>
                              <CCol lg={6}>
                                <CInputGroup className="mb-3">
                                  <CFormSelect
                                    className="form-control"
                                    name="district_id"
                                    value={formData.address.district_id}
                                    onChange={handleAddressChange}
                                  >
                                    {!formData.address.district_id && (
                                      <option disabled selected>
                                        Chọn Quận/Huyện
                                      </option>
                                    )}
                                    {districts?.map((district, index) => (
                                      <option key={index} value={district.district_id}>
                                        {district.district_name}
                                      </option>
                                    ))}
                                  </CFormSelect>
                                </CInputGroup>
                              </CCol>
                              <CCol lg={6}>
                                <CInputGroup className="mb-3">
                                  <CFormSelect
                                    className="form-control"
                                    name="ward_id"
                                    value={formData.address.ward_id}
                                    onChange={handleAddressChange}
                                  >
                                    {!formData.address.ward_id && (
                                      <option disabled selected>
                                        Chọn Xã/Phường
                                      </option>
                                    )}

                                    {wards?.map((ward, index) => (
                                      <option key={index} value={ward.ward_id}>
                                        {ward.ward_name}
                                      </option>
                                    ))}
                                  </CFormSelect>
                                </CInputGroup>
                              </CCol>
                              <CCol lg={6}>
                                <CInputGroup className="mb-4">
                                  <CFormInput
                                    value={formData.address.address_detail}
                                    name="address_detail"
                                    type="text"
                                    placeholder="Địa chỉ chi tiết*"
                                    onChange={handleAddressChange}
                                  />
                                </CInputGroup>
                              </CCol>
                              <CCol lg={12}>
                                <div className="d-grid">
                                  <CButton
                                    color="success"
                                    onClick={handleSubmit}
                                    disabled={!formValid}
                                  >
                                    Lưu
                                  </CButton>
                                </div>
                              </CCol>
                            </CRow>
                          </CForm>
                        </CCardBody>
                      </CCard>
                    </CCardGroup>
                  </CCol>
                </CRow>
              </CContainer>
            </div>
          </>
        )
      )}
    </>
  )
}

export default VerifyAccount
