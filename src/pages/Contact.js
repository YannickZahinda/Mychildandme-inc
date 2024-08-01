import React from 'react'
import Contact from '../components/Contact'
import Map from '../components/Map'
import img from 'src/assets/images/nu-cuoi.jpg'

const ContactPage = () => {
  return (
    <>
      <section className="donation-banner-area" style={{ backgroundImage: 'url(' + img + ')' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">Contact Information</h1>
            </div>
          </div>
        </div>
      </section>
      <Contact />
      <Map />
    </>
  )
}

export default ContactPage
