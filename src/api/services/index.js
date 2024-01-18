import adoptionService from './adoptionService'
import authService from './authService'
import donationService from './donationService'
import postService from './postService'
import publicService from './publicService'
import volunteerService from './vonlunteerService'

const publicApi = publicService()
const adoptionApi = adoptionService()
const authApi = authService()
const donationApi = donationService()
const postApi = postService()
export { publicApi, adoptionApi, authApi, donationApi, postApi }
