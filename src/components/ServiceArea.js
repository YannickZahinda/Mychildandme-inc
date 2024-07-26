import React from 'react'
import hearticon1 from '../public/images/heart-icon1.png'
import hearticon2 from '../public/images/heart-icon2.png'
import hearticon3 from '../public/images/heart-icon3.png'
import hearticon4 from '../public/images/heart-icon4.png'
import hearticon5 from '../public/images/heart-icon5.png'
import hearticon6 from '../public/images/heart-icon6.png'
import hearticon7 from '../public/images/heart-icon7.png'
import hearticon8 from '../public/images/heart-icon8.png'
import hearticon9 from '../public/images/heart-icon9.png'
import hearticon10 from '../public/images/heart-icon10.png'
import hearticon11 from '../public/images/heart-icon11.png'
import sectionicon from '../public/images/section-icon.png'

const ServiceArea = () => {
  return (
    <section className="service-area text-center">
      <img src={hearticon1} alt="" className="heart-icon heart-icon-1" />
      <img src={hearticon2} alt="" className="heart-icon heart-icon-2" />
      <img src={hearticon3} alt="" className="heart-icon heart-icon-3" />
      <img src={hearticon4} alt="" className="heart-icon heart-icon-4" />
      <img src={hearticon5} alt="" className="heart-icon heart-icon-5" />
      <img src={hearticon6} alt="" className="heart-icon heart-icon-6" />
      <img src={hearticon7} alt="" className="heart-icon heart-icon-7" />
      <img src={hearticon8} alt="" className="heart-icon heart-icon-8" />
      <img src={hearticon9} alt="" className="heart-icon heart-icon-9" />
      <img src={hearticon10} alt="" className="heart-icon heart-icon-10" />
      <img src={hearticon11} alt="" className="heart-icon heart-icon-11" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="section-heading service-heading">
              <div className="section-icon">
                <img src={sectionicon} alt="section-icon" />
              </div>
              <h2 className="section__title">
                Be the one to change the lives of orphaned children by donating
              </h2>
              <p className="section__meta">Help Us</p>
            </div>
          </div>
        </div>
        <div className="row service-wrap">
          <div className="col">
            <div className="service-item service-item1">
              <div className="service-item-inner">
                <div className="service-icon">
                  <i className="icon-peace-1"></i>
                </div>
                <div className="service-content">
                  <h4 className="service__title">Sponsoring a Child</h4>
                  <p className="service__desc">
                    No matter where you are, you can change a child's life.
                  </p>
                </div>

              </div>
            </div>
          </div>
          <div className="col">
            <div className="service-item service-item2">
              <div className="service-item-inner">
                <div className="service-icon">
                  <i className="icon-praying"></i>
                </div>
                <div className="service-content">
                  <h4 className="service__title">Support a family</h4>
                  <p className="service__desc">
                    By participating in supporting a family, you will also become a part of the child's family.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="service-item service-item3">
              <div className="service-item-inner">
                <div className="service-icon">
                  <i className="icon-peace"></i>
                </div>
                <div className="service-content">
                  <h4 className="service__title">Collective Sponsorship</h4>
                  <p className="service__desc">
                    By participating in collective sponsorship, you also contribute a part in the care and upbringing of children.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="service-item service-item4">
              <div className="service-item-inner">
                <div className="service-icon">
                  <i className="icon-heart"></i>
                </div>
                <div className="service-content">
                  <h4 className="service__title">Sponsor Now</h4>
                  <p className="service__desc">
                    Your sponsorship, whether large or small, is important to us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="button-shared">
              <a href="/donation" className="theme-btn">
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceArea
