import React, { Component } from 'react'
import { CCardImage } from '@coreui/react'
import ReactImg from '../../assets/brand/logo2.png'
import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useEffect } from 'react'

// import Link from 'next/link'

const NavHeader = () => {
  // constructor() {
  //   super()
  //   this.state = {
  //     sticky: false,
  //   }
  // }

  const location = useLocation()

  const { auth } = useAuth()

  const [state, setState] = useState(false)

  const [sideNavState, setSideNavState] = useState(false)
  useEffect(() => {
    setSideNavState(false)
    window.scrollTo(0, 0)
  }, [location])

  const componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)

    //Mobile Menu
    this.mobileMenu()
  }

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setState(true)
    } else if (window.scrollY < 100) {
      setState(false)
    }
  }

  useEffect(() => {
    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll)

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  // const mobileMenu = () => {
  //   //Mobile Menu Toggle
  //   let mainNavToggler = document.querySelector('.mobile-menu-toggle')
  //   let mainNav = document.querySelector('.side-nav-container')

  //   mainNavToggler.addEventListener('click', function () {
  //     mainNav.classList.add('active')
  //   })

  //   //Close Mobile Menu
  //   let closeMenu = document.querySelector('.side-menu-close')
  //   closeMenu.addEventListener('click', function () {
  //     mainNav.classList.remove('active')
  //   })
  // }

  return (
    <div>
      <header className="header-area">
        <div className="header-top-action">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="top-action-content">
                  <div className="info-box info-box-1 d-flex align-items-center">
                    <ul className="d-flex align-items-center">
                      <li>
                        <a to="#">
                          <i className="fa fa-envelope"></i>needhelp@orphanage.com
                        </a>
                      </li>
                      <li>
                        <a to="#">
                          <i className="fa fa-phone-square"></i>012 345 6789
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="top-action-content info-action-content">
                  <div className="info-box info-box-2 d-flex align-items-center justify-content-end">
                    <ul className="top-action-list d-flex align-items-center">
                      {auth?.accessToken ? (
                        <>
                          <li className="action__text">
                            <a href="/logout">Đăng xuất</a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="action__text">
                            <a href="/login">Đăng nhập</a>
                          </li>
                          <li className="action__text">
                            <a href="/register">Đăng ký</a>
                          </li>
                        </>
                      )}

                      <li>
                        <a to="#">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a to="#">
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a to="#">
                          <i className="fa fa-pinterest"></i>
                        </a>
                      </li>
                      <li>
                        <a to="#">
                          <i className="fa fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`header-top header-menu-action ${state ? 'header-fixed' : ''}`}>
          <div className="container">
            <div className="row ostion-top-wrap">
              <div className="col-lg-5 col-sm-5 site-branding">
                <div className="logo-action d-flex align-items-center justify-content-between">
                  <div className="ostion-logo">
                    <NavLink to="/">
                      <CCardImage
                        className="sidebar-brand-full"
                        orientation="bottom"
                        src={ReactImg}
                      />
                    </NavLink>
                  </div>
                  <div className="header-btn ml-auto">
                    <NavLink to="/donation" className="theme-btn active">
                      <span className="text-truncate">Tài trợ ngay</span>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-sm-7 ostion-menu">
                <div className="ostion-menu-innner">
                  <div className="ostion-menu-content">
                    <div className="navigation-top">
                      <nav className="main-navigation">
                        <ul>
                          <li className="active">
                            <NavLink to="/home">Trang chủ</NavLink>
                          </li>
                          <li>
                            <NavLink>Giới thiệu</NavLink>
                            <ul className="dropdown-menu-item">
                              <li>
                                <NavLink to="/about">Về chúng tôi</NavLink>
                              </li>
                              <li>
                                <NavLink to="/causes-detail">Mô hình hoạt động</NavLink>
                              </li>
                              <li>
                                <NavLink to="/q&a">Câu hỏi thường gặp</NavLink>
                              </li>
                              <li>
                                <NavLink to="/contact">Liên hệ</NavLink>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <NavLink>Tin tức</NavLink>
                            <ul className="dropdown-menu-item">
                              <li>
                                <NavLink to="/events">Tin tức cập nhật</NavLink>
                              </li>
                              <li>
                                <NavLink to="/events-detail">events detail</NavLink>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <NavLink>Giúp đỡ</NavLink>
                            <ul className="dropdown-menu-item">
                              <li>
                                <NavLink to="/donation/programs">Chiến dịch tài trợ</NavLink>
                              </li>
                              <li>
                                <NavLink to="/posts/families">Tài trợ gia đình</NavLink>
                              </li>
                              <li>
                                <NavLink to="/donation">Trở thành Tình nguyện viên</NavLink>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <NavLink>Thông tin</NavLink>
                            <ul className="dropdown-menu-item">
                              <li>
                                <NavLink to="/adoption">Đăng ký nhận thông tin trẻ</NavLink>
                              </li>
                              <li>
                                <NavLink to="/donation/tracking">Tra cứu tài trợ</NavLink>
                              </li>
                              <li>
                                <NavLink to="/volunteer">Văn bản - tài liệu</NavLink>
                              </li>
                              <li>
                                <NavLink to="/donation/list">Danh sách tài trợ</NavLink>
                              </li>
                              <li>
                                <NavLink to="/sponsor">Thư viện ảnh</NavLink>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <NavLink to="/blog">Blog</NavLink>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div
                    className="mobile-menu-toggle"
                    onClick={() => {
                      setSideNavState(!sideNavState)
                    }}
                  >
                    <i className="fa fa-bars"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={sideNavState ? 'side-nav-container active' : 'side-nav-container'}>
          <div className="humburger-menu">
            <div
              className="humburger-menu-lines side-menu-close"
              onClick={() => {
                setSideNavState(false)
              }}
            ></div>
          </div>
          <div className="side-menu-wrap">
            {/* <div className="">
              <NavLink to="/donate" className="theme-btn">
                Tài trợ ngay
              </NavLink>
            </div> */}
            <ul className="side-menu-ul">
              <li className="sidenav__item">
                <NavLink to="/home">Trang chủ</NavLink>
              </li>
              <li className="sidenav__item">
                <NavLink>Giới thiệu</NavLink>
                <span className="menu-plus-icon"></span>
                <ul className="side-sub-menu">
                  <li>
                    <NavLink to="/about">Về chúng tôi</NavLink>
                  </li>
                  <li>
                    <NavLink to="/causes-detail">Mô hình hoạt động</NavLink>
                  </li>
                  <li>
                    <NavLink to="/donate">Báo cáo tài chính</NavLink>
                  </li>
                </ul>
              </li>
              <li className="sidenav__item">
                <NavLink>Tin tức</NavLink>
                <span className="menu-plus-icon"></span>
                <ul className="side-sub-menu">
                  <li>
                    <NavLink to="/events">events</NavLink>
                  </li>
                  <li>
                    <NavLink to="/events-detail">events detail</NavLink>
                  </li>
                </ul>
              </li>
              <li className="sidenav__item">
                <NavLink>Giúp đỡ</NavLink>
                <span className="menu-plus-icon"></span>
                <ul className="side-sub-menu">
                  <li>
                    <NavLink to="/news">news</NavLink>
                  </li>
                  <li>
                    <NavLink to="/single-news">news detail</NavLink>
                  </li>
                </ul>
              </li>
              <li className="sidenav__item">
                <NavLink>Nhận nuôi</NavLink>
                <span className="menu-plus-icon"></span>
                <ul className="side-sub-menu">
                  <li>
                    <NavLink to="/adoption">Đăng ký nhận thông tin trẻ</NavLink>
                  </li>
                  <li>
                    <NavLink to="/gallery">gallery</NavLink>
                  </li>
                  <li>
                    <NavLink to="/volunteer">become a volunteer</NavLink>
                  </li>
                  <li>
                    <NavLink to="/team">our team</NavLink>
                  </li>
                  <li>
                    <NavLink to="/sponsor">sponsors</NavLink>
                  </li>
                </ul>
              </li>
              <li className="sidenav__item">
                <NavLink to="/contact">Liên hệ</NavLink>
              </li>
            </ul>
            <ul className="side-social">
              <li>
                <NavLink>
                  <i className="fa fa-facebook"></i>
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <i className="fa fa-twitter"></i>
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <i className="fa fa-youtube-play"></i>
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <i className="fa fa-google-plus"></i>
                </NavLink>
              </li>
            </ul>
            {/* <div className="side-btn">
              <NavLink to="/donate" className="theme-btn">
                Tài trợ ngay
              </NavLink>
            </div> */}
          </div>
        </div>
      </header>
    </div>
  )
}

export default NavHeader
