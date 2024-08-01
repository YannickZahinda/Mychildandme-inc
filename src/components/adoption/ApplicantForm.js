import React, { useState } from 'react'
import FormInput from '../forms/FormInput'
import { publicApi } from 'src/api/services'
import { useEffect } from 'react'
import validator from 'validator'

const ApplicantForm = ({
  applicant,
  setApplicant,
  citizenFrontImage,
  setCitizenFrontImage,
  citizenBackImage,
  setCitizenBackImage,
  formValid,
  setFormValid,
}) => {
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
    ethnicity: {
      invalid: false,
      errorMessage: 'Please enter ethnicity',
    },
    nationality: {
      invalid: false,
      errorMessage: 'Please enter nationality',
    },
    religion: {
      invalid: false,
      errorMessage: 'Please enter religion',
    },
    mail_address: {
      invalid: false,
      errorMessage: 'Invalid email address',
    },
    phone_number: {
      invalid: false,
      errorMessage: 'Invalid phone number',
    },
    citizen_id_number: {
      invalid: false,
      errorMessage: 'Invalid citizen ID number',
    },
    marital_status_id: {
      invalid: false,
      errorMessage: 'Please select marital status',
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

  useEffect(() => {
    let isValid = true

    isValid =
      applicant.first_name &&
      applicant.last_name &&
      applicant.date_of_birth &&
      applicant.gender &&
      applicant.nationality &&
      applicant.ethnicity &&
      applicant.religion &&
      applicant.phone_number &&
      applicant.mail_address &&
      applicant.citizen_id_number &&
      applicant.marital_status_id &&
      applicant.address.province_id &&
      applicant.address.district_id &&
      applicant.address.ward_id &&
      !!citizenFrontImage &&
      !!citizenBackImage

    if (isValid) {
      for (const fieldName of Object.keys(formValidate)) {
        if (formValidate[fieldName].invalid) {
          isValid = false
          break
        }
      }
    }

    setFormValid(isValid)
  }, [applicant, formValidate, citizenFrontImage, citizenBackImage])

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
    getProvinces()
  }, [])

  // Init districts select options
  useEffect(() => {
    if (applicant.address.province_id) {
      const province = provinces.find(
        (province) => province.province_id == applicant.address.province_id,
      )
      setDistricts(province.districts)
      setApplicant({
        ...applicant,
        address: {
          ...applicant.address,
          district_id: null,
          ward_id: null,
        },
      })
    }
  }, [applicant.address.province_id])

  // Init wards select options
  useEffect(() => {
    if (applicant.address.district_id) {
      const district = districts.find(
        (district) => district.district_id == applicant.address.district_id,
      )
      setWards(district.wards)
      setApplicant({
        ...applicant,
        address: {
          ...applicant.address,
          ward_id: null,
        },
      })
    }
  }, [applicant.address.district_id])

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

  const handleApplicantInputChange = (event) => {
    const { name, value } = event.target
    setApplicant({
      ...applicant,
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

  const handleApplicantAddressChange = (event) => {
    const { name, value } = event.target
    setApplicant({
      ...applicant,
      address: {
        ...applicant.address,
        [name]: value,
      },
    })
  }

  const handleFrontImageChange = (event) => {
    const file = event.target.files[0]
    setCitizenFrontImage(file)
    // if (file && file.size > 10 * 1024 * 1024) {
    //   // 10MB
    //   setImageFileInvalid(true)
    //   setImageFileErrorMessage('File size must not exceed 10MB.')
    // } else {
    //   setImageFileInvalid(false)
    //   setImageFileErrorMessage('')
    // }
  }

  const handleBackImageChange = (event) => {
    const file = event.target.files[0]
    setCitizenBackImage(file)
    // if (file && file.size > 10 * 1024 * 1024) {
    //   // 10MB
    //   setImageFileInvalid(true)
    //   setImageFileErrorMessage('File size must not exceed 10MB.')
    // } else {
    //   setImageFileInvalid(false)
    //   setImageFileErrorMessage('')
    // }
  }
  const inputs = [
    {
      type: 'text',
      id: 'inputApplicantFirstName',
      label: 'Enter first name*',
      name: 'first_name',
      value: applicant.first_name,
      onChange: handleApplicantInputChange,
      invalid: formValidate.first_name.invalid,
      errorMessage: formValidate.first_name.errorMessage,
    },
    {
      type: 'text',
      id: 'inputApplicantLastName',
      label: 'Enter last name*',
      name: 'last_name',
      value: applicant.last_name,
      onChange: handleApplicantInputChange,
      invalid: formValidate.last_name.invalid,
      errorMessage: formValidate.last_name.errorMessage,
    },
    {
      type: 'date',
      id: 'inputApplicantDOB',
      label: 'Enter date of birth*',
      name: 'date_of_birth',
      value: applicant.date_of_birth,
      onChange: handleApplicantInputChange,
      invalid: formValidate.date_of_birth.invalid,
      errorMessage: formValidate.date_of_birth.errorMessage,
    },
    {
      type: 'text',
      id: 'inputApplicantNationality',
      label: 'Enter nationality*',
      name: 'nationality',
      value: applicant.nationality,
      onChange: handleApplicantInputChange,
      invalid: formValidate.nationality.invalid,
      errorMessage: formValidate.nationality.errorMessage,
    },
    {
      type: 'text',
      id: 'inputApplicantEthnicity',
      label: 'Enter ethnicity*',
      name: 'ethnicity',
      value: applicant.ethnicity,
      onChange: handleApplicantInputChange,
      invalid: formValidate.ethnicity.invalid,
      errorMessage: formValidate.ethnicity.errorMessage,
    },
    {
      type: 'text',
      id: 'inputApplicantReligion',
      label: 'Enter religion*',
      name: 'religion',
      value: applicant.religion,
      onChange: handleApplicantInputChange,
      invalid: formValidate.religion.invalid,
      errorMessage: formValidate.religion.errorMessage,
    },
    {
      type: 'select',
      id: 'inputApplicantGender',
      label: 'Select gender*',
      name: 'gender',
      value: applicant.gender,
      onChange: handleApplicantInputChange,
      invalid: formValidate.gender.invalid,
      errorMessage: formValidate.gender.errorMessage,
      options: [
        { label: 'Male', value: 1 },
        { label: 'Female', value: 2 },
        { label: 'Other', value: 0 },
      ],
    },
    {
      type: 'select',
      id: 'inputApplicantMarital',
      label: 'Select marital status*',
      name: 'marital_status_id',
      value: applicant.marital_status_id,
      onChange: handleApplicantInputChange,
      invalid: formValidate.marital_status_id.invalid,
      errorMessage: formValidate.marital_status_id.errorMessage,
      options: [
        { label: 'Single', value: 1 },
        { label: 'Living together without marriage', value: 2 },
        { label: 'Married', value: 3 },
        { label: 'Widowed', value: 4 },
        { label: 'Divorced or separated', value: 5 },
      ],
    },
    {
      type: 'number',
      id: 'inputApplicantPhone',
      label: 'Enter phone number*',
      name: 'phone_number',
      value: applicant.phone_number,
      onChange: handleApplicantInputChange,
      invalid: formValidate.phone_number.invalid,
      errorMessage: formValidate.phone_number.errorMessage,
    },
    {
      type: 'text',
      id: 'inputApplicantEmail',
      label: 'Enter email address*',
      name: 'mail_address',
      value: applicant.mail_address,
      onChange: handleApplicantInputChange,
      invalid: formValidate.mail_address.invalid,
      errorMessage: formValidate.mail_address.errorMessage,
    },
    {
      type: 'select',
      id: 'inputProvinceId',
      label: 'Select Province/City*',
      name: 'province_id',
      value: applicant.address.province_id,
      onChange: handleApplicantAddressChange,
      options: provinces.map((province) => ({
        label: province.province_name,
        value: province.province_id,
      })),
    },
    {
      type: 'select',
      id: 'inputDistrictId',
      label: 'Select District*',
      name: 'district_id',
      value: applicant.address.district_id,
      onChange: handleApplicantAddressChange,
      options: districts.map((district) => ({
        label: district.district_name,
        value: district.district_id,
      })),
    },
    {
      type: 'select',
      id: 'inputWardId',
      label: 'Select Ward*',
      name: 'ward_id',
      value: applicant.address.ward_id,
      onChange: handleApplicantAddressChange,
      options: wards.map((ward) => ({
        label: ward.ward_name,
        value: ward.ward_id,
      })),
    },
    {
      type: 'text',
      id: 'inputAddressDetail',
      label: 'Detailed address',
      name: 'address_detail',
      value: applicant.address.address_detail,
      onChange: handleApplicantAddressChange,
    },
    {
      col: 12,
      type: 'number',
      id: 'inputApplicantCitizen',
      label: 'Enter citizen ID number*',
      name: 'citizen_id_number',
      value: applicant.citizen_id_number,
      onChange: handleApplicantInputChange,
      invalid: formValidate.citizen_id_number.invalid,
      errorMessage: formValidate.citizen_id_number.errorMessage,
    },
    {
      formLabel: 'Select front image of ID card*',
      type: 'file',
      id: 'inputCitizenImg1',
      label: 'Select front image of ID card*',
      onChange: handleFrontImageChange,
    },
    {
      formLabel: 'Select back image of ID card*',
      type: 'file',
      id: 'inputCitizenImg2',
      label: 'Select back image of ID card*',
      onChange: handleBackImageChange,
    },
  ]

  return (
    <>
      {inputs.map((input, index) => (
        <div key={index} className={input.col ? 'col-lg-' + input.col : 'col-lg-6'}>
          <div className="form-group">
            <FormInput key={input.id} {...input} />
          </div>
        </div>
      ))}
    </>
  )
}

export default ApplicantForm
