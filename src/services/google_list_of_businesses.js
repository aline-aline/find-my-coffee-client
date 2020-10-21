import Api from './api'

const GoogleListOfBusinessesService = {
  index: (latitude, longitude) => Api.get(`/google_stores?latitude=${latitude}&longitude=${longitude}`)
}

export default GoogleListOfBusinessesService
