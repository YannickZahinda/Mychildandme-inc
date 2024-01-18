import React, { useEffect, useState } from 'react'
import { FaCaretDown, FaEdit, FaSignOutAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import accountService from 'src/api/services/accountService'
import useAuth from 'src/components/hooks/useAuth'
import AccountTab from 'src/components/tabs/AccountTab'
import avatarman from 'src/assets/images/avatar-profile-man.jpg'
import AdoptionHistoryTab from 'src/components/tabs/AdoptionHistoyTab'
import VolunteerHistoryTab from 'src/components/tabs/VolunteerHistoryTab'
import AppointmentTab from 'src/components/tabs/AppoinmentTab'

const AccountPage = () => {
  const accountApi = accountService()
  const [activeState, setActiveState] = useState(1)
  const { auth, setAuth } = useAuth()
  const [account, setAccount] = useState(null)
  const [viewMoreState, setViewMoreState] = useState(false)

  useEffect(() => {
    const getAccount = async () => {
      try {
        const response = await accountApi.getAccountDetail(auth.userId)
        setAccount(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    auth?.userId && getAccount()
  }, [auth])

  const handleLogoutBtnClick = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('access_token')
    localStorage.removeItem('roles')

    setAuth(null)
    // window.location.href = 'http://localhost:3001/home'
  }
  return (
    <>
      <section className="account-area">
        <div className="container account-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="account-content">
                <div className="account__title">
                  <h1 className="text-white mb-1">{account?.full_name}</h1>
                  <h6 className="text-white">Chào mừng đến với tài khoản của bạn</h6>
                </div>
                <nav className="navbar navbar-default account-navbar">
                  <div className="container-fluid">
                    <ul className="nav navbar-nav account-nav-bar">
                      <li
                        className={activeState === 1 ? 'active' : ''}
                        onClick={() => {
                          activeState !== 1 && setActiveState(1)
                        }}
                      >
                        <span>Tài khoản của bạn</span>
                      </li>
                      <li
                        className={activeState === 2 ? 'active' : ''}
                        onClick={() => {
                          activeState !== 2 && setActiveState(2)
                        }}
                      >
                        <span>Lịch sử tình nguyện</span>
                      </li>
                      <li
                        className={activeState === 3 ? 'active' : ''}
                        onClick={() => {
                          activeState !== 3 && setActiveState(3)
                        }}
                      >
                        <span>Lịch sử đăng ký nhận nuôi</span>
                      </li>
                      <li className="account-btn-more">
                        <NavLink
                          className="text-white d-flex gap-2"
                          onClick={() => setViewMoreState(!viewMoreState)}
                        >
                          <div className="account-btn-more-text">Xem thêm</div>
                          <div>
                            <FaCaretDown size={22} />
                          </div>
                        </NavLink>
                        {viewMoreState && (
                          <ul className="account-dropdown-menu-item">
                            <li
                              className={activeState === 1 ? 'active' : ''}
                              onClick={() => {
                                activeState !== 1 && setActiveState(1)
                              }}
                            >
                              <span>Tài khoản của bạn</span>
                            </li>
                            <li
                              className={activeState === 2 ? 'active' : ''}
                              onClick={() => {
                                activeState !== 2 && setActiveState(2)
                              }}
                            >
                              <span>Lịch sử tình nguyện</span>
                            </li>
                            <li
                              className={activeState === 3 ? 'active' : ''}
                              onClick={() => {
                                activeState !== 3 && setActiveState(3)
                              }}
                            >
                              <span>Lịch sử đăng ký nhận nuôi</span>
                            </li>
                            <li
                              className={activeState === 4 ? 'active' : ''}
                              on
                              onClick={() => {
                                activeState !== 4 && setActiveState(4)
                              }}
                            >
                              <span>Đăng ký lịch hẹn</span>
                            </li>
                          </ul>
                        )}
                      </li>
                      <li
                        className={activeState === 4 ? 'active' : ''}
                        on
                        onClick={() => {
                          activeState !== 4 && setActiveState(4)
                        }}
                      >
                        <span>Đăng ký lịch hẹn</span>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="causes-detail-area pt-5">
        <div className="container account-container">
          <div className="row account-wrapper">
            <div className="col-lg-12">
              <div className="section-avatar">
                <div className="custom-avatar">
                  <img src={avatarman} className="custom-avatar-xl" />
                </div>
                <div className="d-flex flex-column justify-content-center">
                  <h1 className="vol-event-title text-justify">{account?.full_name}</h1>
                  <div className="d-flex">
                    <NavLink onClick={handleLogoutBtnClick} className="d-flex align-items-center">
                      <FaSignOutAlt size={20} /> <span>Đăng xuất</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <>
          {activeState === 1 && <AccountTab account={account} />}
          {activeState === 2 && <VolunteerHistoryTab accountId={auth?.userId} />}
          {activeState === 3 && <AdoptionHistoryTab accountId={auth?.userId} />}
          {activeState === 4 && <AppointmentTab accountId={auth?.userId} />}
        </>
      </section>
    </>
  )
}

export default AccountPage
