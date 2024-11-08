<template>
	<div class="modal-form">
		<div class="d-flex justify-content-between">
			<h5 class="modal-title">Nueva solicitud de Trámite</h5>
			<div class="back-box d-flex align-items-center">
				<fa :icon="['fas', 'chevron-left']" />
				<span class="mb-0 cursor-pointer" @click="back" role="button">atrás</span>
			</div>
		</div>

		<template>
			<p class="font-fs">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
			</p>

			<div class="row">
				<div class="col-6">
					<div class="mb-2">
						<DinamicSelect :label="'Categoría de Atención'" v-bind:options="options" :type="'category'" @toSelectOption="toSelectOption"/>
						<span v-if="errors.categoryAttention === true" class="error"> {{ errorForm.categoryAttention }} </span>
					</div>
				</div>
				<div class="col-6">
				</div>
				<div class="col-6">
					<div class="mb-2">
						<DinamicSelect :label="'Nombre del Proyecto'" v-bind:options="optionsProject" :type="'project'" @toSelectOption="toSelectOption"/>
						<span v-if="errors.projectName === true" class="error"> {{ errorForm.projectName }} </span>
					</div>
				</div>
				<div class="col-6">
					<div class="mb-2">
						<DinamicSelect :label="'Número de Contrato / Ubicación'" v-bind:options="optionsContract" :type="'budget'" @toSelectOption="toSelectOption"/>
						<span v-if="errors.contractNumber === true" class="error"> {{ errorForm.contractNumber }} </span>
					</div>
				</div>
				<div class="col-6">
					<div class="mb-2 ">
						<input type="text" name="email" id="email" class="selected-option f-sm"  v-model="newRequestDocument.email" />
						<span v-if="errors.email === true" class="error"> {{ errorForm.email }} </span>
						<label for="email" placeholder="Correo Electrónico"></label>
					</div>
				</div>
				<div class="col-6">
					<div class="mb-2">
						<input type="text" name="cellphone" id="cellphone" class="f-sm" v-model="newRequestDocument.cellphone" />
						<span v-if="errors.cellphone === true" class="error"> {{ errorForm.cellphone }} </span>
						<label for="cellphone" placeholder="Celular"></label>
					</div>
				</div>
			</div>

			<button type="button" class="btn btn-green float-left mt-2" id="validate-step2" @click="handleNextButton">Validación</button>
		</template>

		<b-modal id="modalLoader2" ref="modalLoader2" size="xsmall" title="" :no-close-on-backdrop="true" centered hide-footer hide-header>
			<div class="text-center">
				<b-spinner variant="success" style="width: 6rem; height: 6rem;"></b-spinner>
			</div>
		</b-modal>
	</div>
