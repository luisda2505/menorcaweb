<template>
	<div id="atencion_cliente">
		<div class="container">
			<!-- Page Content -->
			<div class="h-100 page-content">
				<div class="box">
					<Requests />
				</div>
			</div>
		</div>
		<Modal />
	</div>
</template>

<script>
import Menu from '@/components/common/Menu';
import Sidebar from '@/components/common/Sidebar';
import Requests from '../../components/atencion-al-cliente/Requests.vue';
import Cookies from 'js-cookie';
import { mapActions, mapGetters } from 'vuex';
import { EVENTS } from '../../core/constants/events';
import Modal from '@/components/modals/ModalDocument.vue';

export default {
	middleware: 'auth',
	transition: 'slide-left',
	layout: 'crm',
	data() {
		return {
			positionFixed: true,
		};
	},
	components: {
		Menu,
		Sidebar,
		Modal,
		Requests,
	},
	watch: {
		nextTickets(newObj) {
			if (typeof newObj !== 'undefined') {
				this.nextMoreTickets = newObj === 0 ? false : true;
			} else {
				this.nextMoreTickets = true;
			}
		},
		nextQuestions(newObj) {
			if (typeof newObj !== 'undefined') {
				if (newObj.page === newObj.pages) {
					this.nextMoreQuestions = false;
				} else {
					this.nextMoreQuestions = true;
				}
			} else {
				this.nextMoreTickets = true;
			}
		},
		proyecto(val) {
			this.filterBudgets(val);
		},
		categoryAttentions() {
			//console.log("categoryAttentions", this.categoryAttentions);
		},
	},
	computed: {
		...mapGetters({
			user: "account/getUserAccount",
			typeAttentions: 'atencioncliente/getTypeAttentions',
			categoryAttentions: 'atencioncliente/getCategoryAttentions',
			budgets: 'atencioncliente/getBudgets',
			questions: 'atencioncliente/getQuestions',
			nextTickets: 'atencioncliente/getNextTickets',
			nextQuestions: 'atencioncliente/getNextQuestions',
			questionCategories: 'faq/getQuestionCategories',
		}),
		projects() {
			let projects = [];
			let budgetByProject = [];

			this.budgets.map((budget) => {
				const match = projects.find((project) => project.id == budget.project.id);
				if (!match) {
					projects.push(budget.project);
					budgetByProject.push(budget.contact_num);
					// let budgetsProjects = {project: budget.project, contract: [budget.contact_num]};
					// budgetByProject.push(budgetsProjects);
				}
			});

			return projects;
		},
		userName() {
			if (this.user !== undefined && this.user.profile !== undefined && this.user.profile.name) {
				let str = this.user.profile.name.split(' ')[0].toLowerCase();
				return str.charAt(0).toUpperCase() + str.slice(1);
			}
		},
	},
	/* async created() {
		this.fetchQuestionCategories();
	}, */
	async mounted() {
		const session = JSON.parse(Cookies.get('session'));
		const token = session.token;

		this.titular = localStorage.getItem('titular');
		const obj = {
			token: token,
		};
		// const obj2 = {
		// 	token: token,
		// 	payload: {
		// 		page: this.page
		// 	},
		// };

		this.$store.dispatch('atencioncliente/fetchTicketOptions', obj).then(() => { });

		// await this.$store.dispatch('account/getUserAccount', { token }).then((response) => { });

		// const obj3 = {
		// 	token: token,
		// 	payload: {
		// 		sperantClientId: this.user.profile.sperantClientId
		// 	},
		// };

		this.$store.commit('atencioncliente/setProjects', this.projects);

		// await this.$store.dispatch("atencioncliente/getTEST", obj3).then((response) => {
		// console.log("AQUI LA RESPUESTA");
		// console.log(this.projects);
		// 	});

		// DONT KNOW IF IT IS USED

		// let referPayments = this.$route.query.ref;

		// if (referPayments) {
		// 	this.tipo_solicitud = {
		// 		color: '#ff7519',
		// 		id: 3,
		// 		max_attention: 7,
		// 		name: 'Solicitud',
		// 		reminder_days: 3,
		// 	};

		// 	this.categoria_atencion = {
		// 		id: 39,
		// 		name: 'Lotes-Cobranza',
		// 	};

		// 	this.proyecto = this.projects[0].id;
		// 	this.correo = this.user.email;
		// 	this.celular = this.user.profile.phone;
		// 	//this.asunto = '';
		// }
	},
	methods: {
		nextStep() {
			if (this.currentStep < this.steps.length) {
				this.currentStep++;
			}
		},
		prevStep() {
			if (this.currentStep > 1) {
				this.currentStep--;
			}
		},
		onFileChange(e) {
			if (e.target.files.length) {
				const file = e.target.files[0];
				this.imageDesktop = file;
				this.fileName = file.name;
			} else {
				this.imageDesktop = null;
				this.fileName = '';
			}
		},
		removeFile() {
			this.$refs.file.value = null;
			this.imageDesktop = null;
			this.fileName = '';
		},
		filterBudgets(id) {
			const filteredBudgets = this.budgets.reduce((acc, budget) => {
				if (id && budget.project.id != id) return acc;
				return [...acc, budget];
			}, []);

			this.contractNum = '';
			this.budgetId = '';
			this.filteredBudgets = filteredBudgets;
		},
		fetchMoreQuestions() {
			this.loadingFetchMoreQuestions = true;

			this.page++;

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {
					page: this.page,
				},
				params: {
					category: this.mainCategory._id,
				},
			};

			this.$store.dispatch('atencioncliente/fetchMoreQuestions', obj).then((response) => {
				this.loadingFetchMoreQuestions = false;
			});
		},
		updateTicketsList() {
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {
					page: 1,
					budgetCode: localStorage.getItem('budget_code'),
				},
			};

			this.$store.dispatch('atencioncliente/fetchTickets', obj).then(() => {
				this.loadingTickets = false;
			});
		},
		fetchMoreTickets() {
			this.loadingFetchMoreTickets = true;

			this.page++;

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {
					page: this.page,
					budgetCode: localStorage.getItem('budget_code'),
				},
			};

			this.$store.dispatch('atencioncliente/fetchMoreTickets', obj).then((response) => {
				this.loadingFetchMoreTickets = false;
			});
		},
		onlyNumber($event) {
			let keyCode = $event.keyCode ? $event.keyCode : $event.which;
			if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
				$event.preventDefault();
			}
		},
		generateCodeFromCIPState() {
			this.cipState = false;
			this.step1 = true;
		},
		sortedArray(array) {
			return array.slice().sort(function (a, b) {
				return a.name > b.name ? 1 : -1;
			});
		},
		validateEmail(value) {
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
				return true;
			} else {
				return false;
			}
		},
		capitalizeWord(str) {
			const str2 = str.charAt(0).toUpperCase() + str.slice(1);
			return str2;
		},
		async getGContacts() {
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			await this.$store.dispatch('contact/getGoogleContacts', { token }).then((response) => {
				console.log('getGoogleContacts', response);
			});
		},
		validate() {
			this.tipo_solicitud === '' || this.tipo_solicitud === '-'
				? (this.errors.tipo_solicitud = true)
				: (this.errors.tipo_solicitud = false);

			this.categoria_atencion === '' || this.categoria_atencion === '-'
				? (this.errors.categoria_atencion = true)
				: (this.errors.categoria_atencion = false);

			this.proyecto === '' || this.proyecto === '-'
				? (this.errors.proyecto = true)
				: (this.errors.proyecto = false);

			!this.validateEmail(this.correo) ? (this.errors.correo = true) : (this.errors.correo = false);

			//console.log("this.celular", this.celular);
			this.celular === '' ? (this.errors.celular = true) : (this.errors.celular = false);
			this.asunto === '' ? (this.errors.asunto = true) : (this.errors.asunto = false);
			this.solicitud === '' ? (this.errors.solicitud = true) : (this.errors.solicitud = false);

			this.contrato === '' || this.contrato === '-'
				? (this.errors.contrato = true)
				: (this.errors.contrato = false);

			//validar form
			if (
				!this.errors.tipo_solicitud &&
				!this.errors.categoria_atencion &&
				!this.errors.proyecto &&
				!this.errors.correo &&
				!this.errors.celular &&
				!this.errors.asunto &&
				!this.errors.solicitud &&
				!this.errors.contrato
			) {
				return true;
			} else {
				return false;
			}
		},
		async sendForm() {
			this.loading = true;
			this.successMessage = '';
			this.errorMessage = '';
			this.errorActive = false;

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {
					typeAttention: JSON.stringify(this.tipo_solicitud),
					categoryAttention: JSON.stringify(this.categoria_atencion),
					projectId: this.proyecto,
					budgetId: this.contrato,
					email: this.correo,
					phone: this.celular,
					subject: this.asunto,
					detail: this.solicitud,
					file: this.imageDesktop, //this.file,
					fileName: this.fileName,
				},
			};

			if (this.validate()) {
				this.loading = false;

				await this.$store.dispatch('atencioncliente/createRequest', obj).then((response) => {
					if (response.success) {
						this.errorActive = false;
						this.errorMessage = '';

						this.save({
							type: EVENTS.atencionCliente.crearSolicitud,
							payload: {
								tipo: this.tipo_solicitud?.name,
								categoria: this.categoria_atencion?.name,
								proyecto: this.projects?.find((p) => p.id === this.proyecto)?.name,
							},
						});

						setTimeout(() => {
							this.$bvModal.hide('modal_sac');
						}, 100);

						this.updateTicketsList();
						this.cleanForm();
					} else {
						this.errorActive = true;
						this.errorMessage = response.message;
					}
				});
			}
		},
		cleanForm() {
			(this.tipo_solicitud = ''),
				(this.categoria_atencion = ''),
				(this.proyecto = ''),
				(this.correo = ''),
				(this.celular = ''),
				(this.asunto = ''),
				(this.solicitud = ''),
				(this.contrato = ''),
				(this.image = '');
			this.imageDesktop = null;
			this.fileName = '';
			this.$refs.file.value = null;
		},
		...mapActions({
			save: 'metrics/save',
		}),

		toRate(question, rateNumber) {
			if (!question || !rateNumber) {
				return;
			}

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;
			const obj = {
				token,
				questionId: question._id,
				payload: {
					rating: question.rating == rateNumber ? 0 : rateNumber,
				},
			};
			this.$store.dispatch('faq/rateQuestionAnswer', obj).then((data) => {
				if (data.success) {
					const payload = {
						question: data.frequentQuestion,
					};
					this.$store.commit('atencioncliente/modifyQuestionRate', payload);
				}
			});
		},
		toFilter() {
			let filterForm = {};
			if (this.filter.form.category?.questionCategory) {
				const subcategory = this.filter.form.category;
				filterForm.subcategory = subcategory._id;
				filterForm.category = subcategory.questionCategory;
			} else {
				filterForm.category = this.filter.form.category._id;
			}
			if (this.filter.form.title) {
				filterForm.title = this.filter.form.title;
			}
			if (this.filter.exceptions.categories.includes(filterForm.category)) {
				filterForm.category = null;
			}
			filterForm.category =
				this.filter.options.categories?.find((cat) => cat.name == 'Atención al cliente')?._id ||
				filterForm.category;
			this.loadingQuestions = true;

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;
			const obj = {
				token: token,
				payload: {
					token: token,
					page: this.page,
				},
				params: filterForm,
			};
			this.page = 1;
			this.$store.commit('atencioncliente/cleanMoreQuestions');
			this.$store.dispatch('atencioncliente/fetchQuestions', obj).then(() => {
				this.loadingQuestions = false;
			});
		},
		// async test() {
		// 	console.log("SI LEYOOOOO");
		// 	const session = JSON.parse(Cookies.get("session"));
		// 	const token = session.token;

		// 	const obj = {
		// 		token: token,
		// 		payload: {
		// 			sperantClientId: this.userAccount.profile.sperantClientId
		// 		}
		// 	}

		// 	await this.$store.dispatch("atencioncliente/getTEST", obj).then((response) => {
		// 		console.log("AQUI LA RESPUESTA");
		// 		console.log(response);
		// 	});
		// }
	},
};
</script>

<style>
input[type='file'] {
	display: none;
}

.custom-file-upload {
	display: inline-block;
	cursor: pointer;
	text-decoration: underline;
	color: green;
}

.step {
	display: inline-block;
	margin-right: 2px;
	background-color: #e0e0e0;
	color: transparent;
	height: 5px;
}

.step.active {
	background-color: #4caf50;
	color: transparent;
	height: 5px;
}
</style>
