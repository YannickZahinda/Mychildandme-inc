import AxiosPrivate from '../axiosPrivate'

const accountService = () => {
  const instance = AxiosPrivate()
  const accountApi = {
    getAccountDetail: (id) => {
      const url = '/account/' + id
      return instance.get(url)
    },
    getAdoptionApplicationHistory: (id) => {
      const url = '/account/' + id + '/adoption-history'
      return instance.get(url)
    },
    getVolunteerEventHistory: (id) => {
      const url = '/account/' + id + '/volunteer-history'
      return instance.get(url)
    },
    getAccountAdoptionInfo: (id) => {
      const url = '/account/' + id + '/adoption-info'
      return instance.get(url)
    },
    accountAddNewApplication: (id, data) => {
      const url = '/account/' + id + '/adoption-application/first-time'
      return instance.post(url, data)
    },
    accountAddApplication: (id, data) => {
      const url = '/account/' + id + '/adoption-application'
      return instance.post(url, data)
    },
    getAccountDonorInfo: (id) => {
      const url = '/account/' + id + '/donor-info'
      return instance.get(url)
    },
    accountAddNewDonation: (id, data) => {
      const url = '/account/' + id + '/donations/first-time'
      return instance.post(url, data)
    },
    getAppointments: (id, params) => {
      const url = '/' + id + '/appointments'
      return instance.get(url, params)
    },
    createAppointments: (id, data) => {
      const url = '/' + id + '/appointments'
      return instance.post(url, data)
    },
  }
  return accountApi
}

export default accountService
