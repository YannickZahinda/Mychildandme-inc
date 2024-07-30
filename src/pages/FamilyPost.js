import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { donationApi } from 'src/api/services'
import Programs from 'src/components/donation/Programs'
import FamilyPostGrid from 'src/components/grid/FamilyPostsGrid'
import img from 'src/assets/images/img1168-1507766825697.jpg'
const FamilyPostPage = () => {
  return (
    <>
      <section className="donation-banner-area" style={{ backgroundImage: 'url(' + img + ')' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">Alternative family</h1>
              <h4 className="text__white">
                "We are committed to ensuring that all compatriots have the right to live and develop. 
                Each of your contributions will be a significant step in building a bright future for these little hearts."
              </h4>
            </div>
          </div>
        </div>
      </section>
      <FamilyPostGrid />
    </>
  )
}
export default FamilyPostPage
