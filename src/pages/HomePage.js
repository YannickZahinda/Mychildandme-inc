import React from 'react'
import SliderTwo from '../components/slider/SliderTwo'

import EntryArea from '../components/EntryArea'
import HiwArea from '../components/HiwArea'
import ServiceArea from '../components/ServiceArea'
import MixerArea from '../components/MixerArea'
import BlogHome from '../components/BlogHome'
import Map from '../components/Map'

const HomePage = () => {
  return (
    <>
      <SliderTwo />
      <EntryArea />
      <HiwArea />
      <ServiceArea />
      <MixerArea />
      <BlogHome />
      {/* <Map /> */}
    </>
  )
}

export default HomePage
