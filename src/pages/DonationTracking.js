import React from 'react'
import PageHeader from '../components/PageHeader'
import Contact from '../components/Contact'
import { AdoptionForm } from 'src/components'
import DonationForm from 'src/components/donation/DonationForm'
import { NavLink } from 'react-router-dom'
import DonationTracking from 'src/components/donation/DonationTracking'

const DonationTrackingPage = () => {
  return (
    <>
      <section className="donation-banner-area">
        <div></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">Sponsorship Information</h1>
              <h4 className="text__white">
              Your donation, whether large or small, 
              is important to us on the journey to bring smiles and a future to orphaned, abandoned, and especially disadvantaged children.
              </h4>
            </div>
          </div>
        </div>
      </section>
      <DonationTracking />
    </>
  )
}

export default DonationTrackingPage
