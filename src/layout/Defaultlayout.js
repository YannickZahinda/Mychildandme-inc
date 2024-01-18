import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader, Header, Footer } from '../components/index'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/plugins/bootstrap/bootstrap.min.css'
import '../public/css/font-awesome.css'
import '../public/css/animate.min.css'
import '../public/css/fontello.css'
import '../public/css/video.css'
import '../public/plugins/accordion.css'
import '../public/plugins/glightbox.min.css'
import '../public/css/style.css'
import '../public/css/responsive.css'

import '../public/plugins/accordion.min.js'
import '../public/plugins/glightbox.min.js'

const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <AppContent />
      <Footer />
    </div>
  )
}

export default DefaultLayout