</template>
<script>
import Cookies from 'js-cookie';
import Loader from './Loader.vue';
import DinamicSelect from '../atencion-al-cliente/DinamicSelect.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
	components: { Loader, DinamicSelect },
	computed: {
		...mapGetters({
			user: "account/getUserAccount",
			projects: "atencioncliente/getProjects",
			budgets: 'atencioncliente/getBudgets',
		})
	},
	props:["categoriesOptions"],
	watch: {
		categoriesOptions(newVal, oldVal) {},
	},
	data() {
		return {
			newRequestDocument: {
				categoryAttention: '',
				nameProject: '',
				email: '',
				contractNumber: '',
				cellphone: '',
			},
			options: [],
			optionsProject: [],
			optionsContract: [],

			errors: {
				categoryAttention: false,
				email: false,
				cellphone: false,
				contractNumber: false,
				projectName: false,
			},

			errorForm: {
				categoryAttention: 'Seleccione una categoría',
				email: 'Ingrese un correo electronico',
				cellphone: 'Ingrese un número de teléfono',
				contractNumber: 'Seleccione un contrato',
				projectName: 'Seleccione un proyecto',
			},
		};
	},
	methods: {
		validateInputs(){
			let  haveError = false;
			if (!this.newRequestDocument.categoryAttention || this.newRequestDocument.categoryAttention == '') {
				this.errors.categoryAttention = true;
				haveError = true;
			}
			if (!this.newRequestDocument.nameProject || this.newRequestDocument.nameProject == '') {
				this.errors.projectName = true;
				haveError = true;
			}
			if (!this.newRequestDocument.email || this.newRequestDocument.email == '') {
				this.errors.email = true;
				haveError = true;
			}
			if (!this.newRequestDocument.cellphone || this.newRequestDocument.cellphone == '') {
				this.errors.cellphone = true;
				haveError = true;
			}
			if (!this.newRequestDocument.contractNumber || this.newRequestDocument.contractNumber == '') {
				this.errors.contractNumber = true;
				haveError = true;
			}

			return haveError;
		},
		closeFullLoader(){
			setTimeout(() => {this.$refs.modalLoader2.hide(); }, 20);
		},
		async handleNextButton() {
			if(this.validateInputs()) return;
			this.$refs.modalLoader2.show();

			this.$store.commit('atencioncliente/setSelectedBudget', this.newRequestDocument.contractNumber);

			const categorySelected = this.newRequestDocument.categoryAttention.toLowerCase();

			this.$emit('setSelectedProject', this.newRequestDocument.nameProject);

			switch (categorySelected) {
				case "av panel publicitario":
					await this.getTitulares();
					break;
				case "s trámite de minuta":
					const errorMessageShow = [];
					let showError = false;

					// VALIDATIONS COMMENT ONLY FOR TEST
					// if(!(await this.validateBudgetIsPayed())) {
					// 	errorMessageShow.push("Quedan pagos por cancelar");
					// 	showError = true;
					// }
					// const unitStatus = await this.getBudgetUnitStatus();
					// if(unitStatus != 'entregado' || unitStatus != 'proceso de entrega') {
					// 	errorMessageShow.push("Proyecto aún no entregado");
					// 	showError = true;
					// }

					if (showError){
						this.closeFullLoader();
						this.$emit('nextModal', {indexmodal: 3, errorMessageList: errorMessageShow});
						return;
					}

					await this.getTitulares(true);
					break;
				case "q personal de servicio al cliente":

					if(!(await this.validateBudgetIsPayed())) {
						this.closeFullLoader();
						this.$emit('nextModal', {indexmodal: 3, errorMessageList: ['Quedan pagos por cancelar']});
						return;
					}

					this.closeFullLoader();
					this.$emit('createNewTicket', () => this.closeDialog);
					break;
				default:
					this.closeFullLoader();
					this.$emit('createNewTicket', () => this.closeDialog);
					break;
			}

		},
		toSelectOption(dataSelected, optionType){
			switch (optionType) {
				case "category":
					this.newRequestDocument.categoryAttention = dataSelected;
					break;
				case "project":
					this.newRequestDocument.nameProject = dataSelected;
					break;
				case "budget":
					this.newRequestDocument.contractNumber = dataSelected;
					break;
			}
		},
		nextModal() {
			this.$emit('nextModal', {indexmodal: 4});
		},
		back() {
			this.$emit('backModal', 0);
		},
		formatedCategoryOptions(){
			const categoryOption = [];
			if (this.categoriesOptions !== undefined) {
				this.categoriesOptions.data.forEach(category => {
					categoryOption.push({ value: 1, label: category.name });
				});
			}
			return categoryOption;
		},
		formatedProjectOptions(){
			const projectOptions = [];
			if (this.projects !== undefined) {
				this.projects.forEach(project => {
					projectOptions.push({ value: project.id, label: project.name });
				});
			}
			return projectOptions;
		},
		formatedBudgetOptions(){
			const budgetsOptions = [];
			if (this.budgets !== undefined) {
				this.budgets.forEach(budget => {
					budgetsOptions.push({ value: budget.id, label: budget.contract_num });
				});
			}
			return budgetsOptions;
		},
		async getTitulares(setCivilStatus = false) {
			try {
				this.titular = localStorage.getItem('titular');
				const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : null;
				const token = session ? session.token : null;

				const obj = {
					token: token,
					payload: {
						// budgetId: parseInt(this.newRequestDocument.contractNumber),
						// clientId: parseInt(this.user.profile.sperantClientId)
						budgetId: 116217,
						clientId: 21384
					},
				};

				await this.$store.dispatch('atencioncliente/getSperantBudgedTitular', obj).then((data) => {
					this.$store.commit('atencioncliente/setBudgedTitulars', data);
					if(setCivilStatus) this.$store.commit('atencioncliente/setUseCivilStatus', setCivilStatus);
				});
			} catch (error) {
			}

			this.closeFullLoader();
			this.$emit('nextModal', {indexmodal: 4});
		},
		async validateBudgetIsPayed() {
			const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : null;
			const token = session ? session.token : null;

			const obj = {
				token: token,
				payload: {
					// budgetId: this.newRequestDocument.contractNumber,
					budgetId: 116217,
				},
			};

			await this.$store.dispatch('atencioncliente/getBudgetData', obj).then((data) => {
				if (data.status) {
					if (data.data.salgo == 0) return true;
					return false;
				}
				return false;
			});
			return false;
		},
		async getBudgetUnitStatus() {
			const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : null;
			const token = session ? session.token : null;

			const obj = {
				token: token,
				payload: {
					// budgetId: this.newRequestDocument.contractNumber,
					budgetId: 116217,
				},
			};

			await this.$store.dispatch('atencioncliente/getBudgetUnit', obj).then((data) => {
				if (data.status) {
					this.$store.commit('atencioncliente/setBudgedUnit', data.data.id);
					return data.data.commercialStatus;
				}
			});

			return 'no hallado';
		}
	},
	async created(){
		if(Object.keys(this.user).length === 0){
			await this.$store.dispatch('account/getUserAccountCall', { token }).then((response) => {});
		}
		this.options = this.formatedCategoryOptions();
		this.optionsProject = this.formatedProjectOptions();
		this.optionsContract = this.formatedBudgetOptions();
		this.newRequestDocument.email = this.user.email;
		this.newRequestDocument.cellphone = this.user.profile.phone;
	}
};
</script>
<style scoped>
button {
	text-transform: capitalize;
}
</style>
