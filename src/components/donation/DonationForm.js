import React, { useState, useEffect } from 'react'
import validator from 'validator'
import { donationApi, publicApi } from 'src/api/services'
import FormInput from '../forms/FormInput'
import { NavLink, useLocation } from 'react-router-dom'

import donateImg1 from '../../assets/images/donate-img1.jpg'
import donateImg2 from '../../assets/images/donate-img2.jpg'
import donateImg3 from '../../assets/images/donate-img3.jpg'
import donateImg4 from '../../assets/images/donate-img4.jpg'
import ErrorModal from '../modals/ErrorModal'
import { CFormSelect } from '@coreui/react'
import { DonationPurpose } from 'src/constants/DonationCode'
import LoadingModal from '../modals/LoadingModal'

const DonationForm = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const programId = searchParams.get('programId')
  const familyparamId = searchParams.get('familyId')

  const [donorId, setDonorId] = useState(null)
  const [token, setToken] = useState('')
  const [donor, setDonor] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: null,
    mail_address: '',
    phone_number: '',
    address: {
      province_id: null,
      district_id: null,
      ward_id: null,
      address_detail: '',
    },
  })

  const [donationPurposes, setDonationPurposes] = useState([])
  const [purposeId, setPurposeId] = useState(programId || DonationPurpose.default.code)

  const [families, setFamilies] = useState([])
  const [familyId, setFamilyId] = useState(familyparamId || '')

  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const [formValidate, setFormValidate] = useState({
    first_name: {
      invalid: false,
      errorMessage: 'Please enter first name',
    },
    last_name: {
      invalid: false,
      errorMessage: 'Please enter last name',
    },
    date_of_birth: {
      invalid: false,
      errorMessage: 'Invalid date of birth',
    },
    gender: {
      invalid: false,
      errorMessage: 'Please select gender',
    },
    mail_address: {
      invalid: false,
      errorMessage: 'Invalid email address',
    },
    phone_number: {
      invalid: false,
      errorMessage: 'Invalid phone number',
    },
  })

  const [addressValidate, setAddressValidate] = useState({
    province_id: {
      invalid: false,
      errorMessage: 'Please select Province/City',
    },
    district_id: {
      invalid: false,
      errorMessage: 'Please select District',
    },
    ward_id: {
      invalid: false,
      errorMessage: 'Please select Ward',
    },
  })

  const [message, setMessage] = useState('')

  const [amountIpState, setAmountIpState] = useState(false)
  const [amount, setAmount] = useState(300000)
  const [amountInvalid, setAmountInvalid] = useState(false)

  const [readOnlyState, setReadOnlyState] = useState(false)
  const [donorCheckState, setDonorCheckState] = useState(false)
  const [formValid, setFormValid] = useState(false)

  const [errormodalVisible, setErrorModalVisible] = useState(false)
  const [errorModalMessage, setErrorModalMessage] = useState({
    modalTitle: '',
    modalContent: '',
  })

  const [loadingModalVisible, setLoadingModalVisible] = useState(false)

  useEffect(() => {
    let isValid = true

    isValid =
      donor.first_name &&
      donor.last_name &&
      donor.date_of_birth &&
      donor.gender &&
      donor.phone_number &&
      donor.mail_address &&
      donor.address.province_id &&
      donor.address.district_id &&
      donor.address.ward_id &&
      message &&
      !amountInvalid

    if (isValid) {
      for (const fieldName of Object.keys(formValidate)) {
        if (formValidate[fieldName].invalid) {
          isValid = false
          break
        }
      }
    }

    setFormValid(isValid)
  }, [donor, formValidate, amount, message, amountInvalid])

  useEffect(() => {
    // Get provinces
    const getProvinces = async () => {
      try {
        const response = await publicApi.getProvince()
        const result = response.result
        setProvinces(result)
      } catch (error) {
        console.log(error)
      }
    }
    // Get donation purposes
    const getDonationPurposes = async () => {
      try {
        const response = await donationApi.getAllDonationPurposes()
        const result = response.result
        setDonationPurposes(result)
      } catch (error) {
        console.log(error)
      }
    }
    getDonationPurposes()
    getProvinces()
  }, [])

  // Init districts select options
  useEffect(() => {
    if (donor.address.province_id) {
      const province = provinces.find(
        (province) => province.province_id == donor.address.province_id,
      )
      setDistricts(province.districts)
      !readOnlyState &&
        setDonor({
          ...donor,
          address: {
            ...donor.address,
            district_id: null,
            ward_id: null,
          },
        })
    }
  }, [donor.address.province_id, readOnlyState])

  // Init wards select options
  useEffect(() => {
    if (donor.address.district_id) {
      const district = districts.find(
        (district) => district.district_id == donor.address.district_id,
      )
      if (district?.wards) {
        setWards(district?.wards)
        !readOnlyState &&
          setDonor({
            ...donor,
            address: {
              ...donor.address,
              ward_id: null,
            },
          })
      }
    }
  }, [donor.address.district_id, districts, readOnlyState])

  const handleAmountChange = (e) => {
    const value = e.target.value
    if (value >= 0) {
      setAmount(value)
      if (value > 100000) {
        setAmountInvalid(false)
      } else {
        setAmountInvalid(true)
      }
    } else {
      setAmountInvalid(true)
    }
  }

  const handleDonorStateChange = (e) => {
    const value = e.target.checked
    setDonorCheckState(value)
    if (!value) {
      setToken('')
      setDonor({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: null,
        mail_address: '',
        phone_number: '',
        address: {
          province_id: null,
          district_id: null,
          ward_id: null,
          address_detail: '',
        },
      })
      setReadOnlyState(false)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setDonor({
      ...donor,
      [name]: value,
    })

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
    setDonor({
      ...donor,
      address: {
        ...donor.address,
        [name]: value,
      },
    })
  }

  useEffect(() => {
    const getFamilies = async () => {
      try {
        const response = await donationApi.getAllFamilies()
        const result = response.result
        console.log(result)
        setFamilies(result)
      } catch (error) {
        console.log(error)
      }
    }
    if (purposeId == 2 && families.length === 0) {
      getFamilies()
    } else {
      if (familyId) setFamilyId('')
    }
  }, [purposeId])

  const handlePurposeChange = (e) => {
    const value = e.target.value
    setPurposeId(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoadingModalVisible(true)
    const data = {
      donor: donor,
      donation_purpose_id: purposeId,
      family_id: familyId,
      amount: amount,
      message: message,
      url_return: 'http://localhost:3001/donation/return',
    }
    if (donorCheckState) {
      const dataWithDonorId = {
        ...data,
        donor_id: donorId,
        token: token,
      }
      try {
        const response = await donationApi.createDonation(dataWithDonorId)
        const result = response.result
        setLoadingModalVisible(false)
        window.location.href = result.url
      } catch (error) {
        setLoadingModalVisible(false)
        console.log(error)
        setErrorModalVisible(true)
        setErrorModalMessage({
          modalTitle: 'Failed',
          modalContent: 'Failed to submit donation',
        })
      }
    } else {
      try {
        const response = await donationApi.createDonation(data)
        const result = response.result
        setLoadingModalVisible(false)
        window.location.href = result.url
      } catch (error) {
        setLoadingModalVisible(false)
        console.log(error)
        setErrorModalVisible(true)
        setErrorModalMessage({
          modalTitle: 'Failed',
          modalContent: 'Failed to submit donation',
        })
      }
    }
  }

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false)
  }

  return (
    <div>
      {errormodalVisible && (
        <ErrorModal
          visible={errormodalVisible}
          onClose={handleCloseErrorModal}
          title={errorModalMessage.modalTitle}
          content={errorModalMessage.modalContent}
        />
      )}
      {loadingModalVisible && <LoadingModal />}
      <form onSubmit={handleSubmit}>
        <div className='row mb-4'>
          <div className='col-12'>
            <h4 className='mt-4 mb-4'>
              <img src={donateImg1} alt='Donation' />
            </h4>
            <div className='row'>
              <div className='col-6'>
                <FormInput
                  name='first_name'
                  value={donor.first_name}
                  onChange={handleInputChange}
                  placeholder='Enter your first name'
                  label='First Name'
                  invalid={formValidate.first_name.invalid}
                  errorMessage={formValidate.first_name.errorMessage}
                />
              </div>
              <div className='col-6'>
                <FormInput
                  name='last_name'
                  value={donor.last_name}
                  onChange={handleInputChange}
                  placeholder='Enter your last name'
                  label='Last Name'
                  invalid={formValidate.last_name.invalid}
                  errorMessage={formValidate.last_name.errorMessage}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <FormInput
                  type='date'
                  name='date_of_birth'
                  value={donor.date_of_birth}
                  onChange={handleInputChange}
                  label='Date of Birth'
                  invalid={formValidate.date_of_birth.invalid}
                  errorMessage={formValidate.date_of_birth.errorMessage}
                />
              </div>
              <div className='col-6'>
                <label>Gender</label>
                <select
                  name='gender'
                  value={donor.gender}
                  onChange={handleInputChange}
                  className='form-select'
                >
                  <option value=''>Select Gender</option>
                  <option value='M'>Male</option>
                  <option value='F'>Female</option>
                </select>
                {formValidate.gender.invalid && (
                  <div className='text-danger'>{formValidate.gender.errorMessage}</div>
                )}
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <FormInput
                  name='mail_address'
                  value={donor.mail_address}
                  onChange={handleInputChange}
                  placeholder='Enter your email'
                  label='Email Address'
                  invalid={formValidate.mail_address.invalid}
                  errorMessage={formValidate.mail_address.errorMessage}
                />
              </div>
              <div className='col-6'>
                <FormInput
                  name='phone_number'
                  value={donor.phone_number}
                  onChange={handleInputChange}
                  placeholder='Enter your phone number'
                  label='Phone Number'
                  invalid={formValidate.phone_number.invalid}
                  errorMessage={formValidate.phone_number.errorMessage}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-4'>
                <label>Province/City</label>
                <CFormSelect
                  name='province_id'
                  value={donor.address.province_id}
                  onChange={handleAddressChange}
                >
                  <option value=''>Select Province/City</option>
                  {provinces.map((province) => (
                    <option key={province.province_id} value={province.province_id}>
                      {province.province_name}
                    </option>
                  ))}
                </CFormSelect>
                {addressValidate.province_id.invalid && (
                  <div className='text-danger'>{addressValidate.province_id.errorMessage}</div>
                )}
              </div>
              <div className='col-4'>
                <label>District</label>
                <CFormSelect
                  name='district_id'
                  value={donor.address.district_id}
                  onChange={handleAddressChange}
                >
                  <option value=''>Select District</option>
                  {districts.map((district) => (
                    <option key={district.district_id} value={district.district_id}>
                      {district.district_name}
                    </option>
                  ))}
                </CFormSelect>
                {addressValidate.district_id.invalid && (
                  <div className='text-danger'>{addressValidate.district_id.errorMessage}</div>
                )}
              </div>
              <div className='col-4'>
                <label>Ward</label>
                <CFormSelect
                  name='ward_id'
                  value={donor.address.ward_id}
                  onChange={handleAddressChange}
                >
                  <option value=''>Select Ward</option>
                  {wards.map((ward) => (
                    <option key={ward.ward_id} value={ward.ward_id}>
                      {ward.ward_name}
                    </option>
                  ))}
                </CFormSelect>
                {addressValidate.ward_id.invalid && (
                  <div className='text-danger'>{addressValidate.ward_id.errorMessage}</div>
                )}
              </div>
            </div>
            <FormInput
              name='address_detail'
              value={donor.address.address_detail}
              onChange={handleAddressChange}
              placeholder='Enter address detail'
              label='Address Detail'
            />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-12'>
            <h4 className='mt-4 mb-4'>
              <img src={donateImg2} alt='Donation' />
            </h4>
            <div className='form-check'>
              <input
                type='checkbox'
                className='form-check-input'
                id='donorCheck'
                checked={donorCheckState}
                onChange={handleDonorStateChange}
              />
              <label className='form-check-label' htmlFor='donorCheck'>
                Save donor information
              </label>
            </div>
            <div className='form-group'>
              <label>Donation Purpose</label>
              <CFormSelect
                name='purpose_id'
                value={purposeId}
                onChange={handlePurposeChange}
              >
                {donationPurposes.map((purpose) => (
                  <option key={purpose.code} value={purpose.code}>
                    {purpose.name}
                  </option>
                ))}
              </CFormSelect>
            </div>
            {purposeId === '2' && (
              <div className='form-group'>
                <label>Family</label>
                <CFormSelect
                  name='family_id'
                  value={familyId}
                  onChange={(e) => setFamilyId(e.target.value)}
                >
                  <option value=''>Select Family</option>
                  {families.map((family) => (
                    <option key={family.family_id} value={family.family_id}>
                      {family.family_name}
                    </option>
                  ))}
                </CFormSelect>
              </div>
            )}
            <div className='form-group'>
              <label>Donation Amount</label>
              <input
                type='number'
                className='form-control'
                value={amount}
                onChange={handleAmountChange}
              />
              {amountInvalid && (
                <div className='text-danger'>Amount should be greater than 100,000 VND</div>
              )}
            </div>
            <div className='form-group'>
              <label>Message</label>
              <textarea
                className='form-control'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Submit Donation
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default DonationForm
