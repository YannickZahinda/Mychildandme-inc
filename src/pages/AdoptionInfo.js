import React, { useEffect, useState } from 'react'
import { AdoptionForm } from 'src/components'
import img from 'src/assets/images/335090448_532387102338480_3810568149787479702_n.jpg'
import { NavLink, Navigate } from 'react-router-dom'
import useAuth from 'src/components/hooks/useAuth'
import { postApi } from 'src/api/services'
import { FaArrowRight } from 'react-icons/fa'

const AdoptionInfoPage = () => {
  const [pageInfo, setPageInfo] = useState(null)
  useEffect(() => {
    const getPageInfo = async () => {
      try {
        const response = await postApi.getAdoptionInfoPage()
        setPageInfo(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    getPageInfo()
  }, [])
  return (
    <>
      <section className="donation-banner-area" style={{ backgroundImage: 'url(' + img + ')' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">{pageInfo?.page_type}</h1>
              <h4 className="text__white">{pageInfo?.description}</h4>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-form-area register-area pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="section-heading text-center">
                <h2>{pageInfo?.page_title}</h2>
              </div>
            </div>
            <div className="col-lg-12 mt-3">
              <div
                id="textmt"
                dangerouslySetInnerHTML={{
                  __html: pageInfo?.page_content,
                }}
              />
            </div>
            <div className="col-lg-12 mt-5">
              <NavLink
                to="../adoption"
                className="d-flex justify-content-start align-items-center gap-2"
              >
               Go to the child information registration page
                <span>
                  <FaArrowRight />
                </span>
              </NavLink>
              {/* <button
                className="theme-btn submit__btn"
                onClick={handleSubmit}
                disabled={!formValid}
              >
                Gửi
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdoptionInfoPage
