import React, { useEffect, useState } from 'react'
import sectionicon from '../public/images/section-icon.png'
import { publicApi } from 'src/api/services'

const Contact = () => {
  const [contact, setContact] = useState(null)
  useEffect(() => {
    const getContact = async () => {
      try {
        const response = await publicApi.getWebsiteContact()
        setContact(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    getContact()
  }, [])
  return (
    <section className="contact-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-heading">
              <div className="section-icon">
                <img src={sectionicon} alt="section-icon" />
              </div>
              <h2 className="section__title">Contact Us</h2>
              <p className="section__meta">Leave a Message</p>
              <p className="section__desc">
                Let us listen to and support you. Whether you have questions, requests, or feedback,
                we are always ready to receive and respond. Our dedicated team is always ready to
                accompany you in creating a better world for orphaned children.
              </p>
              <ul className="section__list">
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
          <div className="col-lg-6">
            <div className="form-shared">
              <form action="#" method="post">
                <div className="row">
                  <div className="col-lg-6 col-sm-6 form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="col-lg-6 col-sm-6 form-group">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="col-lg-12 form-group">
                    <input
                      className="form-control"
                      type="number"
                      name="phone"
                      placeholder="Phone Number"
                    />
                  </div>

                  <div className="col-lg-12 col-sm-12 form-group">
                    <textarea className="textarea" name="message" placeholder="Message"></textarea>
                  </div>

                  <div className="col-lg-12 col-sm-12">
                    <button className="theme-btn submit__btn" type="submit">
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row contact-detail-action">
          <div className="col-lg-4">
            <div className="contact-item contact-item1">
              <h3 className="contact__title">Introduction</h3>
              <p className="contact__desc">{contact?.name}</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="contact-item contact-item2">
              <h3 className="contact__title">Address</h3>
              <p className="contact__desc">{contact?.address}</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="contact-item contact-item3">
              <h3 className="contact__title">Contact</h3>
              <p className="contact__desc">
                {contact?.mail_address} <br />
                {contact?.phone_number}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Contact
