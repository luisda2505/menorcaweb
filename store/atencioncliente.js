import axios from 'axios';

export const state = () => ({
    typeAttentions: [],
    categoryAttentions: [],
    budgets: [],
    questions: [],
    tickets: [],
    messages: [],
    nextTickets: "",
    nextQuestions: {},
    ticketDetail: [],
    notifications: [],
    projects: [],
    budgetByProjects: [],
    budgetTitulars: [],
    selectedBudget: "",
    useCivilStatus: false,
    budgedUnit: 0,
})

export const getters = {
    getNotifications(state) {
        return state.notifications;
    },
    getTypeAttentions(state) {
        return state.typeAttentions;
    },
    getCategoryAttentions(state) {
        return state.categoryAttentions;
    },
    getBudgets(state) {
        return state.budgets;
    },
    getQuestions(state) {
        return state.questions;
    },
    getTickets(state) {
        return state.tickets;
    },
    getMessages(state) {
        return state.messages;
    },
    getNextTickets(state) {
        return state.nextTickets;
    },
    getNextQuestions(state) {
        return state.nextQuestions;
    },
    getTicketDetail(state) {
        return state.ticketDetail;
    },
    getProjects(state) {
        return state.projects;
    },
    getSelectedBudget(state) {
        return state.selectedBudget;
    },
    getBudgedTitulars(state) {
        return state.budgetTitulars;
    },
    getUseCivilStatus(state) {
        return state.useCivilStatus;
    },
    getBudgedUnit(state) {
        return state.budgedUnit;
    },
}

