<template>
	<div>
		<h6 class="mt-4">Documento de identidad de representante legal</h6>
		<div class="row">
			<div class="col-5 upload-file" @click="openFileWindow(1)" v-b-tooltip.hover.bottom="'En formato JPG, tamaño máximo 2 MB'">
				<img src="~/assets/img/modals/dnianverso.png" class="w-25 mt-2" alt="" />
				<p>Subir imagen delantera de DNI</p>
				<input type="file" class="form-control" ref="dniFront" accept="image/png, image/gif, image/jpeg" />
			</div>
			<div class="col-5 upload-file mx-2" @click="openFileWindow(2)" v-b-tooltip.hover.bottom="'En formato JPG, tamaño máximo 2 MB'">
				<img src="~/assets/img/modals/dnireverso.png" class="w-25 mt-2" alt="" />
				<p>Subir imagen reversa de DNI</p>
				<input type="file" class="form-control" ref="dniBack" accept="image/png, image/gif, image/jpeg" />
			</div>
		</div>
		<h6 class="mt-4">Vigencia de Poder</h6>
		<p>
			Certificado de vigencia de poder del representante legal con una vigencia no mayor a 03 meses emitido por
			registros públicos (SUNARP).
			<a href="/preguntas-frecuentes">Más información</a>
		</p>
		<div class="row">
			<div class="col upload-file">
				<img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
				<p>Sube tu vigenica de poder</p>
			</div>
		</div>
	</div>
</template>
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
