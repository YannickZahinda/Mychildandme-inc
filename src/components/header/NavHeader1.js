import React, { Component } from 'react'
import { CCardImage } from '@coreui/react'
import ReactImg from '../../assets/brand/logo3.png'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useEffect } from 'react'
import { publicApi } from 'src/api/services'

const NavHeader1 = () => {
  const location = useLocation()
  const { auth } = useAuth()
  const [state, setState] = useState(false)
  const [articleCategories, setArticleCategories] = useState([])

  const [sideNavState, setSideNavState] = useState(false)
  useEffect(() => {
    setSideNavState(false)
    window.scrollTo(0, 0)
  }, [location])

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setState(true)
    } else if (window.scrollY < 100) {
      setState(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await publicApi.getArticileCategories()
        setArticleCategories(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    getCategories()
  }, [])

  return (
    <div>
      <header className="header-area header-area2 ">
        <div className="header-top-action">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="top-action-content">
                  <div className="info-box info-box-1 d-flex align-items-center">
                    <ul className="d-flex align-items-center">
                      <li>
                        <a href="#">
                          <i className="fa fa-envelope"></i>needhelp@oxpitan.com
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-phone-square"></i>666 888 0000
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
                            <a href="/accounts">Tài khoản</a>
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
                        <a href="#">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-pinterest"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
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
        <div className={`header-top header-menu-action  ${state ? 'header-fixed' : ''}`}>
          <div className="row ostion-top-wrap">
            <div className="col-lg-3 col-md-4 col-sm-5 col-6 site-branding">
              <div className="logo-action d-flex align-items-center justify-content-center">
                <div>
                  <NavLink to="../">
                    <CCardImage
                      className="sidebar-brand-full logo-img"
                      orientation="bottom"
                      src={ReactImg}
                    />
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-3 col-1 ostion-menu">
              <div className="ostion-menu-innner">
                <div className="ostion-menu-content justify-content-center">
                  <div className="navigation-top">
                    <nav className="main-navigation">
                      <ul>
                        <li className="active">
                          <NavLink className="text-white" to="/home">
                            Trang chủ
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="text-white">Giới thiệu</NavLink>
                          <ul className="dropdown-menu-item">
                            <li>
                              <NavLink to="/about">Về chúng tôi</NavLink>
                            </li>
                            <li>
                              <NavLink to="/faqs">Câu hỏi thường gặp</NavLink>
                            </li>
                            <li>
                              <NavLink to="/contact">Liên hệ</NavLink>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <NavLink className="text-white">Tin tức</NavLink>
                          <ul className="dropdown-menu-item">
                            {articleCategories.map((cate, index) => (
                              <li>
                                <NavLink
                                  to={
                                    '../article-categories/' +
                                    cate?.category_slug +
                                    '/' +
                                    cate.article_category_id
                                  }
                                >
                                  {cate.category_name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <NavLink className="text-white">Giúp đỡ</NavLink>
                          <ul className="dropdown-menu-item">
                            <li>
                              <NavLink to="/donation/programs">Chiến dịch tài trợ</NavLink>
                            </li>
                            <li>
                              <NavLink to="/posts/families">Tài trợ gia đình</NavLink>
                            </li>
                            <li>
                              <NavLink to="/volunteers/events">Tình nguyện viên</NavLink>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <NavLink className="text-white">Thông tin</NavLink>
                          <ul className="dropdown-menu-item">
                            <li>
                              <NavLink to="/adoption-info">Đăng ký nhận thông tin trẻ</NavLink>
                            </li>
                            <li>
                              <NavLink to="/donation/tracking">Tra cứu tài trợ</NavLink>
                            </li>
                            <li>
                              <NavLink to="/donation/list">Danh sách tài trợ</NavLink>
                            </li>
                            <li>
                              <NavLink to="/bank-info">Thông tin nhận chuyển khoản</NavLink>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-sm-2 col-3">
              <div className="header-btn ml-auto">
                <NavLink to="/donation" className="main-btn active">
                  <span className="text-truncate">Tài trợ ngay</span>
                </NavLink>
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
                    <NavLink to="/faqs">Câu hỏi thường gặp</NavLink>
                  </li>
                  <li className="sidenav__item">
                    <NavLink to="/contact">Liên hệ</NavLink>
                  </li>
                </ul>
              </li>
              <li className="sidenav__item">
                <NavLink>Tin tức</NavLink>
                <span className="menu-plus-icon"></span>
                <ul className="side-sub-menu">
                  {articleCategories.map((cate, index) => (
                    <li>
                      <NavLink
                        to={
                          '../article-categories/' +
                          cate?.category_slug +
                          '/' +
                          cate.article_category_id
                        }
                      >
                        {cate.category_name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="sidenav__item">
                <NavLink>Giúp đỡ</NavLink>
                <span className="menu-plus-icon"></span>
                <ul className="side-sub-menu">
                  <li>
                    <NavLink to="/donation/programs">Chiến dịch tài trợ</NavLink>
                  </li>
                  <li>
                    <NavLink to="/posts/families">Tài trợ gia đình</NavLink>
                  </li>
                  <li>
                    <NavLink to="/volunteers/events">Tình nguyện viên</NavLink>
                  </li>
                </ul>
              </li>
              <li className="sidenav__item">
                <NavLink>Thông tin</NavLink>
                <span className="menu-plus-icon"></span>
                <ul className="side-sub-menu">
                  <li>
                    <NavLink to="/adoption-info">Đăng ký nhận thông tin trẻ</NavLink>
                  </li>
                  <li>
                    <NavLink to="/donation/tracking">Tra cứu tài trợ</NavLink>
                  </li>
                  <li>
                    <NavLink to="/donation/list">Danh sách tài trợ</NavLink>
                  </li>
                  <li>
                    <NavLink to="/bank-info">Thông tin nhận chuyển khoản</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  )
}

export default NavHeader1
