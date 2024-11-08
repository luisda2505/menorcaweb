<template>
	<div class="container-success">
		<img src="~assets/img/modals/senal-aprobada.png" class="w-25" alt="Señal aproabada" />
		<h3>!Felicitaciones!</h3>
		<p class="font-fs">Ya puedes iniciar tu trámite de minuta</p>
		<div class="d-flex btn-box">
			<button class="btn btn-green float-left mt-2 mr-2" @click="handleNextButton">Iniciar</button>
		</div>
	</div>
</template>
<script>
	export default {
		methods: {
			handleNextButton() {
				// http://localhost:3030/atencion-al-cliente/detalle/87461
				window.location.reload();
			},
		},
	};
</script>
<style>
	.btn-box {
		margin-bottom: 30px;
	}

	.container-success {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	button {
		text-transform: capitalize;
	}
</style>
