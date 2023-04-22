import axios from 'axios'
const ip = 'https://job-roadmap.ru/'
export async function fetchChecked (inputData: string): Promise<any> {
  return await axios.post(`${ip}api/v1/finished`, { name: inputData })
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}

export async function setChecked (inputData: string): Promise<any> {
  return await axios.post(`${ip}api/v1/finish`, { name: inputData })
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    }
    )
}

export async function unSetChecked (inputData: string): Promise<any> {
  return await axios.delete(`${ip}api/v1/cancel`, { data: { name: inputData } })
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
