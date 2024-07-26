import React, { useEffect, useState } from 'react'
import sectionicon from '../public/images/section-icon.png'
import aboutimg1 from '../assets/images/about-img1.jpg'
import aboutimg2 from '../assets/images/about-img2.jpg'
import aboutimg3 from '../assets/images/about-img3.jpg'
import { publicApi } from 'src/api/services'

const AboutArea = () => {
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
    <section className="about-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="about-large-img">
              <img src={aboutimg1} alt="" />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="about-semi-img">
              <img src={aboutimg2} alt="" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about-heading">
              <div className="section-heading">
                <h2 className="section__title">Who we are</h2>
                <p className="section__meta">Learn about the orphanage</p>
                <p className="section__desc">{contact?.about}</p>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-lg-5">
            <div>
              <div className="section-heading">
                <h2 className="section__title">Vision</h2>
                <br></br>
                <p className="section__desc">{contact?.vision}</p>
                <br></br>
                <h2 className="section__title">Mission</h2>
                <br></br>
                <p>{contact?.mission}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about-semi-img">
              <img src={aboutimg3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutArea
