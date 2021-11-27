import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = (newPersonObject) => {
  return axios
    .post(baseUrl, newPersonObject)
    .then(response => response.data)
}

const remove = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
}

export default { getAll, create, remove }