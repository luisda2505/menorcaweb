<template>
	<div class="modal-form">
		<div class="d-flex justify-content-between">
			<div class="">
				<h5 class="modal-title">Solicitud de Minuta</h5>
				<span class="text-normal mt-2">Seleccione el titular <i class="fi fi-rs-info" v-b-tooltip.hover.bottom="'Recuerde que por cada propietario, debe adjuntar la documentación completa'"></i></span>
			</div>
			<div class="back-box d-flex align-items-center">
				<fa :icon="['fas', 'chevron-left']" />
				<span class="mb-0 cursor-pointer" @click="back" role="button">atrás</span>
			</div>
		</div>

		<div class="row pr-5">
			<div v-for="customer in customers" :key="customer.id" class="col-3 px-2 mt-2">
				<ButtonUser :title="customer.name" :img="require('~/assets/img/user-male.png')" :value="customer.id" @handleOptionSelected="handleOptionSelect"/>
			</div>
		</div>
		<div v-if="useCivil">
			<span class="text-normal m-2">Seleccione su Estado</span>
			<div class="section-buttons w-100">
				<button class="btn btn-secondary m-2" :class="`${option.selected ? 'selected' : ''}`"
					v-for="option in optionsPicked" :key="option.id" @click="pickedButton(option)">
					{{ option.name }}
				</button>
			</div>
		</div>
		<hr />
		<button class="btn btn-green float-left mt-2" @click="handleNextButton" id="titular-selected-btn" disabled>Seleccionar</button>
		<button class="btn btn-green capitalize mt-2" @click="handleSaveButton" id="send-attention" style="display: none;">Enviar Solicitud</button>
	</div>
</template>

<script>
import ButtonUser from './ButtonUser.vue';
import ButtonWizard from './ButtonWizard.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
	components: { ButtonWizard, ButtonUser },
	computed: {
		...mapGetters({
			user: "account/getUserAccount",
			titulars: "atencioncliente/getBudgedTitulars",
			useCivil: "atencioncliente/getUseCivilStatus"
		}),
	},
	props:["selectedTitular", "savedTitulars"],
	data() {
		return {
			customers: [],
			userSelected: 0,
			optionsPicked: [
				{
					id: 0,
					name: 'Soltero',
					selected: false,
				},
				{
					id: 1,
					name: 'Casado',
					selected: false,
				},
				// {
				// 	id: 2,
				// 	name: 'Divorciado',
				// 	selected: false,
				// },
				{
					id: 3,
					name: 'Domiciliado en provincia o extranjero',
					selected: false,
				},
				// {
				// 	id: 4,
				// 	name: 'Copropietario fallecido',
				// 	selected: false,
				// },
				// {
				// 	id: 5,
				// 	name: 'Persona jurídica',
				// 	selected: false,
				// },
			],
			statusSelected: null,
		};
	},
	methods: {
		back() {
			this.$emit('backModal', 1);
		},
		activateNextBtn(){
			let activeBtn = false;

			if(this.useCivil && this.statusSelected != null && this.userSelected != 0) activeBtn = true;

			if(!this.useCivil && this.userSelected != 0) activeBtn = true;

			if(activeBtn) document.getElementById("titular-selected-btn").removeAttribute("disabled");
		},
		handleSaveButton(){
			this.$emit('createNewTicket', () => this.closeDialog);
		},
		handleNextButton() {
			this.$emit('nextModal', {indexmodal: 5, idTitular: this.userSelected});
		},
		handleOptionSelect(value) {
			this.userSelected = value;
			this.activateNextBtn();
		},
		pickedButton(option) {
			this.optionsPicked.forEach((option) => {
				option.selected = false;
			});
			option.selected = true;
			this.$emit('setStatusClient', option.id);
			this.statusSelected = option.id;
			this.activateNextBtn();
		},
		formatedTitulars(){
			const titularsList = [];

			if (this.titulars.data !== undefined) {
				let allSaved = 0;

				this.titulars.data.forEach(titular => {
					let titularIsSaved = false;

					if (this.savedTitulars.includes(titular.id)) {
						allSaved++;
						titularIsSaved = true;
					}

					titularsList.push({ id: titular.id, name: titular.firstName + " " + titular.lastName, doc: titular.document, saved: titularIsSaved });
				});

				if (titularsList.length == allSaved) document.getElementById("send-attention").style.display = '';
			}

			return titularsList;
		}
	},
	async mounted(){
		this.customers = this.formatedTitulars();
	}
};
</script>
<style scoped>
button {
	text-transform: capitalize;
}

.btn-secondary {
	border-radius: 5px !important;
	background-color: #d9d9d9;
	border-color: #d9d9d9;
	color: #333333 !important;
	text-transform: inherit;
	font-size: 12px;
}

.selected {
	background-color: #f4851f !important;
	border: 1px solid #f4851f;
	color: #fff !important;
}
</style>