export const actions = {
    async listNotifications({ commit }, obj) {

        // return await axios.get(`${process.env.API_URL}/notificaciones`, { headers: { "x-access-token" : obj.token } })
        //     .then( ({ data }) => {
        //         //console.log('listNotifications', data);
        //         commit('setNotifications', data.notifications);
        //         return data;
        //     })
        //     .catch(e => {

        //     });
    },
    async createRequest({ commit }, obj) {

        let formData = new FormData();
        formData.append('typeAttention', obj.payload.typeAttention);
        formData.append('categoryAttention', obj.payload.categoryAttention);
        formData.append('projectId', obj.payload.projectId);
        formData.append('budgetId', obj.payload.budgetId);
        formData.append('email', obj.payload.email);
        formData.append('phone', obj.payload.phone);
        formData.append('subject', obj.payload.subject);
        formData.append('detail', obj.payload.detail);
        /* formData.append('file', obj.payload.file);
        formData.append('fileName', obj.payload.fileName); */
        if(obj.payload.filesData && obj.payload.filesData.length > 0) {
            for (const fileData of obj.payload.filesData) {
                formData.append('files', fileData.file);
            }
        }

        return await axios.post(`${process.env.API_URL}/consultas/crear`, formData, { headers: { 'Content-Type': 'multipart/form-data', "x-access-token" : obj.token } })
            .then( ({ data }) => {
                //console.log('creaeRequest', data);
                return data;
            })
            .catch(e => {

            });
    },
    async sendMessage({ commit }, obj) {

        let formData = new FormData();
        formData.append('id', obj.payload.id);
        formData.append('content', obj.payload.content);
        /* formData.append('fileName', obj.payload.fileName);
        formData.append('file', obj.payload.file); */

        if(obj.payload.filesData && obj.payload.filesData.length > 0) {
            for (const fileData of obj.payload.filesData) {
                formData.append('files', fileData.file);
            }
        }
/*
        return await axios.post(`${process.env.API_URL}/consulta/${obj.payload.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data', "x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            }); */
    },
    async getSperantBudgedTitular({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/categoria_atencion/getTitulars`, obj.payload, { headers: { "x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            });
    },
    async fetchTicketOptions({ commit }, obj) {

        return await axios.get(`${process.env.API_URL}/nueva-solicitud`, { headers: { "x-access-token" : obj.token } })
            .then( ({ data }) => {
                //console.log('fetchTicketOptions', data)
                commit('setTypeAttentions', data.typeAttentions);
                commit('setCategoryAttentions', data.categoryAttentions);
                commit('setBudgets', data.budgets);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchQuestions({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/t-preguntas-frecuentes`, obj.payload, { headers: {"x-access-token" : obj.token }, params: obj.params })
            .then( ({ data }) => {
                commit('setQuestions', data.frequentQuestions);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchMoreQuestions({ commit }, obj) {

        //return await axios.post(`${process.env.API_URL}/preguntas-frecuentes`, obj.payload, { headers: {"x-access-token" : obj.token }, params: obj.params })
        return await axios.post(`${process.env.API_URL}/t-preguntas-frecuentes`, obj.payload, { headers: {"x-access-token" : obj.token }, params: obj.params })
            .then( ({ data }) => {
                //console.log('fetchQuestions', data)
                commit('setMoreQuestions', data);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchTickets({ commit }, obj) {
        //console.log('obj store token', obj.token);
        return await axios.post(`${process.env.API_URL}/consultas`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                //console.log('fetchTickets', data)
                commit('setTickets', data);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchMoreTickets({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/consultas`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                commit('setMoreTickets', data);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchAllCategories({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/categoria_atencion/list`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            });
    },
    async syncCategoriesApis({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/categoria_atencion/sync-apis`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            });
    },
    async fetchProjectCategories({ commit }, obj) {

        var urlComp = '';
			switch (obj.selectedType) {
				case "1":
					urlComp = 'Solicitud';
					break;
				case "2":
					urlComp = 'Queja';
					break;
				case "3":
					urlComp = 'Consulta';
					break;
			}

        return await axios.get(`${process.env.API_URL}/categoria_atencion/${urlComp}`, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                // commit('setCategoryAttentions', data.data);
                return data;
            })
            .catch(e => {

            });
    },
    async fetchTicket({ commit }, obj) {

        return await axios.get(`${process.env.API_URL}/consulta/${obj.id}`, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                //console.log('fetchQuestions', data)
                commit('setMessages', data.notes);
                commit('setTicketDetail', data.sperantData);
                return data;
            })
            .catch(e => {

            });
    },
    async sendNoteTicket({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/sendNote`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            });
    },
    async updateCategoryVisibility({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/categoria_atencion/update_visibility`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            });
    },
    async uploadDocuments({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/categoria_atencion/ocr_evaluation`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            });
    },
    async getBudgetData({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/getBudgetData`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            });
    },
    async getBudgetUnit({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/getBudgetUnit`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            });
    },
    async createSperantNewTicket({ commit }, obj) {

        return await axios.post(`${process.env.API_URL}/createSperantNewTicket`, obj.payload, { headers: {"x-access-token" : obj.token } })
            .then( ({ data }) => {
                return data;
            })
            .catch(e => {

            });
    },
    // async getSperantProjects({ commit }, obj) {

    //     return await axios.get(`${process.env.SPERANTO_URL}/projects`, { headers: { "Authorization": process.env.SPERANTO_KEY } })
    //         .then(({ data }) => {
    //             return data;
    //         })
    //         .catch(e => {

    //         });
    // },
    // async getTEST({ commit }, obj) {
	// 	return await axios
	// 		.post(`${process.env.API_URL}/TEST1`, obj, {
	// 			headers: { 'x-access-token': obj.token },
	// 		})
	// 		.then(({ data }) => {
	// 			return data;
	// 		})
	// 		.catch((e) => {
	// 			console.log(e);
	// 		});
	// },

}

export const mutations = {
    setNotifications(state, data) {
        state.notifications = data;
    },
    setTypeAttentions(state, data) {
        state.typeAttentions = data;
    },
    setCategoryAttentions(state, data) {
        state.categoryAttentions = data;
    },
    setBudgets(state, data) {
        state.budgets = data;
    },
    setQuestions(state, data) {
        state.nextQuestions = data.pagination;

        state.questions = data;
    },
    setMoreQuestions(state, data) {
        //state.historyPayments = data;

        state.nextQuestions = data.pagination

        if (data.frequentQuestions && data.frequentQuestions.length > 0) {
            data.frequentQuestions.forEach((element) => {
                state.questions.push(element);
            });
        }
    },
    setTickets(state, data) {
        state.nextTickets = data.next;
        state.tickets = data.tickets;
    },
    setMoreTickets(state, data) {
        //state.historyPayments = data;

        state.nextTickets = data.next;

        if (data.tickets && data.tickets.length > 0) {
            data.tickets.forEach((element) => {
                state.tickets.push(element);
            });
        }
    },
    setMessages(state, data) {
        state.messages = data;
    },
    setTicketDetail(state, data) {
        state.ticketDetail = data;
    },
    setProjects(state, data) {
        state.projects = data;
    },
    setSelectedBudget(state, data) {
        state.selectedBudget = data;
    },
    setBudgedTitulars(state, data) {
        state.budgetTitulars = data;
    },
    setUseCivilStatus(state, data) {
        state.useCivilStatus = data;
    },
    setBudgedUnit(state, data) {
        state.budgedUnit = data;
    },
    cleanMoreQuestions(state, data) {
        //state.historyPayments = data;

        state.question = [];
        state.nextQuestions = {
            page: 1,
        };
    },
    modifyQuestionRate(state, data) {
        const {question} = data

        state.questions = state.questions.map((q)=>{
            if(q._id == question._id){
                q = {...question}
            }
            return {...q}
        });
    },

}
