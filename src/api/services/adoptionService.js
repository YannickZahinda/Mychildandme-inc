import axiosPublic from '../axiosPublic'
const adoptionService = () => {
  const adoptionApi = {
    createAdoptionApplication: (data) => {
      const url = '/adoption-application'
      return axiosPublic.post(url, data)
    },
  }
  return adoptionApi
}

export default adoptionService
