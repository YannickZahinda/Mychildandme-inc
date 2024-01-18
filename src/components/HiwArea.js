import React from 'react'

// import '../assets/images/slider1.jpg'
import hiwimg1 from '../assets/images/hiw-img1.jpg'
import hiwimg2 from '../assets/images/hiw-img4.jpg'
import hiwimg3 from '../assets/images/hiw-img3.jpg'

const HiwArea = () => {
  const image = require('../assets/images/slider1.jpg')
  return (
    <section className="hiw-area">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="hiw-item">
              <div className="hiw-item-img-box hiw-bg1">
                <figure>
                  <img src={hiwimg1} />
                  <h3 className="hiw-title">
                    Chúng tôi tạo dựng gia đình từ những trái tim mồ côi.
                  </h3>
                  <div className="hiw-btn-box">
                    <a href="#" className="theme-btn">
                      xem thêm
                    </a>
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="hiw-item">
              <div className="hiw-item-img-box hiw-bg2">
                <figure>
                  <img src={hiwimg2} alt="" />
                  <h3 className="hiw-title">Hãy cho trẻ em mồ côi một tương lai đầy hy vọng.</h3>
                  <div className="hiw-btn-box">
                    <a href="#" className="theme-btn">
                      xem thêm
                    </a>
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="hiw-item">
              <div className="hiw-item-img-box hiw-bg3">
                <figure>
                  <img src={hiwimg3} alt="" />
                  <h3 className="hiw-title">
                    Một mái ấm nhỏ bé có thể thay đổi cả cuộc đời một đứa trẻ.
                  </h3>
                  <div className="hiw-btn-box">
                    <a href="#" className="theme-btn">
                      xem thêm
                    </a>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HiwArea
