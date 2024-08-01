import React, { Component, useEffect, useState } from 'react'
import sectionicon from '../public/images/section-icon.png'
import { publicApi } from 'src/api/services'
const FaqArea = () => {
  const [state, setState] = useState(0)
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    const getFaqs = async () => {
      try {
        const response = await publicApi.getFaqs()
        setFaqs(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    getFaqs()
  }, [])

  const handleFAQClick = (id) => {
    if (id == state) {
      setState(0)
    } else {
      setState(id)
    }
  }

  return (
    <section className="faq-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-heading">
              <div className="section-icon">
                <img src={sectionicon} alt="section-icon" />
              </div>
              <h2 className="section__title">Frequently Asked Questions (FAQs)</h2>
            </div>
            <div className="faq-img-box">
              <img src="/images/faq-img.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="accordion-container">
              {faqs.map((faq, index) => (
                <>
                  {index < 3 && (
                    <div className="ac js-enabled is-active">
                      <h2 className="ac-q " tabIndex="0" onClick={() => handleFAQClick(faq.faq_id)}>
                        {faq.question}
                      </h2>
                      <div
                        className="ac-a"
                        style={
                          faq.faq_id == state
                            ? {
                                height: 'auto',
                                transition: 'all 600ms ease 0s',
                                transitionProperty: 'height',
                              }
                            : {
                                height: '0',
                                transition: 'all 600ms ease 0s',
                                transitionProperty: 'height',
                              }
                        }
                      >
                        <p className="accordion__content-desc">
                          <div
                            id="textmt"
                            dangerouslySetInnerHTML={{
                              __html: faq.answer,
                            }}
                          />
                        </p>
                      </div>
                    </div>
                  )}
                </>
                // return (
                //   <div className="ac js-enabled is-active">
                //     <h2 className="ac-q " tabIndex="0" onClick={() => handleFAQClick(faq.faq_id)}>
                //       {faq.question}
                //     </h2>
                //     <div
                //       className="ac-a"
                //       style={
                //         faq.faq_id == state
                //           ? {
                //               height: 'auto',
                //               transition: 'all 600ms ease 0s',
                //               transitionProperty: 'height',
                //             }
                //           : {
                //               height: '0',
                //               transition: 'all 600ms ease 0s',
                //               transitionProperty: 'height',
                //             }
                //       }
                //     >
                //       <p className="accordion__content-desc">
                //         <div
                //           id="textmt"
                //           dangerouslySetInnerHTML={{
                //             __html: faq.answer,
                //           }}
                //         />
                //       </p>
                //     </div>
                //   </div>
                // )
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqArea
