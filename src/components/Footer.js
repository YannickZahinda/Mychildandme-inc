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
                    <h2 className="section__title text__white">Newsletter</h2>
                    <p className="section__meta">Receive updates</p>
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
                              Send
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
                  <h3 className="widget__title">Contact information</h3>
                  <ul className="foot__links">
                    <li>
                      <strong>SOS Children's Village</strong>
                      <p>
                      Address: K142 IBANDA Bukavu/
                      </p>
                      <p>Tel: +1(773) 431-1269</p>
                      <p>Email: mychildandme@gmail.org</p>
                    </li>
                  </ul>
                </div>
                <div className="col footer-item footer-item3">
                  <h3 className="widget__title">Link</h3>
                  <ul className="foot__links">
                    <li>
                      <a href="#">Documents</a>
                    </li>
                    <li>
                      <a href="#">Privacy policy</a>
                    </li>
                    <li>
                      <a href="#">Terms of use</a>
                    </li>
                  </ul>
                </div>
                <div className="col footer-item footer-item3">
                  <h3 className="widget__title">Transparency information</h3>
                  <ul className="foot__links">
                    <li>
                      <a href="#">Financial report</a>
                    </li>
                    <li>
                      <a href="#">Sponsor information</a>
                    </li>
                    <li>
                      <a href="#">Donor information</a>
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
                      © Copyright 2023 by <a href="#">mychildandme.org</a>
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
