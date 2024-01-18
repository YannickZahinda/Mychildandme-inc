import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import moment from 'moment'
const ArticlePostCard = ({ articleId, title, slug, summary, startTime, images }) => {
  return (
    <>
      <div className="blog-content">
        <div className="blog-item blog-item1 mb-0">
          <div className="row">
            <div className="col-md-5">
              <div className="blog-img">
                <Carousel
                  className="crsl"
                  centerSlidePercentage={100}
                  showArrows={false}
                  showIndicators={false}
                  showStatus={false}
                  infiniteLoop
                  swipeable
                  transitionTime={700}
                  centerMode
                  interval={5000}
                >
                  {images?.map((image, index) => (
                    <img className="cursor-pointer" key={index} src={image} alt="" />
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="col-md-7 vol-event-card-content">
              <div className="vol-event-card-header d-flex gap-3">
                <div className="vol-event-time">
                  Ngày {moment(startTime).format('DD-MM-YYYY hh:mm A')}
                </div>
              </div>
              <h3 className="vol-event-title">{title}</h3>
              <div className="dashed-line"></div>
              <div className="vol-event-label">
                <span className="article-summary text-justify">{summary}</span>
              </div>
              <div className="d-flex gap-3 vol-event-btn-group">
                <NavLink to={'../articles/' + slug + '/' + articleId}>
                  <button className="vol-event-btn">Xem chi tiết</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ArticlePostCard
