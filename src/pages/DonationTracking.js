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
              <h1 className="text__white mb-3">Thông tin tài trợ</h1>
              <h4 className="text__white">
                Khoản tiền tài trợ của bạn, dù lớn hay nhỏ, đều quan trọng với chúng tôi trên hành
                trình mang lại nụ cười và tương lai cho trẻ em mồ côi, bị bỏ rơi và có hoàn cảnh đặc
                biệt khó khăn.
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
