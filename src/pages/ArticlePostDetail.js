import React, { useState, useEffect, Fragment } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { postApi, publicApi } from 'src/api/services'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import moment from 'moment'
import EventDetailCard from 'src/components/cards/EventDetailCard'
import img from 'src/assets/images/volunteer.jpg'
import ArticleDetailCard from 'src/components/cards/ArticleDetailCard'
import RelatedArticleGrid from 'src/components/grid/RelatedArticleGrid'

const ArticlePostDetailPage = () => {
  const { articleSlug, articleId } = useParams()
  const [post, setPost] = useState()
  const [articleCategories, setArticleCategories] = useState([])

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await postApi.getArticlePostDetail(articleId)
        setPost(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    articleId && getPost()
  }, [articleId])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await publicApi.getArticileCategories()
        setArticleCategories(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    getCategories()
  }, [])

  return (
    <>
      <section
        className="donation-banner-area"
        style={{ backgroundImage: 'url(' + post?.banner_image + ')' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">{post?.article_title}</h1>
              <h4 className="text__white">{post?.summary}</h4>
            </div>
          </div>
        </div>
      </section>
      <section className="causes-detail-area pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row blog-content-wrap">
                <div className="col-lg-12 mb-3">
                  <div className="blog-content">
                    <div className="blog-item">
                      <div className="article-img">
                        <img src={post?.image} alt="" />
                        <span className="blog__date">
                          {moment(post?.publication_start_date_time).format(
                            '[Ngày] D [Tháng] M YYYY',
                          )}
                        </span>
                      </div>
                      <h3 className="vol-event-title text-justify mt-3 mb-3">
                        {post?.article_title}
                      </h3>
                      <div className="vol-event-label">
                        <span className="article-summary text-justify">{post?.summary}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="d-flex flex-column gap-5">
                    {post?.article_details?.map((articleDetail, index) => (
                      <div className="col-12 p-0" key={index}>
                        <ArticleDetailCard
                          headline={articleDetail?.headline}
                          contents={articleDetail?.contents}
                          image={articleDetail?.image}
                          displayType={articleDetail?.display_type}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row flex-column">
                <div className="col-lg-12 post-search-form">
                  <div className="side-widget sidebar-form">
                    <div className="form-shared">
                      <form action="http://localhost:3001/articles/search">
                        <input
                          type="text"
                          name="keyword"
                          className="form-control ip-search"
                          placeholder="Tìm kiếm"
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mt-5">
                  <RelatedArticleGrid id={post?.article_id} />
                </div>
                <div className="col-lg-12 mt-5">
                  <div className="recent-widget">
                    <h3 className="vol-event-title text-justify mb-3">Danh mục bài viết</h3>
                    {articleCategories.map((cate, index) => (
                      <NavLink
                        to={
                          '../article-categories/' +
                          cate?.category_slug +
                          '/' +
                          cate.article_category_id
                        }
                      >
                        <div className="recent-article-detail mt-2">
                          <div className="recent-article-category">{cate.category_name}</div>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default ArticlePostDetailPage
