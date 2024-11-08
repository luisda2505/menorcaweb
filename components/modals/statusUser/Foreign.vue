<template>
	<div>
		<h6 class="mt-1">Vigencia de Poder</h6>
		<p>
			Certificado de vigencia de poder con una antiguedad no menor a 03 meses
			<a href="/preguntas-frecuentes">Más información</a>
		</p>
		<div class="row">
			<div class="col upload-file">
				<img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
				<p>Sube tu vigenica de poder</p>
			</div>
		</div>
		<h6 class="mt-4">Documento de identidad del apoderado</h6>
		<div class="row">
			<div class="col-5 upload-file" @click="openFileWindow(1)" v-b-tooltip.hover.bottom="'En formato JPG, tamaño máximo 2 MB'">
				<img src="~/assets/img/modals/dnianverso.png" class="w-25 mt-2" alt="" id="previewImg9"/>
				<p>Subir imagen delantera de DNI</p>
				<input
					id="inputImg9"
					type="file"
					class="form-control"
					ref="dniFront"
					accept="image/png, image/gif, image/jpeg"
					@change="forpreviewImage($event, 'Img9')"/>
			</div>
			<div class="col-5 upload-file mx-2" @click="openFileWindow(2)" v-b-tooltip.hover.bottom="'En formato JPG, tamaño máximo 2 MB'">
				<img src="~/assets/img/modals/dnireverso.png" class="w-25 mt-2" alt="" id="previewImg10"/>
				<p>Subir imagen reversa de DNI</p>
				<input
					id="inputImg10"
					type="file"
					class="form-control"
					ref="dniBack"
					accept="image/png, image/gif, image/jpeg"
					@change="forpreviewImage($event, 'Img10')"/>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				defaultMetaSrc: {
					Img9: '_nuxt/assets/img/modals/dnianverso.png',
					Img10: '_nuxt/assets/img/modals/dnireverso.png',
				}
			};
		},
		methods: {
			forpreviewImage(event, nom){
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
