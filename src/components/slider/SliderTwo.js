import React, { useState } from 'react'
import Swiper from 'react-id-swiper'
import 'swiper'
import img1 from 'src/assets/images/bg2.jpg'
import img2 from 'src/assets/images/bg3.jpg'
import img3 from 'src/assets/images/bg4.jpg'
import { NavLink } from 'react-router-dom'

const SliderTwo = () => {
  const [swiper, setSwiper] = useState(null)

  const goNext = () => {
    if (swiper !== null) {
      console.log('next')
      swiper.slideNext()
    }
  }

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev()
    }
  }

  return (
    <section className="slider-area slider-area2 text-center">
      <div className="homepage-slide1">
        <Swiper getSwiper={setSwiper}>
          <div
            className="single-slide-item slide-bg1"
            style={{ backgroundImage: 'url(' + img1 + ')' }}
          >
            <div className="slide-item-table">
              <div className="slide-item-tablecell">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 mx-auto">
                      <div className="slider-heading">
                        <p className="slider__meta">Orphanage</p>
                        <h2 className="slider__title">
                          Every child deserves to be loved.
                        </h2>
                        <NavLink to="/donation" className="main-btn">
                          Donate Now
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="single-slide-item slide-bg2"
            style={{ backgroundImage: 'url(' + img2 + ')' }}
          >
            <div className="slide-item-table">
              <div className="slide-item-tablecell">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 mx-auto">
                      <div className="slider-heading">
                        <p className="slider__meta">Orphanage</p>
                        <h2 className="slider__title">
                          Bringing a loving family to children
                        </h2>
                        <NavLink to="/donation" className="main-btn">
                          Donate Now
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="single-slide-item slide-bg3"
            style={{ backgroundImage: 'url(' + img3 + ')' }}
          >
            <div className="slide-item-table">
              <div className="slide-item-tablecell">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 mx-auto">
                      <div className="slider-heading">
                        <p className="slider__meta">Orphanage</p>
                        <h2 className="slider__title">
                          We create families from orphaned hearts.
                        </h2>
                        <NavLink to="/donation" className="main-btn">
                          Donate Now
                        </NavLink>
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

export default SliderTwo
