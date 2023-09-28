import { get, post, put, del } from './api.js'

export async function getAll() {
    return get('/data/albums?sortBy=_createdOn%20desc');
}

export async function createItem(album) {
    return post('/data/albums', album);
}

export async function editItem(id, album){
    return put(`/data/albums/${id}`, album)
}

// export async function getMyBooks(userId) {
//     return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// }

export async function getItemById(id){
    return get(`/data/albums/${id}`);
}

// for like and buy functionality
export async function likeItem(albumId){
    return post('/data/likes', {albumId})
}

export async function getLikesByItemId(albumId){
    return get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}

export async function getMyLikeItemId(albumId, userId){
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function deleteItem(id){
    return del(`/data/albums/${id}`);
}

//for search functionality
export async function search(query) {
    return await get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
  }
