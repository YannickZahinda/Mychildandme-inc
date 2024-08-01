import React, { Component, useEffect, useState } from 'react'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'
import Swiper from 'react-id-swiper'
import 'swiper/css'
import sectionicon from '../public/images/section-icon.png'
import { postApi } from 'src/api/services'

const MixerArea = () => {
  const [startCounter, setStarCounter] = useState(false)

  const onVisibilityChange = (isVisible) => {
    if (isVisible) {
      setStarCounter(true)
    }
  }

  const [statistics, setStatistics] = useState(null)
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await postApi.getHomeStatistics()
        setStatistics(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [])

  return (
    <div>
      <section className="mixer-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="section-heading mixer-heading">
                <div className="section-icon">
                  <img src={sectionicon} alt="section-icon" />
                </div>
                <h2 className="section__title text__white">
                  Adopt a child, change a life.
                </h2>
                <a href="/adoption" className="theme-btn">
                  Register for adoption
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mixer-area2">
        <div className="container">
          <div className="row fun-content-wrap">
            <div className="col-lg-6">
              <div className="fun-content">
                <div className="fun-item fun-item1">
                  <i className="icon-family"></i>
                  <h3 className="counter">
                    {/* <VisibilitySensor
                      onChange={onVisibilityChange}
                      offset={{ top: 10 }}
                      delayedCall
                    >
                      <CountUp end={startCounter ? 785000 : 0} />
                    </VisibilitySensor> */}
                    {statistics?.adopted_children}
                  </h3>
                  <p className="fun__text">Number of children who have been adopted</p>
                </div>
              </div>
              <div className="fun-content">
                <div className="fun-item fun-item2">
                  <i className="icon-heart"></i>
                  <h3 className="counter">{statistics?.in_care_children}</h3>
                  <p className="fun__text">Children currently being sponsored</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="fun-content-slide">
                <div className="fun-slide-item">
                  <h3 className="funslide__text">
                    “What makes a child suffer is not the lack of clothes, food, or education but the lack of belonging and not having a family.”
                  </h3>
                  <p className="funslide__name">
                    Mr. Hermann Gmeiner – Founder of SOS Children’s Village International
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MixerArea
