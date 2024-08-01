import React, { useEffect, useState } from 'react'
import { publicApi } from 'src/api/services'
import img from 'src/assets/images/nu-cuoi.jpg'
const FaqPage = () => {
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
    <>
      <section className="donation-banner-area" style={{ backgroundImage: 'url(' + img + ')' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">Frequently asked questions (FAQs)</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="faq-area pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="accordion-container">
                {faqs.map((faq, index) => {
                  return (
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
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FaqPage
