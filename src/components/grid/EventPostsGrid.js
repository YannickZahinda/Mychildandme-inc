import React, { useState, useEffect, Fragment } from 'react'
import { postApi } from 'src/api/services'
import EventPostCard from '../cards/EventPostCard'
import useAuth from '../hooks/useAuth'
import { Pagination } from 'src/constants/Pagination'
const EventPostsGrid = () => {
  const { auth } = useAuth()
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [changeCount, setChangeCount] = useState(1)

  useEffect(() => {
    const params = {
      page: 1,
      limit: Pagination.limit,
    }
    const getPosts = async () => {
      try {
        const response = await postApi.getEventPosts({ params })
        const result = response.result
        setPosts(result.records)
        setPage(result.page)
        setTotalPage(result.totalPage)
      } catch (error) {
        console.log(error)
      }
    }

    const memberGetPosts = async () => {
      try {
        params.accountId = auth?.userId
        const response = await postApi.getEventPosts({ params })
        const result = response.result
        setPosts(result.records)
        setPage(result.page)
        setTotalPage(result.totalPage)
      } catch (error) {
        console.log(error)
      }
    }
    auth?.userId ? memberGetPosts() : getPosts()
  }, [auth, changeCount])

  const handleBtnLoadMoreClick = async () => {
    const params = {
      page: page + 1,
      limit: Pagination.limit,
    }
    try {
      if (auth?.userId) {
        params.accountId = auth?.userId
      }
      const response = await postApi.getEventPosts({ params })
      const result = response.result
      setPosts((prevArticles) => [...prevArticles, ...result.records])
      setPage(result.page)
      setTotalPage(result.totalPage)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section className="causes-area causes-area2">
        <div className="container">
          <div className="row blog-content-wrap">
            {posts?.map((post, index) => (
              <Fragment key={index}>
                <div className="col-lg-12 p-0">
                  <EventPostCard
                    title={post.title}
                    images={post.images}
                    eventId={post.event_id}
                    isAccepting={post.is_accepting}
                    maxParticipant={post.event_maximum_participant}
                    startTime={post.event_start_date}
                    endTime={post.event_end_date}
                    summary={post.summary}
                    isApplied={post.is_applied}
                    setChangeCount={setChangeCount}
                  />
                </div>
                {index !== posts.length - 1 && <div className="solid-line"></div>}
              </Fragment>
            ))}
            <div className="col-lg-12 p-0 mt-5 d-flex justify-content-center">
              <button
                className="load-more-btn h-100"
                disabled={page === totalPage || totalPage === 0}
                onClick={handleBtnLoadMoreClick}
              >
                Tải thêm
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default EventPostsGrid
