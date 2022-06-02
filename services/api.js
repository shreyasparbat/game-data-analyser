import axios from 'axios'

const baseUrl = 'https://us-central1-ethlas-test.cloudfunctions.net/'

exports.createView = (view) => axios.post(baseUrl + 'createView', {view})