import { get, post, put, del } from './api.js'

export async function getAll() {
    return get('/data/products?sortBy=_createdOn%20desc');
}

export async function createItem(item) {
    return post('/data/products', item);
}

export async function editItem(id, book){
    return put(`/data/products/${id}`, book)
}

// export async function getMyBooks(userId) {
//     return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// }

export async function getItemById(id){
    return get(`/data/products/${id}`);
}

// for like and buy functionality
export async function likeItem(itemId){
    return post('/data/bought', {
        itemId
    })
}

export async function getLikesByItemId(itemId){
    return get(`/data/bought?where=productId%3D%22${itemId}%22&distinct=_ownerId&count`);
}

export async function getMyLikeItemId(itemId, userId){
    return get(`/data/bought?where=productId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`,);
}

export async function deleteItem(id){
    return del(`/data/products/${id}`);
}

//for search functionality
export async function search(query) {
    return await get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
  }
