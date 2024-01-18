import axiosPublic from '../axiosPublic'
import AxiosPrivate from '../axiosPrivate'
const volunteerService = () => {
  const instance = AxiosPrivate()
  const volunteerApi = {
    memberApplyEvent: (data) => {
      const url = '/volunteers/event-apply'
      return instance.post(url, data)
    },
    createVolunteer: (data) => {
      const url = '/volunteers/event-apply'
      return axiosPublic.post(url, data)
    },
  }
  return volunteerApi
}

export default volunteerService
