import numeral from 'numeral'
import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { postApi } from 'src/api/services'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const FamilyPostDetailPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await postApi.getFamilyPostDetail(id)
        setPost(response.result)
      } catch (error) {
        console.log(error)
        window.location.href = 'http://localhost:3001/home'
      }
    }
    id && getPost()
  }, [id])
  console.log(post)
  return (
    <>
      <section
        className="donation-banner-area"
        style={{ backgroundImage: 'url(' + post?.banner_image_url + ')' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">{post?.title}</h1>
              <h4 className="text__white">{post?.summary}</h4>
            </div>
          </div>
        </div>
      </section>
      <section className="causes-detail-area">
        <div className="container">
          <div className="row blog-content-wrap">
            <div className="col-lg-12">
              <div className="blog-content">
                <div className="blog-item">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="blog-img">
                        <Carousel
                          className="crsl"
                          centerSlidePercentage={100}
                          showArrows={true}
                          showStatus={false}
                          autoPlay
                          showThumbs={false}
                          infiniteLoop
                          swipeable
                          transitionTime={700}
                          centerMode
                          interval={5000}
                        >
                          <img className="program-content-img" src={post?.main_image_url} alt="" />
                          {post?.slide_images?.map((image, index) => (
                            <img key={index} className="program-content-img" src={image} alt="" />
                          ))}
                        </Carousel>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="event-detail-sidebar">
                        <div className="event-detail-item">
                          <h3 className="event__title">{post?.family_name}</h3>
                          <ul className="event__list">
                            <li>
                              <span>Số trẻ:</span> {post?.no_of_children}
                            </li>
                            <li>
                              <span>Độ tuổi:</span>
                              {post?.range_age} tuổi
                            </li>
                            <li>
                              <span>Số lượt tài trợ:</span>
                              {post?.donation_count}
                            </li>
                            <li>
                              <span>Số tiền tài trợ:</span>
                              {numeral(post?.total_donation_amount).format('0,0₫') + ' VND'}
                            </li>
                          </ul>
                          <div className="inner-causes-btn mt-4">
                            <NavLink to={'../donation?programId=2&familyId=' + post?.family_id}>
                              <a className="theme-btn text-white">Tài trợ ngay</a>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="event__text">
                    <div
                      id="textmt"
                      dangerouslySetInnerHTML={{
                        __html: post?.content,
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default FamilyPostDetailPage
