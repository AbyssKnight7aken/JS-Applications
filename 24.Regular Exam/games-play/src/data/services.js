import { get, post, put, del } from './api.js'

export async function getAll() {
    return get('/data/games?sortBy=_createdOn%20desc');
}

export async function getNewGames() {
    return get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export async function createItem(item) {
    return post('/data/games', item);
}

export async function editItem(id, item){
    return put(`/data/games/${id}`, item)
}

// export async function getMyBooks(userId) {
//     return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// }

export async function getItemById(id){
    return get(`/data/games/${id}`);
}

// for like and buy functionality
export async function addComment(data){
    return post('/data/comments', data)
}

export async function getAllComments(gameId){
    return get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

// export async function getMyLikeItemId(albumId, userId){
//     return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
// }

export async function deleteItem(id){
    return del(`/data/games/${id}`);
}

//for search functionality
// export async function search(query) {
//     return await get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
//   }
