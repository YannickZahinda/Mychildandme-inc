import React from 'react'
import img from 'src/assets/images/volunteer.jpg'
import EventPostsGrid from 'src/components/grid/EventPostsGrid'
const EventPostPage = () => {
  return (
    <>
      <section className="donation-banner-area" style={{ backgroundImage: 'url(' + img + ')' }}>
        <div className="container">
          <div className="row justify-content-center">
          <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
            <h1 className="text__white mb-3">Volunteer Events</h1>
            <h4 className="text__white">
              We are looking for compassionate souls, those who wish to make a positive change in the lives of orphaned children. Become a volunteer at the orphanage, so we can share love and create meaningful memories for the children, helping them build a hopeful and promising future.
            </h4>
          </div>

          </div>
        </div>
      </section>
      <EventPostsGrid />
    </>
  )
}
export default EventPostPage
