<template>
	<div class="modal-form">
		<div class="d-flex align-items-center justify-content-between">
			<h5 class="modal-title">Solicitud de Minuta</h5>
			<div class="back-box d-flex align-items-center" v-if="statusClient >= 3">
				<fa :icon="['fas', 'chevron-left']" />
				<span class="mb-0 cursor-pointer" @click="back" role="button">atrás</span>
			</div>
		</div>

		<div class="d-flex justify-content-between" v-if="statusClient < 3">
			<p>Documentos Requeridos</p>
			<div class="back-box d-flex align-items-center">
				<fa :icon="['fas', 'chevron-left']" />
				<span class="mb-0 cursor-pointer" @click="back" role="button">atrás</span>
			</div>
		</div>

		<div class="row align-items-center w-100" v-if="statusClient < 3">
			<div class="col-4">
				<ButtonWizard
					:img="require('~/assets/img/modals/dni.png')"
					:title="'DNI'"
					:value="1"
					:docType="documentType"
					@handleOptionSelected="handleOptionSelected"></ButtonWizard>
			</div>
			<div class="col-4">
				<ButtonWizard
					:img="require('~/assets/img/modals/carnet.png')"
					:title="'Carnet de Extranjero'"
					:value="2"
					:docType="documentType"
					@handleOptionSelected="handleOptionSelected"></ButtonWizard>
			</div>
			<div class="col-4">
				<ButtonWizard
					:img="require('~/assets/img/modals/permiso.png')"
					:title="'Permiso especial para firmar contratos (PEFC)'"
					:value="3"
					:docType="documentType"
					@handleOptionSelected="handleOptionSelected"></ButtonWizard>
			</div>
			<div class="required-files w-100 ml-4 pl-3">
				<template v-if="documentType == 1">
					<div class="row mt-5">
						<div class="col-5 upload-file" @click="openFileWindow('dniFront')" v-b-tooltip.hover.bottom="'En formato JPG, tamaño máximo 2 MB'">
							<img src="~/assets/img/modals/dnianverso.png" class="w-25 mt-2" alt="" id="previewImg1" />
							<p id="helpTextImg1">Subir imagen delantera de DNI</p>
							<input
								id="inputImg1"
								type="file"
								class="form-control"
								ref="dniFront"
								accept="image/png, image/gif, image/jpeg"
								@change="previewImage($event, 'Img1')"/>
						</div>
						<div class="col-5 upload-file mx-2" @click="openFileWindow('dniBack')" v-b-tooltip.hover.bottom="'En formato JPG, tamaño máximo 2 MB'">
							<img src="~/assets/img/modals/dnireverso.png" class="w-25 mt-2" alt="" id="previewImg2" />
							<p id="helpTextImg2">Subir imagen reversa de DNI</p>
							<input
								id="inputImg2"
								type="file"
								class="form-control"
								ref="dniBack"
								accept="image/png, image/gif, image/jpeg"
								@change="previewImage($event, 'Img2')"/>
							<img id="previewImg2" src="#" alt="" class="w-50 mt-2" />
						</div>
					</div>
				</template>
				<template v-else-if="documentType == 2">
					<div class="row mt-5">
						<div class="col upload-file" @click="openFileWindow('card')" v-b-tooltip.hover.bottom="'En formato JPG, tamaño máximo 2 MB'">
							<img src="~/assets/img/modals/subir.png" class="w-25" alt="" id="previewImg3" />
							<p id="helpTextImg3">Sube tu carnet de extranjería</p>
							<input
								id="inputImg3"
								type="file"
								class="form-control"
								ref="card"
								accept="image/png, image/gif, image/jpeg"
								@change="previewImage($event, 'Img3')"/>
						</div>
					</div>
						<!-- <div class="row mt-5">
							<UploadImage :text="'Sube tu carnet de extranjería'"/>
						</div> -->
				</template>
				<template v-else-if="documentType == 3">
					<div class="row mt-5">
						<div class="col upload-file" @click="openFileWindow('permission')" v-b-tooltip.hover.bottom="'En formato JPG, tamaño máximo 2 MB'">
							<img src="~/assets/img/modals/subir.png" class="w-25" alt="" id="previewImg4" />
							<p id="helpTextImg4">Permiso especial para firmar contratos (PEFC)</p>
							<input
								id="inputImg4"
								type="file"
								class="form-control"
								ref="permission"
								accept="image/png, image/gif, image/jpeg"
								@change="previewImage($event, 'Img4')"/>
						</div>
					</div>
				</template>
			</div>
		</div>

		<b-modal id="modalMessage" ref="modalMessage" title="Mensaje" hide-footer>
            	<p>{{ modalMessage }}</p>
            	<button type="button" class="btn btn-green" @click="closeModalMessage">Entendido</button>
          	</b-modal>

		<component v-if="useCivil" :is="getUserStatus"></component>
		<Loader v-if="showLoader" @nextModal="nextModal" :title="'!Validado!'" :subtitle="''" />
		<hr />
		<button class="btn btn-warning capitalize" @click="saveFiles">Guardar</button>
		<!-- <button class="btn btn-green capitalize" id="send-attention" @click="loader" disabled>Enviar Solicitud</button> -->
	</div>
