import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { publicApi } from 'src/api/services'
import ArticlePostCard from 'src/components/cards/ArticlePostCard'
import img from 'src/assets/images/TTBaiViet12102020091657.jpg'
import { Pagination } from 'src/constants/Pagination'
const SearchArticlePage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const [keyword, setKeyword] = useState(searchParams?.get('keyword'))

  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [changeCount, setChangeCount] = useState(0)

  useEffect(() => {
    const params = {
      page: page,
      keyword: keyword,
      limit: Pagination.limit,
    }
    const getPosts = async () => {
      try {
        const response = await publicApi.getArticilePosts({ params })
        const result = response.result
        setArticles(result.records)
        setPage(result.page)
        setTotalPage(result.totalPage)
      } catch (error) {
        console.log(error)
      }
    }
    keyword && !changeCount && getPosts()
  }, [keyword])

  const handleBtnSearchClick = async () => {
    const params = {
      page: page,
      keyword: keyword,
      limit: Pagination.limit,
    }
    try {
      const response = await publicApi.getArticilePosts({ params })
      const result = response.result
      setArticles(result.records)
      setPage(result.page)
      setTotalPage(result.totalPage)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBtnLoadMoreClick = async () => {
    const params = {
      page: page + 1,
      keyword: keyword,
      limit: Pagination.limit,
    }
    try {
      const response = await publicApi.getArticilePosts({ params })
      const result = response.result
      setArticles((prevArticles) => [...prevArticles, ...result.records])
      setPage(result.page)
      setTotalPage(result.totalPage)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section className="donation-banner-area" style={{ backgroundImage: 'url(' + img + ')' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5"></div>
          </div>
        </div>
      </section>
      <section className="causes-area causes-area2 pt-5">
        <div className="container pt-4">
          <div className="row blog-content-wrap mb-5 justify-content-between gap-2">
            <div className="col-lg-9 col-md-8 col-sm-7 p-0">
              <input
                type="text"
                className="form-control search-ip"
                value={keyword}
                placeholder="Tìm kiếm"
                onChange={(e) => {
                  setKeyword(e.target.value)
                  setChangeCount((prev) => prev + 1)
                }}
              />
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 p-0">
              <button
                className="vol-event-btn h-100"
                onClick={handleBtnSearchClick}
                disabled={!keyword}
              >
                Tìm kiếm
              </button>
            </div>
          </div>

          <div className="row blog-content-wrap">
            <div className="col-lg-12 p-0">
              <h1 className="text__white mb-3">Kết quả</h1>
            </div>
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
export default SearchArticlePage
