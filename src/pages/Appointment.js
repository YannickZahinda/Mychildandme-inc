import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from 'src/components/hooks/useAuth'

const AppointmentPage = () => {
  const { auth } = useAuth()

  if (!auth?.accessToken) {
    return <Navigate to="../login" replace />
  }
  return <>AppointmentPage</>
}

export default AppointmentPage
