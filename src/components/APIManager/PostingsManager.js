export const getPostingById = (id) => {
    return fetch(`http://localhost:8088/postings/${id}`)
    .then(response => response.json())
}