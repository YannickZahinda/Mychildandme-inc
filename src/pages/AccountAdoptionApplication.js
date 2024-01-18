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
              <h1 className="text__white mb-3">Đăng ký nhận thông tin trẻ</h1>
              <h4 className="text__white">
                Kết nối trái tim, hãy đồng hành cùng chúng tôi để đăng ký nhận nuôi trẻ mồ côi. Sự
                hỗ trợ và tình thương của bạn sẽ là nguồn động viên lớn, mang lại cho những linh hồn
                nhỏ bé sự ấm áp và hy vọng mới mẻ.
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
