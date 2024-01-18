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

const VerifyApplicantAccount = () => {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const email = urlSearchParams.get('email')
  let token = urlSearchParams.get('token')

  const [errorState, setErrorState] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getVerifyInfor = async () => {
      try {
        token = token.replace(/ /g, '+')
        const data = {
          email: email,
          token: token,
        }
        const response = await authApi.activeApplicantAccount(JSON.stringify(data))

        setErrorMessage('Tài khoản của bạn đã được kích hoạt thành công!')
        setErrorState(true)
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

    if (email && token) {
      getVerifyInfor()
    } else {
      setErrorMessage('Quá trình kích hoạt tài khoản xảy ra lỗi. Vui lòng kiểm tra lại đường dẫn!')
      setErrorState(true)
    }
  }, [email, token])

  return (
    <>
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
        <h1 className="text-center">Xác thực tài khoản</h1>
        <div className="d-flex justify-content-center mb-3">
          <div className="mt-3 p-4 bg-info text-red d-flex text-white align-items-center gap-2">
            <span>{errorMessage}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyApplicantAccount
