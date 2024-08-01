import React, { useEffect, useState } from 'react'
import {
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import validator from 'validator'

const CreateVolunteerModal = ({ isVisible, setVisible, handleSubmit }) => {
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: null,
    mail_address: '',
    phone_number: '',
    biography: '',
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
    gender: {
      invalid: false,
      errorMessage: 'Please select your gender',
    },
    mail_address: {
      invalid: false,
      errorMessage: 'Invalid email address',
    },
    phone_number: {
      invalid: false,
      errorMessage: 'Invalid phone number',
    },
    biography: {
      invalid: false,
      errorMessage: 'Please enter your biography',
    },
  });
  
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (!isVisible) {
      setData({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: null,
        mail_address: '',
        phone_number: '',
        biography: '',
      })
    }
  }, [isVisible])

  useEffect(() => {
    let isValid = true

    isValid =
      data.first_name &&
      data.last_name &&
      data.date_of_birth &&
      data.gender &&
      data.phone_number &&
      data.mail_address &&
      data.biography

    if (isValid) {
      for (const fieldName of Object.keys(formValidate)) {
        if (formValidate[fieldName].invalid) {
          isValid = false
          break
        }
      }
    }

    setFormValid(isValid)
  }, [data, formValidate])
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
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
  return (
    <CModal
      backdrop="static"
      alignment="center"
      size="lg"
      visible={isVisible}
      onClose={() => setVisible()}
    >
      <CModalHeader className="border-0 pb-0">
        <CModalTitle></CModalTitle>
      </CModalHeader>
      <CModalBody className="">
        <div className="text-dark row">
          <div className="col-md-6 text-justify pr-4">
            <p>
              <i>
              Please fill out the fields below to register for participating in the volunteer event at our children's home.
              </i>
            </p>
          </div>
          <div className="col-md-6 text-justify pl-4">
            <p>
              <i>
                Or <a href="#">Login</a> to the account you created on the website. Don’t have an account? <a href="#">Register</a> Now.
              </i>
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-dark mb-3 event-headline">Thông tin cá nhân</div>
          <div className="form-shared">
            <form action="#">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group w-100">
                    <CFormInput
                      type="text"
                      name="last_name"
                      value={data.last_name}
                      invalid={formValidate.last_name.invalid}
                      placeholder="Họ và tên đệm*"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group w-100">
                    <CFormInput
                      type="text"
                      name="first_name"
                      value={data.first_name}
                      invalid={formValidate.first_name.invalid}
                      placeholder="Tên*"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group w-100">
                    <CFormSelect
                      name="gender"
                      className="form-select-custom"
                      value={data.gender}
                      invalid={formValidate.gender.invalid}
                      onChange={handleInputChange}
                    >
                      <option disabled selected>
                        Gender*
                      </option>
                      <option value={1}>Male</option>
                      <option value={2}>Female</option>
                    </CFormSelect>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group w-100">
                    <CFormInput
                      type="date"
                      name="date_of_birth"
                      value={data.date_of_birth}
                      invalid={formValidate.date_of_birth.invalid}
                      placeholder="Date of birth*"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group w-100">
                    <CFormInput
                      type="text"
                      name="mail_address"
                      value={data.mail_address}
                      invalid={formValidate.mail_address.invalid}
                      placeholder="Email address*"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group w-100">
                    <CFormInput
                      type="number"
                      name="phone_number"
                      value={data.phone_number}
                      invalid={formValidate.phone_number.invalid}
                      placeholder="Phone number*"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group w-100">
                    <textarea
                      className="textarea h-auto w-100 p-3"
                      value={data.biography}
                      name="biography"
                      placeholder="Please describe yourself to help us assess whether you are suitable to participate in the volunteer activities."
                      rows={5}
                      invalid={formValidate.biography.invalid}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="main-btn"
            disabled={!formValid}
            onClick={() => {
              handleSubmit(data)
            }}
          >
            SEND
          </button>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default CreateVolunteerModal
