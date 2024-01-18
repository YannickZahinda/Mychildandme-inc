import React, { useState } from 'react'
import Swiper from 'react-id-swiper'
import 'swiper/css'

const MainSlider = () => {
  const [swiper, setSwiper] = useState(null)

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext()
    }
  }

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev()
    }
  }

  return (
    <section className="slider-area">
      <div className="homepage-slide1">
        <Swiper getSwiper={setSwiper}>
          <div className="single-slide-item slide-bg1">
            <div className="slide-item-table">
              <div className="slide-item-tablecell">
                <div className="container">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="slider-heading">
                        <p className="slider__meta">Trại trẻ mồ côi</p>
                        <h2 className="slider__title">
                          Mỗi đứa trẻ đều xứng đáng được yêu thương và chăm sóc.
                        </h2>
                        <a href="#" className="theme-btn">
                          Xem thêm
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-slide-item slide-bg2">
            <div className="slide-item-table">
              <div className="slide-item-tablecell">
                <div className="container">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="slider-heading">
                        <p className="slider__meta">Trại trẻ mồ côi</p>
                        <h2 className="slider__title">
                          Mỗi đứa trẻ đều xứng đáng được yêu thương và chăm sóc.
                        </h2>
                        <a href="#" className="theme-btn">
                          Xem thêm
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="single-slide-item slide-bg3">
            <div className="slide-item-table">
              <div className="slide-item-tablecell">
                <div className="container">
                  <div className="row">
                    <div className="col-md-7">
                      <div className="slider-heading">
                        <p className="slider__meta">Trại trẻ mồ côi</p>
                        <h2 className="slider__title">
                          Mỗi đứa trẻ đều xứng đáng được yêu thương và chăm sóc.
                        </h2>
                        <a href="#" className="theme-btn">
                          Xem thêm
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Swiper>
        {/* <div className="owl-dots">
          <div onClick={goPrev} className="owl-dot">
            <span></span>
          </div>
          <div onClick={goNext} className="owl-dot">
            <span></span>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default MainSlider
