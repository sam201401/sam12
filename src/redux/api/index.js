import defaultAxios from 'axios'

const axios = defaultAxios.create({
  baseURL: 'https://gorest.co.in/public/v1/',
  headers: {'Content-Type': 'application/json'}
});

// Get All Todos
export const getPost= async (pageNo) => {
  try {
    const posts = await axios.get(`posts?page=${pageNo}`)

    return posts.data
  } catch(err) {
    return console.error(err)
  }
}


