import { get, post, put, del } from './api.js'

export async function getAll() {
    return get('/data/offers?sortBy=_createdOn%20desc');
}

export async function createItem(offer) {
    return post('/data/offers', offer);
}

export async function editItem(id, book){
    return put(`/data/offers/${id}`, book)
}

// export async function getMyBooks(userId) {
//     return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
// }

export async function getItemById(id){
    return get(`/data/offers/${id}`);
}

// for like and buy functionality
export async function applyForOffer(offerId){
    return post('/data/applications', {
        offerId
    })
}

export async function getTotalAppsCount(offerId){
    return get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`);
}

export async function getHasAppliedForOffer(offerId, userId){
    return get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function deleteItem(id){
    return del(`/data/offers/${id}`);
}

//for search functionality
export async function search(query) {
    return await get(`/data/shoes?where=brand%20LIKE%20%22${query}%22`);
  }
