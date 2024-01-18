import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/Defaultlayout'
import { Component } from 'react'
import Register from './pages/Register'
import '../src/public/css/custom.css'
import VerifyAccount from './pages/VerifyAccount'
import VerifyApplicantAccount from './pages/VerifyApplicantAccount'
import Login from './pages/Login'
import PersistLogin from './components/persistlogin/PersistLogin'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/activation" element={<VerifyAccount />} />
              <Route path="/applicant/activation" element={<VerifyApplicantAccount />} />
              <Route path="*" element={<DefaultLayout />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
