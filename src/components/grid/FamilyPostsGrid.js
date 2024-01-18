import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { donationApi, postApi } from 'src/api/services'
import ProgramCard from '../cards/ProgramCard'
import DonationProgramModal from '../modals/DonationProgramModal'
import FamilyPostCard from '../cards/FamilyPostCard'
const FamilyPostGrid = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await postApi.getFamilyPosts()
        setPosts(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [])

  return (
    <>
      <section className="causes-area causes-area2">
        <div className="container">
          <div className="row blog-content-wrap">
            {posts?.map((post, index) => (
              <div className="col-lg-6">
                <FamilyPostCard
                  familyId={post?.family_id}
                  familyName={post?.family_name}
                  imageUrl={post?.image_url}
                  donationCount={post?.donation_count}
                  donationAmount={post?.total_donation_amount}
                  summary={post?.summary}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
export default FamilyPostGrid
