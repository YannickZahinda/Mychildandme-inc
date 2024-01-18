import axiosPublic from '../axiosPublic'
const donationService = () => {
  const donationApi = {
    donate: (data) => {
      const url = '/donations'
      return axiosPublic.post(url, data)
    },
    getDonorByToken: (token) => {
      const url = '/donors?token=' + token
      return axiosPublic.get(url)
    },
    donorDoDonate: (id, data) => {
      const url = '/donors/' + id + '/donations'
      return axiosPublic.post(url, data)
    },
    getDonationByDonationHash: (donationHash) => {
      const url = '/donations?donationHash=' + donationHash
      return axiosPublic.get(url)
    },
    getDonationsByDonorToken: (donorToken) => {
      const url = '/donations?donorToken=' + donorToken
      return axiosPublic.get(url)
    },
    getAllDonationPurposes: () => {
      const url = '/donation-purposes'
      return axiosPublic.get(url)
    },
    getAllFamilies: () => {
      const url = '/donations/families'
      return axiosPublic.get(url)
    },
    getDonationPrograms: () => {
      const url = '/donation-programs'
      return axiosPublic.get(url)
    },
    getDonationProgramDetail: (id) => {
      const url = '/donation-programs/' + id
      return axiosPublic.get(url)
    },
    getMonthlyDonation: (params) => {
      const url = '/donations/monthly'
      return axiosPublic.get(url, params)
    },
  }
  return donationApi
}

export default donationService
