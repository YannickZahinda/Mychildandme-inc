import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardImage,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CRow,
} from '@coreui/react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import validator from 'validator'
import { authApi } from 'src/api/services'
import ReactImg from '../assets/brand/mwabana.png'
import useAuth from 'src/components/hooks/useAuth'
import ErrorModal from 'src/components/modals/ErrorModal'
import LoadingModal from 'src/components/modals/LoadingModal'

const Login = () => {
  const { auth, setAuth, setIsUnexpired } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailInvalid, setEmailInvalid] = useState(false)
  const [passwordInvalid, setPasswordInvalid] = useState(false)

  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const [validated, setValidated] = useState(false)
  const [errormodalVisible, setErrorModalVisible] = useState(false)
  const [errorModalMessage, setErrorModalMessage] = useState({
    modalTile: '',
    modalContent: '',
  })
  const [loadingModalVisible, setLoadingModalVisible] = useState(false)

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (!validator.isEmail(value)) {
      setEmailInvalid(true)
      setEmailErrorMessage('Invalid email!')
    } else {
      setEmailInvalid(false)
      setEmailErrorMessage()
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
  }

  const handleLoginBtnClick = async (event) => {
    event.preventDefault()
    setLoadingModalVisible(true)
    const data = {
      email: email,
      password: password,
    }
    try {
      const response = await authApi.login(JSON.stringify(data))
      const result = response.result

      const userId = result?.user_id
      const accessToken = result?.access_token
      const roles = result?.roles

      localStorage.setItem('user_id', userId)
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('roles', roles)

      setAuth({ userId, accessToken, roles })
      setIsUnexpired(true)
      setLoadingModalVisible(false)
      window.location.href = 'http://localhost:3001/'
    } catch (e) {
      console.log(e)
      setLoadingModalVisible(false)
      setErrorModalMessage((prevModalError) => ({
        ...prevModalError,
        modalTile: 'Error!',
        modalContent: 'Incorrect email or password.',
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
      <ErrorModal
        modalMessage={errorModalMessage}
        isVisible={errormodalVisible}
        setVisible={setErrorModalVisible}
      ></ErrorModal>
      <div className="bg-light min-vh-100 d-flex flex-row pt-5 justify-content-center">
        <CRow className="justify-content-center mt-5">
          <CCol lg={8} md={12} sm={12}>
            <CCardGroup>
              <CCard className="p-4 mx-2">
                <CCardBody>
                  <h1 className="text-center">Login</h1>
                  <CForm className="mt-3">
                    <div className="mb-4">
                      <CFormInput
                        value={email}
                        id="email"
                        type="email"
                        placeholder="Email address*"
                        autoComplete="current-email"
                        onChange={handleEmailChange}
                        invalid={emailInvalid}
                      />
                      <CFormFeedback invalid>{emailErrorMessage}</CFormFeedback>
                    </div>
                    <div className="mb-4">
                      <CFormInput
                        value={password}
                        id="password"
                        type="password"
                        placeholder="Password*"
                        onChange={handlePasswordChange}
                        autoComplete="current-password"
                        invalid={passwordInvalid}
                      />
                      <CFormFeedback invalid>{passwordErrorMessage}</CFormFeedback>
                    </div>
                    <CRow className="text-truncate">
                      <CCol md={6} xs={12}>
                        <CButton color="primary" className="px-4" onClick={handleLoginBtnClick}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol md={6} xs={12}>
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="mx-2 text-white bg-primary" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div className="d-flex flex-column justify-content-between h-100">
                    <div className="mb-3">
                      <Link to="/">
                        <CCardImage
                          className="sidebar-brand-full"
                          orientation="bottom"
                          src={ReactImg}
                        />
                      </Link>
                      <h2>Orphanage Website</h2>
                      <br></br>
                      <p>
                        We care for, support, and provide for orphaned, abandoned, and children in difficult situations. 
                      </p>
                      <p>needhelp@mychildandmeinc.org</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
                      <span>Don't have an account? </span>
                      <Link className="text-black" color="black" to="/register">
                        Register
                      </Link>
                      <span> now.</span>
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default Login
