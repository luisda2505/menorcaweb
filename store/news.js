import axios from "axios";

export const state = () => ({
    news: [],
    post: [],
});

export const getters = {
    getNews(state) {
        return state.news;
    },
    getPost(state) {
        return state.post;
    },
}

export const actions = {
    async fetchNews({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/noticias`, obj.payload)
            .then(({ data }) => {
                commit('setNews', data.posts);
                return data;
            })
            .catch(e => {

            });
    },

    async fetchPost({ commit }, obj) {

        return await axios.get(`${process.env.API_URL}/noticias/${obj.id}`)
            .then(({ data }) => {
                //console.log('data', data);
                commit('setPost', data);
                return data;
            })
            .catch(e => {

            });

    },

    async saveNew({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/noticias/save-new`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            });
    },

    async deleteNews({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/noticias/delete-new`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            });
    },

    async updateNews({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/noticias/update-new`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            });
    },
}

export const mutations = {
    setNews(state, data) {
        state.news = data;
    },
    setPost(state, data) {
        state.post = data;
    },
};
