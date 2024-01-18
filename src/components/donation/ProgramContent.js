import { NavLink, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { donationApi } from 'src/api/services'
import numeral, { Numeral } from 'numeral'

const ProgramContent = ({ program }) => {
  return (
    <section className="causes-detail-area">
      <div className="container">
        <div className="row blog-content-wrap">
          <div className="col-lg-12">
            <div className="blog-content">
              <div className="blog-item">
                <div className="blog-img">
                  <img className="program-content-img" src={program?.post?.image_url} alt="" />
                </div>
                <div className="blog-inner-content mb-4">
                  <div className="inner-causes-box">
                    <h3 className="blog__title">
                      <NavLink>{program?.post.title}</NavLink>
                    </h3>
                    <ul className="blog__list">
                      <li>
                        <i className="fa fa-users "></i> Số lượt tài trợ:
                        <span> {program?.stats?.count}</span>
                      </li>
                      <li>
                        <i className="fa fa-money"></i> Số tiền tài trợ:
                        <span> {numeral(program?.stats?.amount).format('0,0₫') + ' VND'}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="inner-causes-btn">
                    <NavLink to={'../donation?programId=' + program?.donation_purpose_id}>
                      <a className="theme-btn text-white text-nowrap">Tài trợ ngay</a>
                    </NavLink>
                  </div>
                </div>
                <div className="blog-inner-content-2">
                  <div className="causes__text">
                    <div
                      id="textmt"
                      dangerouslySetInnerHTML={{
                        __html: program?.post?.content,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgramContent
