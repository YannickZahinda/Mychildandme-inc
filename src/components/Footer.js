import React, { Component } from 'react'
import sectionicon from '../public/images/section-icon.png'
import { FaAccessibleIcon, FaCommentAlt } from 'react-icons/fa'
import ChatbotModal from './modals/ChatbotModal'

class Footer extends Component {
  constructor() {
    super()
    this.state = {
      scrollBtn: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (window.scrollY > 100) {
      this.setState({
        scrollBtn: true,
      })
    } else if (window.scrollY < 100) {
      this.setState({
        scrollBtn: false,
      })
    }
  }

  scrollTop = () => {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <section className="footer-area">
          <div className="newsletter-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 mx-auto text-center">
                  <div className="section-heading footer-heading">
                    <div className="section-icon">
                      <img src={sectionicon} alt="section-icon" />
                    </div>
                    <h2 className="section__title text__white">Bản tin</h2>
                    <p className="section__meta">nhận thông tin cập nhật</p>
                  </div>
                  <div className="newsletter-form">
                    <div className="form-shared">
                      <form action="">
                        <div className="row">
                          <div className="col-lg-9">
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Địa chỉ email"
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <button className="theme-btn submit__btn" type="submit">
                              Gửi
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-top">
            <div className="container">
              <div className="row footer-widget-wrap">
                <div className="col footer-item footer-item1">
                  <h3 className="widget__title">Thông tin liên lạc</h3>
                  <ul className="foot__links">
                    <li>
                      <strong>Làng trẻ em SOS Đà Nẵng</strong>
                      <p>
                        Địa chỉ: K142 đường Lê Văn Hiến, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng
                      </p>
                      <p>Tel: 0236.3.836.199</p>
                      <p>Email: orphanange@gmail.org</p>
                    </li>
                  </ul>
                </div>
                <div className="col footer-item footer-item3">
                  <h3 className="widget__title">Liên kết</h3>
                  <ul className="foot__links">
                    <li>
                      <a href="#">Tài liệu</a>
                    </li>
                    <li>
                      <a href="#">Chính sách bảo mật</a>
                    </li>
                    <li>
                      <a href="#">Điều khoản sử dụng</a>
                    </li>
                  </ul>
                </div>
                <div className="col footer-item footer-item3">
                  <h3 className="widget__title">Thông tin minh bạch</h3>
                  <ul className="foot__links">
                    <li>
                      <a href="#">Báo cáo tài chính</a>
                    </li>
                    <li>
                      <a href="#">Thông tin người đỡ đầu</a>
                    </li>
                    <li>
                      <a href="#">Thông tin nhà tài trợ</a>
                    </li>
                  </ul>
                </div>
                <div className="col footer-item footer-item4">
                  <h3 className="widget__title">Media</h3>
                  <div className="footer__social">
                    <ul>
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
          <div className="footer-copyright">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="copyright-desc">
                    <p>
                      © Copyright 2023 by <a href="#">orphanage.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ChatbotModal />

        {/* <div
          onClick={this.scrollTop}
          id="back-to-top"
          className={this.state.scrollBtn ? 'back-btn-shown' : ''}
        >
          <i className="fa fa-angle-up" title="Go top"></i>
        </div> */}
      </div>
    )
  }
}

export default Footer
