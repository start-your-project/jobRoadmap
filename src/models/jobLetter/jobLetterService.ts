import axios from 'axios'
const ip = 'http://job-roadmap.ru:1323/'
export async function fetchJobLetter (data): Promise<any> {
  // eslint-disable-next-line no-debugger
  return await axios.post(`${ip}api/v1/letter`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
