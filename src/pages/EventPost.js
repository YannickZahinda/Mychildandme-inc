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
              <h1 className="text__white mb-3">Sự kiện tình nguyện</h1>
              <h4 className="text__white">
                Chúng tôi đang tìm kiếm những tâm hồn nhân văn, những người mong muốn làm thay đổi
                tích cực trong cuộc sống của trẻ mồ côi. Hãy trở thành một tình nguyện viên tại trại
                trẻ mồ côi, để chúng ta cùng chia sẻ yêu thương và tạo nên những kỷ niệm ý nghĩa cho
                những đứa trẻ, giúp họ xây dựng tương lai lạc quan và đầy hứa hẹn.
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
