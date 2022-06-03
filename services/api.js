import axios from 'axios'

// Base url for al functions
const baseUrl = 'https://us-central1-ethlas-test.cloudfunctions.net/'

// Create 

const readData = () => axios.post(baseUrl + 'data-readData')

const createView = view => axios.post(baseUrl + 'views-createView', { view })

const readView = viewId => axios.post(baseUrl + 'views-readView', { viewId })

const updateView = (view, viewId) => axios.post(baseUrl + 'views-updateView', {view, viewId})

const readViewsInfo = () => axios.post(baseUrl + 'views-readViewNames')

export { readData, createView, readView, updateView, readViewsInfo }
