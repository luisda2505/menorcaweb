<template>
	<div>
		<h6 class="mt-1">Sucesión intestada o testamento</h6>
		<p>
			Copia literal de sucesión intestada o testamento inscrito en registros públicos (SUNARP).
			<a href="/preguntas-frecuentes">Más información</a>
		</p>
		<div class="row">
			<div class="col upload-file">
				<img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
				<p>Adjunta el archivo</p>
			</div>
		</div>
		<h6 class="mt-5">Documento de identidad de los apoderados</h6>
		<select name="nameProject" id="nameProject" class="w-50" v-model="heirNumber" @change="updateNumberHeirs">
			<option v-for="n in 5" :key="n">{{ n }}</option>
		</select>
		<label for="categoryAttention" placeholder="Cantidad de Herederos"></label>
		<div v-for="(heir, index) in heirs" :key="index">
			<Heir :index="index" />
		</div>
	</div>
</template>
<script>
	import Heir from './Heir.vue';

	export default {
		components: { Heir },
		data() {
			return {
				heirs: [],
				heir: {
					dni_front: {},
					dni_back: {},
				},
				heirNumber: 0,
			};
		},
		methods: {
			updateNumberHeirs() {
				this.heirs = [];

				for (let index = 0; index < this.heirNumber; index++) {
					this.heirs.push({ ...this.heir });
				}
			},
		},
	};
</script>
<style scoped></style>
