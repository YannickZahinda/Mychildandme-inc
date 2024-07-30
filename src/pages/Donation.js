import React from 'react'
import DonationForm from 'src/components/donation/DonationForm'
import useAuth from 'src/components/hooks/useAuth'
import AccountDonationForm from 'src/components/donation/AccountDonationForm'

const DonationPage = () => {
  const { auth } = useAuth()
  return (
    <>
      <section className="donation-banner-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">Sponsorship registration.</h1>
              <h4 className="text__white">
                Your donation, no matter how big or small, is important to us on the journey to bring smiles 
                and a future to orphans, abandoned children, and those in particularly difficult circumstances.
              </h4>
            </div>
          </div>
        </div>
      </section>
      {auth?.userId ? <AccountDonationForm /> : <DonationForm />}
    </>
  )
}

export default DonationPage
