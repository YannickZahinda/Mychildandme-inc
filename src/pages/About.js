import React from 'react'
import AboutArea from '../components/AboutArea'
import FaqArea from '../components/FaqArea'
import ServiceArea from '../components/ServiceArea'
import img from 'src/assets/images/nu-cuoi.jpg'
const AboutPage = () => {
  return (
    <>
      <section className="donation-banner-area" style={{ backgroundImage: 'url(' + img + ')' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">Về chúng tôi</h1>
            </div>
          </div>
        </div>
      </section>
      <AboutArea />
      <FaqArea />
      <ServiceArea />
    </>
  )
}

export default AboutPage
