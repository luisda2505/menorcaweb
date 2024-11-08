<template>
	<div id="AdmPreguntasFrecuentes">
		<div class="container">
			<div class="h-100 page-content">
				<div class="box">
					<h3 class="section-title m-0">Administración de Preguntas Frecuentes</h3>
					<!-- Comment Search in Db -->
					<!-- <div class="row mt-4">
						<div class="filters">
							<div class="filter-field">
								<div>
									<input v-model="filterText" id="filterTxt" class="input-fix"
									 type="text"  />
									<label for="buscar_text" placeholder="Buscar"></label>
								</div>
							</div>
							<div class="filter-button-space">
								<button class="btn btn-green" @click="listQuestions(filterText)">Buscar</button>
							</div>
						</div>
					</div> -->
					<div class="d-flex justify-content-end">
						<button class="btn btn-green" @click="showAddQuestionModal">Agregar</button>
					</div>
					<div class="row mt-4">
						<div class="col-12">
							<Card :loading="loadingQuestions">
								<div class="card sm-card">
									<div class="d-flex justify-content-between">
										<h3 class="subtitle">Preguntas frecuentes</h3>
										<div class="d-flex justify-content-end d-search">
											<input type="text" v-model="searchQuery" placeholder="Buscar por título..." class="form-control mb-2 f-sm s-b" />
											<i class="fi fi-rs-search"></i>
										</div>
									</div>
									<table class="table">
										<thead>
											<tr>
												<th>#</th>
												<th class="text-center">Estado</th>
												<th>Título</th>
												<th>Descripción</th>
												<th class="text-right">Acciones</th>
											</tr>
										</thead>
										<tbody>
											<template v-if="filteredQuestions.length > 0">
												<tr v-for="(question, index) in filteredQuestions" :key="question._id">
												<td>{{ index + 1 }}</td>
												<td class="text-left">
													<div class="form-check text-left">
														<input type="checkbox" class="form-check-input" v-model="question.enabled" disabled/>
													</div>
												</td>
												<td>{{ question.title }}</td>
												<td>{{ question.description }}</td>
												<td class="text-right">
													<span class="text-danger cursor-pointer size-icon" @click="confirmDeleteQuestion(question.id)"
													v-b-tooltip.hover.bottom="'Eliminar registro'"><i class="fi fi-rs-trash"></i></span>
													<span class="text-secondary cursor-pointer size-icon ml-2" @click="showEditQuestionModal(question)"
													v-b-tooltip.hover.bottom="'Editar registro'"><i class="fi fi-rs-edit"></i></span>
												</td>
											</tr>
											</template>
											<tr v-else>
												<td colspan="5" class="text-center">No se encontró ningún registro</td>
											</tr>
										</tbody>
									</table>

									<div class="text-center mt-3" id="moreQuestionBtn">
										<div @click="listQuestions()" style="cursor: pointer">
											<span class="see-more">VER MÁS</span>
										</div>
									</div>
								</div>
							</Card>
						</div>
					</div>

					<!-- Modal para agregar nueva pregunta -->
					<b-modal id="modalAddQuestion" ref="modalAddQuestion" title="Agregar Nueva Pregunta" hide-footer>
						<div class="modal-form">
							<div class="form-group form">
								<label for="new-question-title" class="lbl-size">Título de la pregunta</label>
								<input v-model="newQuestion.title" id="new-question-title" class="input-fix" v-bind:class="{ error: errors.title }" type="text" required />
								<span v-if="errors.title === true" class="error"> {{ errorForm.title }} </span>

								<label for="new-question-description" class="lbl-size mt-2">Descripción</label>
								<textarea v-model="newQuestion.description" id="new-question-description" class="input-fix" v-bind:class="{ error: errors.description }" required></textarea>
								<span v-if="errors.description === true" class="error"> {{ errorForm.description }} </span>

								<div class="input-group mb-3 mt-3">
									<div class="input-group-text">
										<input class="form-check-input mt-0" type="checkbox" v-model="newQuestion.enabled" aria-label="Checkbox for following text input" />
									</div>
									<input
										type="text"
										class="form-control"
										:value="newQuestion.enabled ? 'Habilitado' : 'Deshabilitado'"
										aria-label="Text input with checkbox"
										disabled
										:style="{ color: newQuestion.enabled ? '#28a745' : 'black' }"
									/>
								</div>

								<button class="btn btn-green mt-2" @click="addQuestion">Agregar</button>
							</div>
						</div>
					</b-modal>

					<b-modal id="modalEditQuestion" ref="modalEditQuestion" title="Editar Pregunta" hide-footer>
						<div class="form-group">
							<label for="edit-question-title">Título de la pregunta</label>
							<input v-model="currentQuestion.title" id="edit-question-title" class="input-fix" type="text" required />

							<label for="edit-question-description" class="mt-2">Descripción</label>
							<textarea v-model="currentQuestion.description" id="edit-question-description" class="input-fix" required></textarea>

							<div class="input-group mb-3 mt-3">
								<div class="input-group-text">
									<input class="form-check-input mt-0" type="checkbox" v-model="currentQuestion.enabled" aria-label="Checkbox for following text input" />
								</div>
								<input
									type="text"
									class="form-control"
									:value="currentQuestion.enabled ? 'Habilitado' : 'Deshabilitado'"
									aria-label="Text input with checkbox"
									disabled
									:style="{ color: currentQuestion.enabled ? '#28a745' : 'black' }"
								/>
							</div>

							<button class="btn btn-green mt-2" @click="saveEditedQuestion">Guardar Cambios</button>
						</div>
					</b-modal>

					<b-modal id="modalConfirmDelete" ref="modalConfirmDelete" hide-footer size="sm" centered>
						<span class="d-flex justify-content-center"><i class="fi fi-rs-interrogation icon-alert"></i></span>
						<p class="text-center">¿Estás seguro de que deseas eliminar este registro?</p>
						<div class="d-flex justify-content-center">
							<button class="btn btn-secondary" @click="closeConfirmDeleteModal">Cancelar</button>
							<button class="btn btn-danger ml-4" @click="confirmDelete">Eliminar</button>
						</div>
					</b-modal>

					<b-modal id="modalMessage" ref="modalMessage" title="Mensaje" hide-footer>
						<p>{{ modalMessage }}</p>
						<button type="button" class="btn btn-green" @click="closeModalMessage">Entendido</button>
					</b-modal>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Cookies from 'js-cookie';
