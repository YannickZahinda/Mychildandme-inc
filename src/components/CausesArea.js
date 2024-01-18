import React from 'react'
import sectionicon from '../public/images/section-icon.png'

const CausesArea = () => {
  return (
    <div>
      <section className="causes-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="section-heading blog-heading text-center">
                <div className="section-icon">
                  <img src={sectionicon} alt="section-icon" />
                </div>
                <h2 className="section__title">Tin tức hoạt động</h2>
              </div>
            </div>
          </div>
          <div className="row blog-content-wrap">
            <div className="col-lg-4">
              <div className="blog-content">
                <div className="blog-item blog-item1">
                  <div className="blog-img">
                    <img
                      src="https://sosvietnam.org/getmedia/8fef5f95-cfde-4261-8cba-9a927c14095f/Hinh1_2.jpg?width=425"
                      alt=""
                    />
                  </div>
                  <div className="blog-inner-content">
                    <h3 className="blog__title">
                      Làng trẻ em SOS Vinh tổ chức tổng kết hoạt động hè của hơn 100 sinh viên tình
                      nguyện Trường Đại học Vinh sdfsdffffffffffffffffffff
                    </h3>
                    <a href="/donate" className="theme-btn">
                      Xem thêm
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="blog-content">
                <div className="blog-item blog-item1">
                  <div className="blog-img">
                    <img
                      src="https://sosvietnam.org/getmedia/99761ee9-ddbf-4049-8419-528ff1064a0c/Anh-3_4.JPG?width=425"
                      alt=""
                    />
                  </div>
                  <div className="blog-inner-content">
                    <h3 className="blog__title">
                      Dự án Thư viện di động trong không gian sinh thái triển khai nhiều hoạt động
                      mới
                    </h3>
                    <a href="/donate" className="theme-btn">
                      Xem thêm
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="blog-content">
                <div className="blog-item blog-item1">
                  <div className="blog-img">
                    <img
                      src="https://sosvietnam.org/getmedia/576e0842-ae23-4322-b5cd-e0b09148fcd8/Hinh3_1.jpg?width=425"
                      alt=""
                    />
                  </div>
                  <div className="blog-inner-content">
                    <h3 className="blog__title">
                      Học sinh Làng trẻ em SOS Vinh tham dự Phiên họp giả định Quốc hội trẻ em lần
                      thứ nhất năm 2023
                    </h3>
                    <a href="/donate" className="theme-btn">
                      Xem thêm
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CausesArea
