import { get, post, put, del } from './api.js'

export async function getAll() {
    return get('/data/fruits?sortBy=_createdOn%20desc');
}



export async function createItem(item) {
    return post('/data/fruits', item);
}

export async function editItem(id, item){
    return put(`/data/fruits/${id}`, item)
}



export async function getItemById(id){
    return get(`/data/fruits/${id}`);
}



export async function deleteItem(id){
    return del(`/data/fruits/${id}`);
}

//for search functionality
export async function search(query) {
    return await get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
  }