import Menu from '@/components/common/Menu';
import Sidebar from '@/components/common/Sidebar';
import Accordion from '@/components/common/Accordion';
import ButtonIconText from '../../../components/common/ButtonIconText.vue';
import Card from '@/components/common/Card';

export default {
	middleware: 'auth',
	transition: 'slide-left',
	layout: 'crm',
	data() {
		return {
			searchQuery: '',
			questions: [],
			loadingQuestions: false,
			newQuestion: {
				title: '',
				description: '',
				enabled: false
			},
			currentQuestion: {},
			questions: [],
			questionToDeleteIndex: null,
			modalMessage: '',
			pageList: 1,
			limitList: 5,
			filterText: '',

			errors: {
				title: false,
				description: false,
			},

			errorForm: {
				title: 'Ingrese un título para la pregunta',
				description: 'Ingrese una descripción de la pregunta',
			},
		};
	},
	computed: {
        	filteredQuestions() {
			return this.questions.filter(question =>
			question.title.toLowerCase().includes(this.searchQuery.toLowerCase())
			);
        	}
    	},
	components: {
		Menu,
		Sidebar,
		Accordion,
		ButtonIconText,
		Card
	},
	async mounted() {
		this.listQuestions();
	},
	methods: {
		showAddQuestionModal() {
			this.newQuestion = { title: '', description: '', enabled: false };
			this.$refs.modalAddQuestion.show();
		},

		addQuestion() {
			let  haveError = false;
			if (!this.newQuestion.title || this.newQuestion.title == '') {
				this.errors.title = true;
				haveError = true;
			}

			if (!this.newQuestion.description || this.newQuestion.description == '') {
				this.errors.description = true;
				haveError = true;
			}

			if (haveError) return;

			this.saveQuestion();
			this.closeAddQuestionModal();
		},

		closeAddQuestionModal() {
			this.$refs.modalAddQuestion.hide();
		},

		showEditQuestionModal(currentQuestion) {
			this.currentQuestion = currentQuestion;
			this.$refs.modalEditQuestion.show();
		},

		showModalMessage(message) {
			this.modalMessage = message;
			this.$refs.modalMessage.show();
		},

		closeModalMessage() {
			this.$refs.modalMessage.hide();
		},

		saveEditedQuestion() {
			let inputs = {};
			inputs.questionId = this.currentQuestion.id;
			inputs.toUpdate = {
				question: this.currentQuestion.title,
				answer: this.currentQuestion.description,
				show: this.currentQuestion.enabled,
			};
			this.updateQuestions(inputs);
			this.$refs.modalEditQuestion.hide();
		},

		confirmDeleteQuestion(index) {
			this.questionToDeleteIndex = index;
			this.$refs.modalConfirmDelete.show();
		},

		confirmDelete() {
			if (this.questionToDeleteIndex !== null) {
				this.deleteQuestion(this.questionToDeleteIndex);
			}
			this.$refs.modalConfirmDelete.hide();
		},

		closeConfirmDeleteModal() {
			this.questionToDeleteIndex = null;
			this.$refs.modalConfirmDelete.hide();
		},

		async listQuestions(filter = ''){
			let moreBtn = document.getElementById("moreQuestionBtn");

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {}
			};

			obj.payload.limit = this.limitList;
			if (filter != '') {
				obj.payload.limit = 999;
				this.pageList = 1;
			}

			if (this.pageList == 1) {
				this.loadingQuestions = true;
				this.questions = [];
				moreBtn.style.display = "";
			}

			obj.payload.filter = filter;
			obj.payload.page = this.pageList;
			obj.payload.showAll = true;

			await this.$store.dispatch('faq/fetchQuestions', obj).then((response) => {
				const questionFormat = [];
				response.frequentQuestions.forEach((element) => {
					let quest = {};
					quest.id = element._id;
					quest.title = element.question;
					quest.description = element.answer;
					quest.enabled = element.show;
					questionFormat.push(quest);
				});
				this.questions.push(...questionFormat);
				if ((Object.keys(questionFormat).length < this.limitList) && moreBtn) moreBtn.style.display = "none";
				this.pageList ++;
				this.loadingQuestions = false;
			});
		},

		async saveQuestion() {
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {}
			};

			obj.payload.question = this.newQuestion.title;
			obj.payload.answer = this.newQuestion.description;
			obj.payload.show= this.newQuestion.enabled;

			await this.$store.dispatch('faq/createQuestion', obj).then(async (response) => {
				this.showModalMessage('Creado con éxito');
				this.pageList = 1;
				await this.listQuestions();
			});
		},

		async deleteQuestion(id) {
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {}
			};

			obj.payload.id = id;

			await this.$store.dispatch('faq/deleteQuestion', obj).then(async (response) => {
				this.showModalMessage('Eliminado con éxito');
				this.pageList = 1;
				await this.listQuestions();
			});
		},

		async updateQuestions(inputs) {
			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				payload: {}
			};

			obj.payload.questionId = inputs.questionId;
			obj.payload.toUpdate = inputs.toUpdate;

			await this.$store.dispatch('faq/updateQuestion', obj).then(async (response) => {
				this.showModalMessage('Actualizado con éxito');
				this.pageList = 1;
				await this.listQuestions();
			});
		}

	}
};
</script>

