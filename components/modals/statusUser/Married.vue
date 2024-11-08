<template>
	<div class="col-10">
		<h6 class="mt-5">Acta de Matrimonio</h6>
		<p>
			Copia de acta de matrimonio debidamente certificado por RENIEC. No mayor a 3 meses
			<a href="/preguntas-frecuentes">Más información</a>
		</p>
		<div class="row">
			<div class="col upload-file" @click="openFileWindow('documentMarried')">
				<img src="~/assets/img/modals/subir.png" class="w-25" alt=""  id="previewImg5" />
				<p>Sube tu acta de matrimonio</p>
				<input
					id="inputImg5"
					type="file"
					class="form-control"
					ref="documentMarried"
					accept="image/png, image/gif, image/jpeg"
					@change="marpreviewImage($event, 'Img5')"/>
			</div>
		</div>
		<h6 class="mt-5">Régimen patrimonial de separación de patrimonio (Opcional)</h6>
		<p>
			Copia literal de la partida donde se encuentra inscrita con una vigencia no mayor a 3 meses emitido por
			SUNARP
			<a href="/preguntas-frecuentes">Más información</a>
		</p>
		<div class="row">
			<div class="col upload-file" @click="openFileWindow('separation')">
				<img src="~/assets/img/modals/subir.png" class="w-25" alt=""  id="previewImg6" />
				<p>Sube tu régimen patrimonial de separación de patrimonio</p>
				<input
					id="inputImg6"
					type="file"
					class="form-control"
					ref="separation"
					accept="image/png, image/gif, image/jpeg"
					@change="marpreviewImage($event, 'Img6')"/>
			</div>
		</div>
		<h6 class="mt-5">Documento de identificación de cónyuge</h6>
		<div class="row">
			<div class="col-5 upload-file" @click="openFileWindow('dniFront')" v-b-tooltip.hover.bottom="'En formato JPG, tamaño máximo 2 MB'">
				<img src="~/assets/img/modals/dnianverso.png" class="w-25 mt-2" alt=""  id="previewImg7" />
				<p>Subir imagen delantera de DNI</p>
				<input
					id="inputImg7"
					type="file"
					class="form-control"
					ref="dniFront"
					accept="image/png, image/gif, image/jpeg"
					@change="marpreviewImage($event, 'Img7')"/>
			</div>
			<div class="col-5 upload-file mx-2" @click="openFileWindow('dniBack')" v-b-tooltip.hover.bottom="'En formato JPG, tamaño máximo 2 MB'">
				<img src="~/assets/img/modals/dnireverso.png" class="w-25 mt-2" alt=""  id="previewImg8" />
				<p>Subir imagen reversa de DNI</p>
				<input
					id="inputImg8"
					type="file"
					class="form-control"
					ref="dniBack"
					accept="image/png, image/gif, image/jpeg"
					@change="marpreviewImage($event, 'Img8')"/>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				defaultMetaSrc: {
					Img5: '_nuxt/assets/img/modals/subir.png',
					Img6: '_nuxt/assets/img/modals/subir.png',
					Img7: '_nuxt/assets/img/modals/dnianverso.png',
					Img8: '_nuxt/assets/img/modals/dnireverso.png',
				}
			};
		},
		methods: {
			openFileWindow(refSelected) {
				this.$refs[refSelected].click();
			},
			marpreviewImage(event, nom){
				const inputObject = document.getElementById('input' + nom);
				const prevObject = document.getElementById('preview' + nom);

				prevObject.src = eval("this.defaultMetaSrc." + nom);
				prevObject.classList.remove("w-50");
				prevObject.classList.add("w-25");

				const [file] = inputObject.files
				if (file) {
					prevObject.src = URL.createObjectURL(file);
					prevObject.classList.remove("w-25");
					prevObject.classList.add("w-50");
				}
			},
		},
	};
</script>
<style scoped>
	.heir-dni {
		border: 1px solid green;
		border-radius: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 10px;
	}

	.heir-dni img {
		width: 100px;
	}

	input[type='radio'] {
		width: 20px;
		height: 20px;
		margin: 5px 3px 0px 0px;
		accent-color: green;
	}
</style>
