<template>
	<div class="modal-form">
		<h5 class="modal-title">Solicitud de Minuta</h5>
		<h6>Documentos Requeridos</h6>
		<HorizontalCircles />
		<table class="w-75">
			<tbody>
				<tr>
					<th><small>Consulta y registro de solicitud</small></th>
					<th><fa :icon="['fas', 'check']" :style="{ color: 'green' }" /></th>
				</tr>
				<tr>
					<th><small>Validación de la documentación solicitada</small></th>
					<th></th>
				</tr>
				<tr>
					<th><small>Proceso de elaboración de minuta</small></th>
					<th></th>
				</tr>
				<tr>
					<th><small>Minuta se encuentra en Oficina central</small></th>
					<th></th>
				</tr>
			</tbody>
		</table>
		<hr />
		<button class="btn btn-green">Continuar</button>
		<button class="btn btn-secondary">Enviar mensaje</button>
	</div>
</template>
<script>
	import HorizontalCircles from './HorizontalCircles.vue';
	export default {
		components: { HorizontalCircles },
		data() {
			return {
				progress: 40,
				documentos: [
					{ name: 'Consulta y registro de solicitud', status: 'checked' },
					{ name: 'Validación de la documentación solicitada', status: 'unchecked' },
					{ name: 'Proceso de elaboración de minuta', status: 'unchecked' },
					{ name: 'Minuta se encuentra en Oficina central', status: 'unchecked' },
				],
			};
		},
	};
</script>
<style scoped>
	h6 {
		font-size: 20px;
		font-weight: 900 !important;
		color: gray;
	}

	th p {
		font-weight: normal !important;
		padding-bottom: 0px !important;
	}

	button {
		text-transform: capitalize;
	}
</style>
