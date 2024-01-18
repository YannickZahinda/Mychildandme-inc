import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({}) => {
  const { auth } = useAuth()
  if (auth?.accessToken) {
    return <Outlet />
  } else {
    return <Navigate to="/login" />
  }
}

export default RequireAuth
