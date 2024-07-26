import React, { Component } from 'react'
import ModalVideo from 'react-modal-video'
import entryvideoimg from '../assets/images/entry-video-img.jpg'
import sectionIcon from '../public/images/section-icon.png'

class EntryArea extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false,
    }
  }

  handleModal = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  render() {
    return (
      <section className="entry-area">
        <div className="container">
          <div className="row entry-static-wrap">
            <div className="col-lg-3">
              <div className="entry-static-box entry-static-box1">
                <div className="section-icon">
                  <img src={sectionIcon} alt="section-icon" />
                </div>
                <h4 className="entry__title">The pain of children orphaned by COVID-19</h4>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="entry-static-box entry-static-box2 d-flex align-items-center">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="entry-video-img">
                      <img src={entryvideoimg} alt="entry-video-img" />
                      <ModalVideo
                        channel="youtube"
                        isOpen={this.state.isOpen}
                        videoId="OQygDvQtjNQ"
                        onClose={this.handleModal}
                      />
                      <div
                        onClick={this.handleModal}
                        className="mfp-iframe video-play-btn"
                        title="Play Video"
                      >
                        <i className="fa fa-play"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="entry-video-text">
                      <h4 className="entry__title">
                        We care for, nurture, and support orphaned children, abandoned children, and children in difficult circumstances.
                      </h4>
                      <p className="entry__text">Xem tin tức về những trẻ mồ côi</p>
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
}

export default EntryArea
