import React, { useState, useEffect } from 'react'
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
import useAuth from '../hooks/useAuth'
import accountService from 'src/api/services/accountService'
import LoadingModal from '../modals/LoadingModal'

const AccountDonationForm = () => {
  const { auth } = useAuth()
  const accountApi = accountService()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const programId = searchParams.get('programId')
  const familyparamId = searchParams.get('familyId')

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

  const [message, setMessage] = useState('')

  const [amountIpState, setAmountIpState] = useState(false)
  const [amount, setAmount] = useState(300000)
  const [amountInvalid, setAmountInvalid] = useState(false)

  const [readOnlyState, setReadOnlyState] = useState(false)
  const [formValid, setFormValid] = useState(false)

  const [errormodalVisible, setErrorModalVisible] = useState(false)
  const [errorModalMessage, setErrorModalMessage] = useState({
    modalTitle: '',
    modalContent: '',
  })

  const [loadingModalVisible, setLoadingModalVisible] = useState(false)

  useEffect(() => {
    const getAccountDonorInfo = async () => {
      try {
        const response = await accountApi.getAccountDonorInfo(auth?.userId)
        setDonor(response.result)
        setReadOnlyState(true)
      } catch (error) {
        console.log(error)
      }
    }
    auth?.userId && getAccountDonorInfo()
  }, [auth])

  useEffect(() => {
    let isValid = message && !amountInvalid
    setFormValid(isValid)
  }, [donor, amount, message, amountInvalid])

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
    if (donor.address.province_id && provinces.length) {
      const province = provinces.find(
        (province) => province.province_id === donor.address.province_id,
      )
      setDistricts(province.districts)
    }
  }, [donor.address.province_id, provinces, readOnlyState])

  // Init wards select options
  useEffect(() => {
    if (donor.address.district_id && districts.length) {
      const district = districts.find(
        (district) => district.district_id === donor.address.district_id,
      )
      setWards(district?.wards)
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
    if (purposeId === 2 && families.length === 0) {
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
    if (donor?.is_first_time !== null) {
      setLoadingModalVisible(true)
      const data = {
        donor: donor,
        donation_purpose_id: purposeId,
        family_id: familyId,
        amount: amount,
        message: message,
        url_return: 'http://localhost:3001/donation/return',
      }
      try {
        if (donor?.is_first_time) {
          const response = await accountApi.accountAddNewDonation(auth.userId, JSON.stringify(data))
          setLoadingModalVisible(false)
          window.location.replace(response.result)
        } else {
          const response = await donationApi.donorDoDonate(donor.donor_id, JSON.stringify(data))
          setLoadingModalVisible(false)
          window.location.replace(response.result)
        }
      } catch (error) {
        setLoadingModalVisible(false)
        setErrorModalMessage((prevModalError) => ({
          ...prevModalError,
          modalTitle: 'Error',
          modalContent: 'An error occurred, please try again later',
        }))
        setErrorModalVisible(true)
      }
    } else {
      setErrorModalMessage((prevModalError) => ({
        ...prevModalError,
        modalTitle: 'Error',
        modalContent: 'An error occurred, please try again later',
      }))
      setErrorModalVisible(true)
    }
  }

  const inputs = [
    {
      type: 'text',
      id: 'inputdonorFirstName',
      label: 'Enter first name*',
      name: 'first_name',
      value: donor.first_name,
    },
    {
      type: 'text',
      id: 'inputdonorLastName',
      label: 'Enter last name*',
      name: 'last_name',
      value: donor.last_name,
    },
    {
      type: 'date',
      id: 'inputdonorDOB',
      label: 'Enter date of birth*',
      name: 'date_of_birth',
      value: donor.date_of_birth,
    },
    {
      type: 'select',
      id: 'inputdonorGender',
      label: 'Select gender*',
      name: 'gender',
      value: donor.gender,

      options: [
        { label: 'Male', value: 1 },
        { label: 'Female', value: 2 },
        { label: 'Other', value: 0 },
      ],
    },
    {
      type: 'number',
      id: 'inputdonorPhone',
      label: 'Enter phone number*',
      name: 'phone_number',
      value: donor.phone_number,
    },
    {
      type: 'text',
      id: 'inputdonorEmail',
      label: 'Enter email address*',
      name: 'mail_address',
      value: donor.mail_address,
    },
    {
      type: 'select',
      id: 'inputProvinceId',
      label: 'Select Province/City*',
      name: 'province_id',
      value: donor.address.province_id,
      options: provinces.map((province) => ({
        label: province.province_name,
        value: province.province_id,
      })),
    },
    {
      type: 'select',
      id: 'inputDistrictId',
      label: 'Select District/County*',
      name: 'district_id',
      value: donor.address.district_id,
      options: districts.map((district) => ({
        label: district.district_name,
        value: district.district_id,
      })),
    },
    {
      type: 'select',
      id: 'inputWardId',
      label: 'Select Ward/Commune*',
      name: 'ward_id',
      value: donor.address.ward_id,
      options: wards
        ? wards.map((ward) => ({
            label: ward.ward_name,
            value: ward.ward_id,
          }))
        : [],
    },
    {
      type: 'text',
      id: 'inputAddressDetail',
      label: 'Detailed address',
      name: 'address_detail',
      value: donor.address.address_detail,
    },
  ]

  return (
    <>
      <LoadingModal isVisible={loadingModalVisible} setVisible={setLoadingModalVisible} />
      <ErrorModal
        modalMessage={errorModalMessage}
        isVisible={errormodalVisible}
        setVisible={setErrorModalVisible}
      />
      <section className="contact-form-area register-area pt-5">
        <div className="container">
          <div className="row form-shared-wrap">
            <div className="col-lg-8">
              <h1 className="h1__form__title">Account Registration for Sponsorship</h1>
              <div>
                <h4 className="h__form__title mb-2">Donation Amount (VND)</h4>
                <div className="d-flex mb-4 gap-5">
                  <button
                    className={!amountIpState ? 'donate-amount-btn-active' : 'donate-amount-btn'}
                    onClick={() => {
                      setAmountIpState(false)
                      setAmount(300000)
                      setAmountInvalid(false)
                    }}
                  >
                    300,000 VND
                  </button>
                  <button
                    className={amountIpState ? 'donate-amount-btn-active' : 'donate-amount-btn'}
                    onClick={() => {
                      setAmountIpState(true)
                      setAmount(0)
                      setAmountInvalid(true)
                    }}
                  >
                    Other amount
                  </button>
                  {amountIpState && (
                    <div>
                      <input
                        className="inp-donate-amount d-block"
                        type="number"
                        placeholder="0 VND"
                        value={amount}
                        onChange={handleAmountChange}
                      />
                      <span>
                        <small>
                          <i>Minimum donation amount is 100,000 VND</i>
                        </small>
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="h__form__title mb-0">Sponsorship Campaign</h4>
                <span>
                  <small>
                    <i>
                      Click on
                      <NavLink to={'../donation/programs'}> this link </NavLink>
                      to view our sponsorship campaigns and how we use your donation.
                    </i>
                  </small>
                </span>
                <div className="form-shared mt-1">
                  <form action="#">
                    <div className="form-group">
                      <CFormSelect
                        id=""
                        name="donation_purpose"
                        value={purposeId}
                        onChange={handlePurposeChange}
                      >
                        {donationPurposes.map((purpose, index) => (
                          <option value={purpose.donation_purpose_id} key={index}>
                            {purpose.purpose}
                          </option>
                        ))}
                      </CFormSelect>
                    </div>
                  </form>
                </div>
                {purposeId === DonationPurpose.familyDonate.code && (
                  <>
                    <h4 className="h__form__title mb-0">Select the family to sponsor</h4>
                    <span>
                      <small>
                        <i>
                          Click on
                          <NavLink> this link </NavLink>
                          to view details about the families in our orphanage.
                        </i>
                      </small>
                    </span>
                    <div className="form-shared mt-1">
                      <form action="#">
                        <div className="form-group">
                          <CFormSelect
                            id="familySelect"
                            name="familySelect"
                            defaultValue={familyId}
                            value={familyId}
                            onChange={(e) => {
                              setFamilyId(e.target.value)
                            }}
                          >
                            {!familyId && <option value={''}>Select family *</option>}
                            {families.map((family, index) => (
                              <option value={family.family_id} key={index}>
                                {family.family_name}
                              </option>
                            ))}
                          </CFormSelect>
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </div>
              <div className="form-shared">
                <h3 className="h__form__title mb-2">Donor Information</h3>
                <small>
                  <i>Fields marked with * are required</i>
                </small>
                <form action="#">
                  <div className="row">
                    {inputs.map((input, index) => (
                      <div key={index} className={input.col ? 'col-lg-' + input.col : 'col-lg-12'}>
                        <div className="form-group">
                          <FormInput key={input.id} {...input} readOnly={readOnlyState} />
                        </div>
                      </div>
                    ))}
                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          className="textarea h-auto"
                          name="message"
                          placeholder="Message*"
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value)
                          }}
                          rows={3}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button
                        className="theme-btn submit__btn"
                        onClick={handleSubmit}
                        disabled={!formValid}
                      >
                        Donate
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar-shared">
                <div className="fun-content p-4 border rounded-lg">
                  <div className="section-heading mb-4">
                    <h4 className="section__desc">
                      Your donation, whether large or small, is important to us in our journey to bring smiles and a future to orphaned, abandoned, and children in special hardship.
                    </h4>
                  </div>
                  <div className="fun-item fun-item1">
                    <img className="rounded-lg mb-3" src={donateImg1} alt="" />
                    <img className="rounded-lg mb-3" src={donateImg2} alt="" />
                    <img className="rounded-lg mb-3" src={donateImg3} alt="" />
                    <img className="rounded-lg" src={donateImg4} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AccountDonationForm
