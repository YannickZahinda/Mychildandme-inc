import React, { useState } from 'react'
import FormInput from '../forms/FormInput'
import { publicApi } from 'src/api/services'
import { useEffect } from 'react'

const AccountSpouseForm = ({ spouse, setSpouse, formValid, setFormValid }) => {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

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
    if (spouse.address.province_id && provinces.length) {
      const province = provinces.find(
        (province) => province.province_id == spouse.address.province_id,
      )
      setDistricts(province.districts)
    }
  }, [spouse?.address.province_id, provinces])

  // Init wards select options
  useEffect(() => {
    if (spouse.address.district_id && districts.length) {
      const district = districts.find(
        (district) => district.district_id == spouse.address.district_id,
      )
      setWards(district.wards)
    }
  }, [spouse?.address.district_id, districts])

  const inputs = [
    {
      type: 'text',
      id: 'inputspouseFirstName',
      label: 'Nhập tên*',
      name: 'first_name',
      value: spouse.first_name,
      readOnly: true,
    },
    {
      type: 'text',
      id: 'inputspouseLastName',
      label: 'Nhập họ và tên đệm*',
      name: 'last_name',
      value: spouse.last_name,
      readOnly: true,
    },
    {
      type: 'date',
      id: 'inputspouseDOB',
      label: 'Nhập ngày sinh*',
      name: 'date_of_birth',
      value: spouse.date_of_birth,
      readOnly: true,
    },
    {
      type: 'text',
      id: 'inputspouseNationality',
      label: 'Nhập quốc tịch*',
      name: 'nationality',
      value: spouse.nationality,
      readOnly: true,
    },
    {
      type: 'text',
      id: 'inputspouseEthnicity',
      label: 'Nhập dân tộc*',
      name: 'ethnicity',
      value: spouse.ethnicity,
      readOnly: true,
    },
    {
      type: 'text',
      id: 'inputspouseReligion',
      label: 'Nhập tôn giáo*',
      name: 'religion',
      value: spouse.religion,
      readOnly: true,
    },
    {
      type: 'select',
      id: 'inputspouseGender',
      label: 'Chọn giới tính*',
      name: 'gender',
      value: spouse.gender,
      options: [
        { label: 'Nam', value: 1 },
        { label: 'Nữ', value: 2 },
        { label: 'Khác', value: 0 },
      ],
      readOnly: true,
    },
    {
      type: 'number',
      id: 'inputspousePhone',
      label: 'Nhập số điện thoại*',
      name: 'phone_number',
      value: spouse.phone_number,
      readOnly: true,
    },
    {
      type: 'text',
      id: 'inputspouseEmail',
      label: 'Nhập địa chỉ email*',
      name: 'mail_address',
      value: spouse.mail_address,
      readOnly: true,
    },
    {
      type: 'number',
      id: 'inputSpouseCitizen',
      label: 'Nhập số căn cước công dân*',
      name: 'citizen_id_number',
      value: spouse.citizen_id_number,
      readOnly: true,
    },
    {
      type: 'select',
      id: 'inputProvinceId',
      label: 'Chọn Tỉnh/Thành phố*',
      name: 'province_id',
      value: spouse.address.province_id,
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
      value: spouse.address.district_id,
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
      value: spouse.address.ward_id,
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
      readOnly: true,
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

export default AccountSpouseForm