</template>
<script>
	import Cookies from 'js-cookie';
	import axios from 'axios';
	import ButtonWizard from './ButtonWizard.vue';
	import Loader from './Loader.vue';
	import Married from './statusUser/Married.vue';
	import Divorced from './statusUser/Divorced.vue';
	import Foreign from './statusUser/Foreign.vue';
	import Dead from './statusUser/Dead.vue';
	import Legal from './statusUser/Legal.vue';
	import { mapActions, mapGetters } from 'vuex';
	import UploadImage from "./statusUser/UploadImage.vue";

	export default {
		components: { ButtonWizard, Loader, Married, Divorced, Foreign, Dead, Legal,UploadImage },
		data() {
			return {
				documentType: null,
				showLoader: false,
				modalMessage: '',

				defaultMetaSrc: {
					Img1: '_nuxt/assets/img/modals/dnianverso.png',
					Img2: '_nuxt/assets/img/modals/dnireverso.png',
					Img3: '_nuxt/assets/img/modals/subir.png',
					Img4: '_nuxt/assets/img/modals/subir.png',
				}
			};
		},
		props: {
			statusClient: Number,
			selectedTitular: Number,
		},
		methods: {

			previewImage(event, nom){
				const inputObject = document.getElementById('input' + nom);
				const prevObject = document.getElementById('preview' + nom);
				const helpTextObject = document.getElementById('helpText' + nom);

				prevObject.src = eval("this.defaultMetaSrc." + nom);
				helpTextObject.style.display = '';
				prevObject.classList.remove("w-50");
				prevObject.classList.add("w-25");

				const [file] = inputObject.files
				if (file) {
					prevObject.src = URL.createObjectURL(file);
					helpTextObject.style.display = 'none';
					prevObject.classList.remove("w-25");
					prevObject.classList.add("w-50");
				}
			},

			cleanInputFiles(){
				const fileInputs = document.getElementsByClassName("upload-file");
				let inputsElements= fileInputs[0].children;
				for (let index = 0; index < inputsElements.length; index++) {
					if(inputsElements[index].tagName == 'IMG') {
						inputsElements[index].classList.remove("w-50");
						inputsElements[index].classList.add("w-25");
					}
					if(inputsElements[index].tagName == 'P') inputsElements[index].style.display = '';
					if(inputsElements[index].tagName == 'INPUT') inputsElements[index].value = '';
				}
			},

			closeModalMessage() {
				this.$refs.modalMessage.hide();
			},

			showModalMessage(message) {
				this.modalMessage = message;
				this.$refs.modalMessage.show();
			},

			handleOptionSelected(value) {
				this.cleanInputFiles();
				this.documentType = value;
			},
			openFileWindow(val) {
				this.$refs[val].click();
			},
			back() {
				this.$emit('backModal', 4);
			},
			loader() {
				this.$emit('nextModal', {indexmodal: 5});
				this.showLoader = true;
			},
			nextModal() {
				this.showLoader = false;
				this.$emit('nextModal', {indexmodal: 6});
			},
			async imgFilesUploader(inputIdName, budgetId, fileType) {
				let errorDocs = 0;

				const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : null;
				const token = session ? session.token : null;

				const formData1 = new FormData();
				formData1.append('file', document.getElementById(inputIdName).files[0]);

				const metadata1 = await axios.post(`${process.env.API_URL}/categoria_atencion/upload_document_file`, formData1, { headers: {'Content-Type': 'multipart/form-data' } })
					.then( ({ data }) => {
						return data;
					}).catch(e => {});

				let obj = {
					token: token,
					payload: {
						budgetId: budgetId,
						filename: metadata1.filename,
						type: fileType,
						selectedTitular: this.selectedTitular
					}
				};

				await this.$store.dispatch('atencioncliente/uploadDocuments', obj).then((data) => {
					if (!data.isvalidate) errorDocs++;
				});

				return errorDocs;
			},
			async saveFiles() {

				let errorDocs = 0;

				const img1 = document.getElementById('inputImg1');
				const img2 = document.getElementById('inputImg2');
				const img3 = document.getElementById('inputImg3');
				const img4 = document.getElementById('inputImg4');
				// Marriage
				const img5 = document.getElementById('inputImg5');
				const img6 = document.getElementById('inputImg6');
				const img7 = document.getElementById('inputImg7');
				const img8 = document.getElementById('inputImg8');
				// Foreign
				const img9 = document.getElementById('inputImg9');
				const img10 = document.getElementById('inputImg10');

				if (img1 != null && img1.files.length != 0) {
					errorDocs =+ await this.imgFilesUploader('inputImg1', 450116, 'anverso');
				}

				if (img2 != null && img2.files.length != 0) {
					errorDocs =+ await this.imgFilesUploader('inputImg2', 450116, 'reverso');
				}

				if (img3 != null && img3.files.length != 0) {
					errorDocs =+ await this.imgFilesUploader('inputImg3', 450116, 'pefc');
				}

				if (img4 != null && img4.files.length != 0) {
					errorDocs =+ await this.imgFilesUploader('inputImg4', 450116, 'extranjeria');
				}

				if (img5 != null && img5.files.length != 0) {
					errorDocs =+ await this.imgFilesUploader('inputImg5', 450116, 'documentMarried');
				}

				if (img6 != null && img6.files.length != 0) {
					errorDocs =+ await this.imgFilesUploader('inputImg6', 450116, 'separation');
				}

				if (img7 != null && img7.files.length != 0) {
					errorDocs =+ await this.imgFilesUploader('inputImg7', 450116, 'dniFront');
				}

				if (img8 != null && img8.files.length != 0) {
					errorDocs =+ await this.imgFilesUploader('inputImg8', 450116, 'dniBack');
				}

				if (img9 != null && img9.files.length != 0) {
					errorDocs =+ await this.imgFilesUploader('inputImg9', 450116, 'ForeigndniFront');
				}

				if (img10 != null && img10.files.length != 0) {
					errorDocs =+ await this.imgFilesUploader('inputImg10', 450116, 'ForeigndniBack');
				}

				if (errorDocs > 0) {
					this.showModalMessage("Archivos incorrectos o borrosos");
					return;
				}

				this.showModalMessage("Documentos válidados puede proceder");
				setTimeout(this.closeModalMessage(), 1000)
				this.$emit('nextModal', {indexmodal: 4, savedTitular: this.selectedTitular});
			}
		},
		computed: {
			...mapGetters({
				useCivil: "atencioncliente/getUseCivilStatus"
			}),
			getUserStatus() {
				switch (this.statusClient) {
					case 0:
						return '';
					case 1:
						return 'Married';
					case 2:
						return 'Divorced';
					case 3:
						return 'Foreign';
					case 4:
						return 'Dead';
					case 5:
						return 'Legal';
					default:
						return '';
				}
			},
		},
		created() {
			this.statusClient == 0 ? (this.documentType = 1) : (this.documentType = null);
		},
	};
</script>
<style scoped>
	.capitalize {
		text-transform: capitalize;
	}

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
