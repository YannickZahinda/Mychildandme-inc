import axiosPublic from '../axiosPublic'
const publicService = () => {
  const publicApi = {
    getProvince: () => {
      const url = '/provinces'
      return axiosPublic.get(url)
    },
    getPresignedUrl: (fileName, folderPath) => {
      const url = '/files'
      return axiosPublic.post(url, {
        fileName: fileName,
        folderPath: folderPath,
      })
    },
    getArticileCategories: () => {
      const url = '/article-categories'
      return axiosPublic.get(url)
    },
    getCategoryDetail: (id, params) => {
      const url = '/article-categories/' + id
      return axiosPublic.get(url, params)
    },
    getArticilePosts: (params) => {
      const url = '/articles'
      return axiosPublic.get(url, params)
    },
    getFaqs: () => {
      const url = '/content/faq'
      return axiosPublic.get(url)
    },
    getWebsiteContact: () => {
      const url = '/content/website-contact'
      return axiosPublic.get(url)
    },
    getChatbotResponse: (params) => {
      const url = '/chat-bot/response'
      return axiosPublic.post(url, params)
    },
  }
  return publicApi
}

export default publicService
