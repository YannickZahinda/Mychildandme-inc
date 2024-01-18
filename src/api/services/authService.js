import axiosPublic from '../axiosPublic'
const authService = () => {
  const authApi = {
    login: (data) => {
      const url = '/login'
      return axiosPublic.post(url, data)
    },
    register: (data) => {
      const url = '/register'
      return axiosPublic.post(url, data)
    },
    applicantRegister: (data) => {
      const url = '/applicant/register'
      return axiosPublic.post(url, data)
    },
    getVerifyInformation: (data) => {
      const url = '/account/verify'
      return axiosPublic.post(url, data)
    },
    activeAccount: (data) => {
      const url = '/account/verify'
      return axiosPublic.put(url, data)
    },
    activeApplicantAccount: (data) => {
      const url = '/applicant/account/verify'
      return axiosPublic.post(url, data)
    },
  }
  return authApi
}

export default authService
