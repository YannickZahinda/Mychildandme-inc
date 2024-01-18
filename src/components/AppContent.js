import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

// routes config
import routes from '../routes'
import RequireAuth from './requireAuth/RequireAuth'
import { AccountAdoptionApplicationPage, AccountPage } from 'src/pages'

const AppContent = () => {
  return (
    // <CContainer lg>
    //   <Suspense fallback={<CSpinner color="primary" />}>
    <>
      <Routes>
        {routes.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.element />}
              />
            )
          )
        })}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/*" element={<Navigate to="/home" replace />} />
        <Route element={<RequireAuth />}>
          <Route path="/accounts" element={<AccountPage />} />
          <Route path="/accounts/adoption" element={<AccountAdoptionApplicationPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default React.memo(AppContent)
