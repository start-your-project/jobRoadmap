import axios from 'axios'
const ip = 'http://89.208.85.17:1323/'
export async function fetchResResume (data): Promise<any> {
  // eslint-disable-next-line no-debugger
  debugger
  return await axios.post(`${ip}api/v1/resume`, { file: data, n_tech: 1, n_prof: 1 }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    })
}
