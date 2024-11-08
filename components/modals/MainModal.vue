<template>
	<div class="modal-form">
		<h5 class="modal-title">Nuevo Trámite</h5>
		<template>
			<p class="welcome">
				Por favor seleccione la el tipo de atención, categoría y proyecto sobre el cual desea realizar su
				atención:
			</p>
			<!-- Icon boxes -->
			<div class="request-options flex-row">
				<ButtonWizard @handleOptionSelected="handleOptionSelect"
					:img="require('~/assets/img/modals/consulta.png')" :title="'Consulta'" :value="3" :docType="type"
					v-b-tooltip.hover.bottom="'Para dudas sobre su propiedad'"/>
				<ButtonWizard @handleOptionSelected="handleOptionSelect"
					:img="require('~/assets/img/modals/solicitud_.png')" :title="'Solicitud'" :value="1"
					:docType="type"
					v-b-tooltip.hover.bottom="'Para requerimientos que necesite'"/>
				<ButtonWizard @handleOptionSelected="handleOptionSelect"
					:img="require('~/assets/img/modals/reclamo.png')" :title="'Reclamo / Queja'" :value="2"
					:docType="type"
					v-b-tooltip.hover.bottom="'Para conocer su necesidades'"/>

			</div>
			<hr />
			<!-- Next Button -->
			<button type="button" class="btn btn-green float-left mt-2" id="validate-step1" @click="handleNextButton" disabled>
				Siguiente <span> →</span>
			</button>
		</template>

		<b-modal id="modalLoader" ref="modalLoader" size="xsmall" title="" :no-close-on-backdrop="true" centered hide-footer hide-header>
			<div class="text-center">
				<b-spinner variant="success" style="width: 6rem; height: 6rem;"></b-spinner>
			</div>
          	</b-modal>
	</div>
</template>
<script>
import ButtonWizard from '../../components/modals/ButtonWizard.vue';

export default {
	components: { ButtonWizard },
	data() {
		return {
			selected: '',
			type: null,
			selectedOption: null,
			options: ['foo', 'bar', 'baz'],
		};
	},
	methods: {
		handleNextButton() {
			if (this.type != 0) this.$emit('selectCategoryType', this.selected);
		},
		handleOptionSelect(value) {
			this.selected = value;
			this.type = parseInt(value);
			document.getElementById("validate-step1").removeAttribute("disabled");
		}
	},
	created() {
		this.type = 0;
	}
};
</script>
<style scoped>
button {
	text-transform: capitalize;
}

.modal-title {
	margin-left: 8px !important;
}

.welcome {
	margin-left: 8px !important;
}
</style>
