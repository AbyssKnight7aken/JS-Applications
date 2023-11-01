import { get, post, put, del } from './api.js'

export async function getAll() {
    return get('/data/shoes?sortBy=_createdOn%20desc');
}

export async function createItem(item) {
    return post('/data/shoes', item);
}

export async function editItem(id, book){
    return put(`/data/shoes/${id}`, book)
}

// export async function getMyBooks(userId) {
//     return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// }

export async function getItemById(id){
    return get(`/data/shoes/${id}`)
}

// export async function likeBook(bookId){
//     return post('/data/likes', {
//         bookId
//     })
// }

// export async function getLikesByBookId(bookId){
//     return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,);
// }

// export async function getMyLikeBookId(bookId, userId){
//     return get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`,);
// }

export async function deleteItem(id){
    return del(`/data/shoes/${id}`);
}

//for search functionality
export async function search(query) {
    return await get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
  }
