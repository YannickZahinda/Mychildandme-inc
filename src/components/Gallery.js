import React, { useEffect, useState } from 'react'
import img from 'src/assets/images/103525.jpg'
import img1 from 'src/assets/images/13-hinh-anh-1-scaled.jpg'
import { FaAngleLeft, FaAngleRight, FaForward, FaTimes } from 'react-icons/fa'

const Gallery = () => {
  const [slideState, setSlideState] = useState(false)
  const handleBtnClick = () => {
    setSlideState(true)
  }
  return (
    <>
      <section className="gallery-area2">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="gallery-item">
                <img src={img} />
                <a onClick={handleBtnClick} className="glightbox">
                  <button className="bg-transparent border-0">
                    <span className="gallery-icon"></span>
                  </button>
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="gallery-item">
                <img src={img1} />
                <a onClick={handleBtnClick} className="glightbox">
                  <button className="bg-transparent border-0">
                    <span className="gallery-icon"></span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {slideState && (
        <div id="glightbox-body" className="glightbox-container glightbox-clean">
          <div className="gloader visible" style={{ display: 'none' }}></div>
          <div className="goverlay"></div>
          <div className="gcontainer">
            <div id="glightbox-slider" className="gslider">
              <div className="gslide loaded">
                <div className="gslide-inner-content">
                  <div className="ginner-container">
                    <div className="gslide-media gslide-image">
                      <img
                        src="https://oxpitan-layerdrops.vercel.app/images/gallery-img4.jpg"
                        className="zoomable"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="gslide loaded">
                <div className="gslide-inner-content">
                  <div className="ginner-container">
                    <div className="gslide-media gslide-image">
                      <img
                        src="https://oxpitan-layerdrops.vercel.app/images/gallery-img5.jpg"
                        className="zoomable"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="gslide loaded">
                <div className="gslide-inner-content">
                  <div className="ginner-container">
                    <div className="gslide-media gslide-image">
                      <img
                        src="https://oxpitan-layerdrops.vercel.app/images/gallery-img6.jpg"
                        className="zoomable"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="gslide loaded">
                <div className="gslide-inner-content">
                  <div className="ginner-container">
                    <div className="gslide-media gslide-image">
                      <img
                        src="https://oxpitan-layerdrops.vercel.app/images/gallery-img7.jpg"
                        className="zoomable"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="gslide loaded current">
                <div className="gslide-inner-content">
                  <div className="ginner-container">
                    <div className="gslide-media gslide-image">
                      <img
                        src="https://oxpitan-layerdrops.vercel.app/images/gallery-img8.jpg"
                        className="zoomable"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="gslide loaded">
                <div className="gslide-inner-content">
                  <div className="ginner-container">
                    <div className="gslide-media gslide-image">
                      <img
                        src="https://oxpitan-layerdrops.vercel.app/images/gallery-img9.jpg"
                        className="zoomable"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="gslide loaded">
                <div className="gslide-inner-content">
                  <div className="ginner-container">
                    <div className="gslide-media gslide-image">
                      <img
                        src="https://oxpitan-layerdrops.vercel.app/images/gallery-img10.jpg"
                        className="zoomable"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="gslide loaded">
                <div className="gslide-inner-content">
                  <div className="ginner-container">
                    <div className="gslide-media gslide-image">
                      <img
                        src="https://oxpitan-layerdrops.vercel.app/images/gallery-img11.jpg"
                        className="zoomable"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="gslide loaded">
                <div className="gslide-inner-content">
                  <div className="ginner-container">
                    <div className="gslide-media gslide-image">
                      <img
                        src="https://oxpitan-layerdrops.vercel.app/images/gallery-img12.jpg"
                        className="zoomable"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="gnext gbtn" tabindex="0">
              <FaAngleRight />
            </button>
            <button className="gprev gbtn" tabindex="1">
              <FaAngleLeft />
            </button>
            <button className="gclose gbtn" tabindex="2" onClick={() => setSlideState(false)}>
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Gallery
