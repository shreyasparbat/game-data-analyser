import axios from 'axios'

const baseUrl = 'https://us-central1-ethlas-test.cloudfunctions.net/'

const createView = (view) => axios.post(baseUrl + 'views-createView', {view})

export {
    createView
}