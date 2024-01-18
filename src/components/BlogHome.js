import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { postApi } from 'src/api/services'

const BlogHome = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await postApi.getTopArticles(4)
        setPosts(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [])
  return (
    <section className="blog-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <div className="section-heading blog-heading">
              <h2 className="section__title">Tin tức mới nhất</h2>
            </div>
          </div>
        </div>
        <div className="row recent-post-wrap">
          <div className="col-lg-6">
            <div className="recent-item">
              <div className="recent__img">
                <span className="meta__date-date">
                  {moment(posts[0]?.publication_start_date_time).format('[Ngày] D [Tháng]  YYYY')}
                </span>
                <img src={posts[0]?.images[0]} alt="" />
              </div>
              <div className="news__content">
                <h3 className="news__content-title">
                  <a href="/single-news">{posts[0]?.article_title}</a>
                </h3>
                <p className="news__content-text text-line-3">{posts[0]?.summary}</p>
                <div className="d-flex gap-3 vol-event-btn-group">
                  <NavLink
                    to={'../articles/' + posts[0]?.article_slug + '/' + posts[0]?.article_id}
                  >
                    <button className="vol-event-btn">Xem chi tiết</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="third-recent-box">
              <div className="third-recent-item">
                {posts?.length &&
                  posts.map((post, index) => (
                    <>
                      {index > 0 && (
                        <>
                          <NavLink
                            to={'../articles/' + post?.article_slug + '/' + post?.article_id}
                          >
                            <li className="mb-3">
                              <div className="recent__img news-img">
                                <a href="/single-news">
                                  <img src={post.images[0]} alt="" />
                                </a>
                              </div>
                              <div className="recent__content">
                                <span>
                                  {moment(post?.publication_start_date_time).format(
                                    '[Ngày] D [Tháng]  YYYY',
                                  )}
                                </span>
                                <h4 className="text-line-3">{post?.article_title}</h4>
                              </div>
                            </li>
                          </NavLink>
                        </>
                      )}
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogHome
