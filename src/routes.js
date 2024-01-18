import React from 'react'

import HomePage from './pages/HomePage'
import ContactPage from './pages/Contact'
import AboutPage from './pages/About'
import AdoptionPage from './pages/Adoption'
import AppointmentPage from './pages/Appointment'
import DonationPage from './pages/Donation'
import DonationReturnPage from './pages/DonationReturn'
import DonationTrackingPage from './pages/DonationTracking'
import {
  ArticleCategoryPage,
  DonationListPage,
  DonationProgramPage,
  EventPostDetailPage,
  EventPostPage,
  FamilyPostDetailPage,
  FamilyPostPage,
  ProgramDetailPage,
  ArticlePostDetailPage,
  AccountPage,
  FaqPage,
  GalleryPage,
  AdoptionInfoPage,
  BankInformationPage,
  SearchArticlePage,
} from './pages'

const routes = [
  { path: '/home', element: HomePage },
  { path: '/contact', element: ContactPage },
  { path: '/about', element: AboutPage },
  { path: '/faqs', element: FaqPage },
  { path: '/gallery', element: GalleryPage },
  { path: '/adoption-info', element: AdoptionInfoPage },
  { path: '/bank-info', element: BankInformationPage },
  { path: '/adoption', element: AdoptionPage },
  { path: '/appointment', element: AppointmentPage },
  { path: '/donation', element: DonationPage },
  { path: '/donation/return', element: DonationReturnPage },
  { path: '/donation/tracking', element: DonationTrackingPage },
  { path: '/donation/list', element: DonationListPage },
  { path: '/donation/programs', element: DonationProgramPage },
  { path: '/donation/programs/:id', element: ProgramDetailPage },
  { path: '/posts/families', element: FamilyPostPage },
  { path: '/posts/families/:id/:title', element: FamilyPostDetailPage },
  { path: '/volunteers/events', element: EventPostPage },
  { path: '/volunteers/events/:id', element: EventPostDetailPage },
  { path: '/article-categories/:categoryName/:categoryId', element: ArticleCategoryPage },
  { path: '/articles/:articleSlug/:articleId', element: ArticlePostDetailPage },
  { path: '/articles/search', element: SearchArticlePage },
  // { path: '/accounts', element: AccountPage },
]

export default routes
