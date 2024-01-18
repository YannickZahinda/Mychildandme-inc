import axiosPublic from '../axiosPublic'
const postService = () => {
  const postApi = {
    getFamilyPosts: () => {
      const url = '/families/posts'
      return axiosPublic.get(url)
    },
    getFamilyPostDetail: (id) => {
      const url = '/families/' + id + '/posts'
      return axiosPublic.get(url)
    },
    getEventPosts: (params) => {
      const url = '/volunteers/events'
      return axiosPublic.get(url, params)
    },
    getEventPostDetail: (id, params) => {
      const url = '/volunteers/events/' + id
      return axiosPublic.get(url, params)
    },
    getArticlePostDetail: (id) => {
      const url = '/articles/' + id
      return axiosPublic.get(url)
    },
    getRelatedArticles: (id) => {
      const url = '/articles/' + id + '/related'
      return axiosPublic.get(url)
    },
    getTopArticles: (top) => {
      const url = '/articles/top?top=' + top
      return axiosPublic.get(url)
    },
    getHomeStatistics: () => {
      const url = '/content/statistics'
      return axiosPublic.get(url)
    },
    getAdoptionInfoPage: () => {
      const url = '/content/information-page/adoption-info'
      return axiosPublic.get(url)
    },
    getBankInfoPage: () => {
      const url = '/content/information-page/bank-info'
      return axiosPublic.get(url)
    },
  }
  return postApi
}

export default postService