<style scoped>
.input-fix {
	width: 100%;
	padding: 10px;
	margin: 5px 0;
	border-radius: 5px;
	border: 1px solid #ccc;
}
.table {
	width: 100%;
	border-collapse: collapse;
}
.table th, .table td {
	padding: 10px;
	text-align: left;
}
.input-group {
    position: relative !important;
    display: flex!important;
    flex-wrap: wrap!important;
    align-items: stretch!important;
    width: 100%!important;
}
.input-group-text {
  width: 2%!important;
}
.input-group>.form-control, .input-group>.form-select {
   width: 75% !important;
    margin-top: 0;
    border-radius: 0 !important;
    font-size: 14px;
}
.modal-dialog-centered .modal-content {
	width: 250px !important;
	margin: auto;
}

.icon-alert {
	font-size: 50px;
	color: #dc3545;
	margin-bottom: 10px;
}
input[type="checkbox"] {
    accent-color: #28a745;
    cursor: pointer;
    height: 20px;
    margin-bottom: 0;
}
.text-left:has(> input:disabled)::after {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 3px;
    color: white;
    position: relative;
    margin: 3px 4px 0 5px;
    background: rgb(150, 148, 148);
    content: "\2716";
    text-align: center;
}
.text-left:has(> input:disabled:checked)::after {
    background: #28a745;
    content: "\2714";
}

.text-left input:disabled {
    display: none
}

.see-more {
	color: #158a2f;
	font-weight: bold;
	position: relative;

	&:hover {
		color: #0e6321;
	}

	position: relative;
	width: 60px;
	margin: auto;
	position: relative;

		&.loading::after {
			content: '';
			margin: 0px auto;
			font-size: 2px;
			position: absolute;
			top: 0;
			right: -32px;
			text-indent: -9999em;
			border-top: 1.1em solid rgba(0, 146, 62, 0.2);
			border-right: 1.1em solid rgba(0, 146, 62, 0.2);
			border-bottom: 1.1em solid rgba(0, 146, 62, 0.2);
			border-left: 1.1em solid #00923e;
			transform: translateZ(0);
			-webkit-animation: load8 1.1s infinite linear;
			animation: load8 1.1s infinite linear;
			border-radius: 50%;
			width: 20px;
			height: 20px;
	}
}
</style>
