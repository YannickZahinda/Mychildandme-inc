import React, { useState, useEffect, Fragment } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { postApi, publicApi } from 'src/api/services'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import moment from 'moment'
import EventDetailCard from 'src/components/cards/EventDetailCard'
import img from 'src/assets/images/volunteer.jpg'
import ArticleDetailCard from 'src/components/cards/ArticleDetailCard'

const RelatedArticleGrid = ({ id }) => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await postApi.getRelatedArticles(id)
        setArticles(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    id && getPost()
  }, [id])

  return (
    <>
      <div className="recent-widget">
        <h3 className="vol-event-title text-justify">Bài viết cùng danh mục</h3>
        {articles?.map((post, index) => (
          <NavLink to={'../articles/' + post.article_slug + '/' + post.article_id} key={index}>
            <div className="recent-article-box">
              <div className="recent-article-img">
                <img src={post?.image_url} alt="" />
              </div>
              <div className="recent-article-detail">
                <div className="recent-article-title">{post?.article_title}</div>
                <div className="recent-article-date">
                  {moment(post?.publication_start_date_time).format('DD [Th] M YYYY')}
                </div>
              </div>
            </div>
            {index !== articles.length - 1 && <div className="solid-line"></div>}
          </NavLink>
        ))}
      </div>
    </>
  )
}
export default RelatedArticleGrid
