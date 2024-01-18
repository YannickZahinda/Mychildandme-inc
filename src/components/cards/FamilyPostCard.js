import numeral from 'numeral'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { donationApi } from 'src/api/services'
const FamilyPostCard = ({
  familyId,
  imageUrl,
  donationCount,
  donationAmount,
  familyName,
  summary,
}) => {
  return (
    <>
      <div className="blog-content program-card">
        <div className="blog-item blog-item1">
          <div className="blog-img">
            <img src={imageUrl} alt="" />
            <span className="blog__tag">
              <ul className="blog__list">
                <li>
                  <i className="icon-target"></i> Lượt tài trợ: <span>{donationCount}</span>
                </li>
                <li>
                  <i className="fa fa-line-chart"></i> Tiền tài trợ:{' '}
                  <span>{numeral(donationAmount).format('0,0₫') + ' VND'}</span>
                </li>
              </ul>
            </span>
          </div>
          <div className="blog-inner-content">
            <h3 className="blog__title mb-1">
              <NavLink to={'./' + familyId + '/' + familyName}>{familyName}</NavLink>
            </h3>
            <p className="blog__desc">{summary}</p>
            <div className="mt-3">
              <NavLink to={'../donation?programId=2&familyId=' + familyId} className="card-btn">
                <san>Tài trợ ngay</san>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default FamilyPostCard
