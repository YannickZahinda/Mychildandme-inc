import React, { useState } from 'react'
import FormInput from '../forms/FormInput'
import { publicApi } from 'src/api/services'
import { useEffect } from 'react'
import validator from 'validator'
import { MaritalStatus } from 'src/constants/AdoptionCode'
import { invalid } from 'moment'

const AccountFirstApplicantForm = ({
  applicant,
  setApplicant,
  formData,
  setFormData,
  citizenFrontImage,
  setCitizenFrontImage,
  citizenBackImage,
  setCitizenBackImage,
  setFormValid,
}) => {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  useEffect(() => {
    let isValid = true

    isValid = !!formData.marital_status_id && !!citizenFrontImage && !!citizenBackImage
    setFormValid(isValid)
  }, [formData, citizenFrontImage, citizenBackImage])

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

  useEffect(() => {
    if (applicant.address.province_id && provinces.length) {
      const province = provinces.find(
        (province) => province.province_id == applicant.address.province_id,
      )
      setDistricts(province.districts)
    }
  }, [applicant.address.province_id, provinces])

  useEffect(() => {
    if (applicant.address.district_id && districts.length) {
      const district = districts.find(
        (district) => district.district_id == applicant.address.district_id,
      )
      setWards(district.wards)
    }
  }, [applicant.address.district_id, districts])

  const handleMaritalStatusChange = (event) => {
    const value = event.target.value
    setApplicant({
      ...applicant,
      marital_status_id: value,
    })
    setFormData({
      ...formData,
      marital_status_id: value,
    })
  }

  const handleFrontImageChange = (event) => {
    const file = event.target.files[0]
    setCitizenFrontImage(file)
  }

  const handleBackImageChange = (event) => {
    const file = event.target.files[0]
    setCitizenBackImage(file)
  }
  const inputs = [
    {
      type: 'text',
      id: 'inputApplicantFirstName',
      label: 'Nhập tên*',
      name: 'first_name',
      value: applicant.first_name,
      readOnly: true,
    },
    {
      type: 'text',
      id: 'inputApplicantLastName',
      label: 'Nhập họ và tên đệm*',
      name: 'last_name',
      value: applicant.last_name,
      readOnly: true,
    },
    {
      type: 'date',
      id: 'inputApplicantDOB',
      label: 'Nhập ngày sinh*',
      name: 'date_of_birth',
      value: applicant.date_of_birth,
      readOnly: true,
    },
    {
      type: 'text',
      id: 'inputApplicantNationality',
      label: 'Nhập quốc tịch*',
      name: 'nationality',
      value: applicant.nationality,
      readOnly: true,
    },
    {
      type: 'text',
      id: 'inputApplicantEthnicity',
      label: 'Nhập dân tộc*',
      name: 'ethnicity',
      value: applicant.ethnicity,
      readOnly: true,
    },
    {
      type: 'text',
      id: 'inputApplicantReligion',
      label: 'Nhập tôn giáo*',
      name: 'religion',
      value: applicant.religion,
      readOnly: true,
    },
    {
      type: 'select',
      id: 'inputApplicantGender',
      label: 'Chọn giới tính*',
      name: 'gender',
      value: applicant.gender,
      options: [
        { label: 'Nam', value: 1 },
        { label: 'Nữ', value: 2 },
        { label: 'Khác', value: 0 },
      ],
      readOnly: true,
    },
    {
      type: 'select',
      id: 'inputCitizsfsdenImg2',
      label: 'Chọn tình trạng hôn nhân*',
      value: applicant.marital_status_id,
      onChange: handleMaritalStatusChange,
      options: [
        { label: 'Chưa kết hôn', value: MaritalStatus.single.code },
        { label: 'Sống chung chưa kết hôn', value: MaritalStatus.engaged.code },
        { label: 'Đã có vợ/chồng', value: MaritalStatus.married.code },
        { label: 'Góa', value: MaritalStatus.widow.code },
        { label: 'Ly hôn hoặc ly thân', value: MaritalStatus.divorce.code },
      ],
    },
    {
      type: 'number',
      id: 'inputApplicantPhone',
      label: 'Nhập số điện thoại*',
      name: 'phone_number',
      value: applicant.phone_number,
      readOnly: true,
    },
    {
      type: 'text',
      id: 'inputApplicantEmail',
      label: 'Nhập địa chỉ email*',
      name: 'mail_address',
      value: applicant.mail_address,
      readOnly: true,
    },
    {
      type: 'select',
      id: 'inputProvinceId',
      label: 'Chọn Tỉnh/Thành phố*',
      name: 'province_id',
      value: applicant.address.province_id,
      options: provinces.map((province) => ({
        label: province.province_name,
        value: province.province_id,
      })),
      readOnly: true,
    },
    {
      type: 'select',
      id: 'inputDistrictId',
      label: 'Chọn Quận/Huyện*',
      name: 'district_id',
      value: applicant.address.district_id,
      options: districts.map((district) => ({
        label: district.district_name,
        value: district.district_id,
      })),
      readOnly: true,
    },
    {
      type: 'select',
      id: 'inputWardId',
      label: 'Chọn Phường/Xã*',
      name: 'ward_id',
      value: applicant.address.ward_id,
      options: wards.map((ward) => ({
        label: ward.ward_name,
        value: ward.ward_id,
      })),
      readOnly: true,
    },
    {
      type: 'text',
      id: 'inputAddressDetail',
      label: 'Địa chỉ chi tiết',
      name: 'address_detail',
      value: applicant.address.address_detail,
      readOnly: true,
    },
    {
      col: 12,
      type: 'number',
      id: 'inputApplicantCitizen',
      label: 'Nhập số căn cước công dân*',
      name: 'citizen_id_number',
      value: applicant.citizen_id_number,
      readOnly: true,
    },
    {
      formLabel: 'Chọn ảnh CCCD mặc trước*',
      type: 'file',
      id: 'inputCitizenImg1',
      label: 'Chọn ảnh CCCD mặc trước*',
      onChange: handleFrontImageChange,
    },
    {
      formLabel: 'Chọn ảnh CCCD mặc sau*',
      type: 'file',
      id: 'inputCitizenImg2',
      label: 'Chọn ảnh CCCD mặc sau*',
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

export default AccountFirstApplicantForm
