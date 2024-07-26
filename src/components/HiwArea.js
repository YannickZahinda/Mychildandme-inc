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
                  <img src={hiwimg1} alt="Family" />
                  <h3 className="hiw-title">
                    We create families from orphaned hearts.
                  </h3>
                  <div className="hiw-btn-box">
                    <a href="#" className="theme-btn">
                      Learn More
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
                  <img src={hiwimg2} alt="Hope" />
                  <h3 className="hiw-title">Give orphaned children a future full of hope.</h3>
                  <div className="hiw-btn-box">
                    <a href="#" className="theme-btn">
                      Learn More
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
                  <img src={hiwimg3} alt="Small Home" />
                  <h3 className="hiw-title">
                    A small home can change a child's whole life.
                  </h3>
                  <div className="hiw-btn-box">
                    <a href="#" className="theme-btn">
                      Learn More
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
