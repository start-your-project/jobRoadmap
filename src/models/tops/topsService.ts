import axios from 'axios'
const ip = 'http://job-roadmap.ru:1323/'
export async function fetchTop (): Promise<any> {
  return await axios.get(`${ip}api/v1/top`)
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}

export async function fetchNodeProf (input): Promise<any> {
  return await axios.post(`${ip}api/v1/list`, { technology_name: input })
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
