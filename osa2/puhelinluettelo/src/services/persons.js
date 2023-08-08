import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson);
  return request.then(response => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data)
};

const deletePerson = (personId) => {
  //console.log(`${baseUrl}/${personId}`)
  const request = axios.delete(`${baseUrl}/${personId}`)
  return request.then(response => response)
}

export default { getAll, create, deletePerson, update };
