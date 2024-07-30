import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { publicApi } from 'src/api/services'
import ArticlePostCard from 'src/components/cards/ArticlePostCard'
import { Pagination } from 'src/constants/Pagination'
const ArticleCategoryPage = () => {
  const { categoryName, categoryId } = useParams()
  const [category, setCategory] = useState([])
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  useEffect(() => {
    const params = {
      page: 1,
      limit: Pagination.limit,
    }
    const getPosts = async () => {
      try {
        const response = await publicApi.getCategoryDetail(categoryId, { params })
        const result = response.result
        setCategory(result)
        setArticles(result.article_posts.records)
        setPage(result.article_posts.page)
        setTotalPage(result.article_posts.totalPage)
      } catch (error) {
        console.log(error)
      }
    }
    categoryId && getPosts()
  }, [categoryId])

  const handleBtnLoadMoreClick = async () => {
    const params = {
      page: page + 1,
      limit: Pagination.limit,
    }
    try {
      const response = await publicApi.getCategoryDetail(categoryId, { params })
      const result = response.result.article_posts
      setArticles((prevArticles) => [...prevArticles, ...result.records])
      setPage(result.page)
      setTotalPage(result.totalPage)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section
        className="donation-banner-area"
        style={{ backgroundImage: 'url(' + category?.image_url + ')' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">{category?.category_name}</h1>
              <h4 className="text__white">{category?.category_summary}</h4>
            </div>
          </div>
        </div>
      </section>
      <section className="causes-area causes-area2">
        <div className="container">
          <div className="row blog-content-wrap">
            {articles?.map((article, index) => (
              <Fragment key={index}>
                <div className="col-lg-12 p-0">
                  <ArticlePostCard
                    title={article.article_title}
                    slug={article.article_slug}
                    images={article.images}
                    articleId={article.article_id}
                    startTime={article.publication_start_date_time}
                    summary={article.summary}
                  />
                </div>
                {index !== articles.length - 1 && <div className="solid-line"></div>}
              </Fragment>
            ))}
            <div className="col-lg-12 p-0 mt-5 d-flex justify-content-center">
              <button
                className="load-more-btn h-100"
                disabled={page === totalPage || totalPage === 0}
                onClick={handleBtnLoadMoreClick}
              >
                Load more
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default ArticleCategoryPage
