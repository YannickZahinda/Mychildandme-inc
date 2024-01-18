import React, { useEffect, useState } from 'react'
import { CFormInput, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import validator from 'validator'
import { DateTimePicker } from '@mui/x-date-pickers'
import { parseISO, startOfDay } from 'date-fns'
import { addDays } from 'date-fns'

const AppointmentModal = ({ isVisible, setVisible, handleSubmit }) => {
  const currentDate = new Date()
  const minDate = addDays(currentDate, 7)
  const maxDate = addDays(currentDate, 30)

  const [data, setData] = useState({
    start_date_time: '',
    end_date_time: '',
    attendees: '',
    reason: '',
  })
  const [formValidate, setFormValidate] = useState({
    start_date_time: {
      invalid: false,
      errorMessage: 'Vui lòng chọn ngày bắt đầu',
    },
    end_date_time: {
      invalid: false,
      errorMessage: 'Vui lòng chọn ngày kết thúc',
    },
    attendees: {
      invalid: false,
      errorMessage: 'Điền số người tham gia',
    },
    reason: {
      invalid: false,
      errorMessage: 'Điền chi tiết (lý do, lời nhắn)',
    },
  })
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (!isVisible) {
      setData({
        start_date_time: '',
        end_date_time: '',
        attendees: '',
        reason: '',
      })
    }
  }, [isVisible])

  useEffect(() => {
    let isValid = true

    isValid = data.start_date_time && data.end_date_time && data.attendees && data.reason

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
      case 'attendees':
        if (value <= 0) {
          isFieldValid = true
        } else {
          isFieldValid = false
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
          <div className="col-md-12 text-justify pr-4">
            <p>
              <i>
                Vui lòng điền vào các trường bên dưới để đăng ký lịch hẹn tại trại trẻ của chúng
                tôi.
              </i>
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-dark mb-4 event-headline">Thông tin lịch hẹn</div>
          <div className="form-shared">
            <form action="#">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group w-100">
                    <DateTimePicker
                      className="w-100"
                      label="Chọn thời gian bắt đầu"
                      views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                      value={data.start_date_time}
                      orientation="landscape"
                      minDateTime={startOfDay(minDate)}
                      maxDateTime={maxDate}
                      onChange={(newValue) =>
                        setData({
                          ...data,
                          start_date_time: newValue,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group w-100">
                    <DateTimePicker
                      className="w-100"
                      label="Chọn thời gian kết thúc"
                      views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                      value={parseISO(data.end_date_time)}
                      minDateTime={data.start_date_time}
                      maxDateTime={addDays(startOfDay(data.start_date_time), 1)}
                      orientation="landscape"
                      onChange={(newValue) =>
                        setData({
                          ...data,
                          end_date_time: newValue,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group w-100">
                    <CFormInput
                      type="number"
                      name="attendees"
                      value={data.attendees}
                      invalid={formValidate.attendees.invalid}
                      placeholder="Số lượng*"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group w-100">
                    <textarea
                      className="textarea h-auto w-100 p-3"
                      value={data.reason}
                      name="reason"
                      placeholder="Hãy nhập chi tiết về lịch hẹn của bạn (mục đích, lời nhắn, ...)"
                      rows={5}
                      invalid={formValidate.reason.invalid}
                      onChange={handleInputChange}
                    />
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
            GỬI
          </button>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default AppointmentModal
