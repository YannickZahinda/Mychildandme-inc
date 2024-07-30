import React from 'react'
import img from 'src/assets/images/335090448_532387102338480_3810568149787479702_n.jpg'
import AccountAdoptionForm from 'src/components/adoption/AccountAdoptionForm'

const AccountAdoptionApplicationPage = () => {
  return (
    <>
      <section className="donation-banner-area" style={{ backgroundImage: 'url(' + img + ')' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">Register to receive child information</h1>
              <h4 className="text__white">
              Connect hearts, join us in registering to adopt orphans.
              Your support and love will be a great encouragement, bringing warmth and new hope to these little souls.
              </h4>
            </div>
          </div>
        </div>
      </section>
      <AccountAdoptionForm />
    </>
  )
}

export default AccountAdoptionApplicationPage
