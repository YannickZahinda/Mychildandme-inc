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
              <h1 className="text__white mb-3">Đăng ký tài trợ</h1>
              <h4 className="text__white">
                Khoản tiền tài trợ của bạn, dù lớn hay nhỏ, đều quan trọng với chúng tôi trên hành
                trình mang lại nụ cười và tương lai cho trẻ em mồ côi, bị bỏ rơi và có hoàn cảnh đặc
                biệt khó khăn.
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
