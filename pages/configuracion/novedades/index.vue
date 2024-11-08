<template>
  <div id="AdmNovedades">
    <div class="container">
      <div class="h-100 page-content">
        <div class="box">
          <h3 class="section-title m-0">Administración de Novedades</h3>

					<div class="row mt-4">
            <!-- Comment Search in Db -->
						<!-- <div class="filters">
							<div class="filter-field">
								<div>
									<input v-model="filterText" id="filterTxt" class="input-fix"
									 type="text"  />
									<label for="buscar_text" placeholder="Buscar"></label>
								</div>
							</div>
							<div class="filter-button-space">
								<button class="btn btn-green" @click="loadNovedades(filterText)">Buscar</button>
							</div>
						</div> -->
					</div>

          <div class="d-flex justify-content-end">
            <button class="btn btn-green" @click="showAddModal">Agregar</button>
          </div>

          <div class="d-flex justify-content-end d-search">
            <input type="text" v-model="searchQuery" placeholder="Buscar por título..." class="form-control mb-2 f-sm s-b" />
            <i class="fi fi-rs-search"></i>
					</div>

          <Card :loading="loadingNovedades">
            <div class="row mt-4">
              <div v-if="filteredNews.length > 0" class="col-12">
                <div class="row">
                  <div class="col-md-4" v-for="(novedad, index) in filteredNews" :key="novedad.id">
                    <div class="card sm-card mb-3">
                      <img :src="novedad.image" alt="Novedad" class="card-img-top img-thumbnail" />
                      <div class="card-body">
                        <h5 class="card-title">{{ novedad.title }}</h5>
                        <p class="card-text">{{ novedad.subTitle }}</p>
                        <p :class="novedad.disponible ? 'habilitado' : 'deshabilitado'">
                          Estado: {{ novedad.disponible ? 'Habilitado' : 'Deshabilitado' }}
                        </p>
                        <div class="d-flex align-items-center justify-content-between">
                          <button class="btn btn-secondary d-flex btn-card" @click="showEditNovedadModal(novedad)">
                            <i class="fi fi-rs-edit mr-2"></i> Editar
                          </button>
                          <button class="btn btn-danger d-flex btn-card" @click="deleteNovedad(novedad.id)">
                            <i class="fi fi-rs-trash mr-2"></i> Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="col-12">
                <p>No hay novedades registradas.</p>
              </div>
            </div>

            <!-- <div class="text-center mt-3" id="moreNews">
              <div @click="listCategories()" style="cursor: pointer">
                <span class="see-more">VER MÁS</span>
              </div>
            </div> -->
          </Card>

          <b-modal id="addNovedadModal" ref="addNovedadModal" title="Agregar Nueva Novedad" hide-footer>
            <div class="form-group">
              <label for="new-novedad-title" class="lbl-size">Título de la novedad</label>
              <input v-model="newNovedad.title" id="new-novedad-title" class="input-fix" type="text" required />
              <span v-if="errors.title === true" class="error"> {{ errorForm.title }} </span>

              <label for="new-novedad-subtitle" class="mt-2 lbl-size">Subtítulo</label>
              <input v-model="newNovedad.subTitle" id="new-novedad-subtitle" class="input-fix" type="text" required />
              <span v-if="errors.subTitle === true" class="error"> {{ errorForm.subTitle }} </span>

              <label for="new-novedad-description" class="mt-2 lbl-size">Descripción</label>
              <textarea v-model="newNovedad.content" id="new-novedad-description" class="input-fix" required></textarea>
              <span v-if="errors.content === true" class="error"> {{ errorForm.content }} </span>

              <label for="new-novedad-image" class="mt-2 lbl-size">Imagen</label>
              <input type="file" @change="onFileChange" id="new-novedad-image"  class="input-fix" required/>
              <span v-if="errors.image === true" class="error"> {{ errorForm.image }} </span>

              <div class="input-group mb-3 mt-3">
                <div class="input-group-text">
                  <input class="form-check-input mt-0" type="checkbox" v-model="newNovedad.disponible" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  :value="newNovedad.disponible ? 'Habilitado' : 'Deshabilitado'"
                  disabled
                  :style="{ color: newNovedad.disponible ? '#28a745' : 'black' }"
                />
              </div>

              <div class="d-flex justify-content-end">
                <button class="btn btn-secondary mt-2 mr-4" @click="closeAddModal">Cancelar</button>
                <button class="btn btn-green mt-2" @click="saveNovedad">Guardar</button>
              </div>
            </div>
          </b-modal>

          <b-modal id="editNovedadModal" ref="editNovedadModal" title="Editar Novedad" hide-footer>
            <div class="form-group">
              <label for="current-novedad-title" class="lbl-size">Título de la novedad</label>
              <input v-model="currentNovedad.title" id="current-novedad-title" class="input-fix" type="text" required />
              <span v-if="errors.title === true" class="error"> {{ errorForm.title }} </span>

              <label for="current-novedad-subtitle" class="mt-2 lbl-size">Subtítulo</label>
              <input v-model="currentNovedad.subTitle" id="current-novedad-subtitle" class="input-fix" type="text" required />
              <span v-if="errors.subTitle === true" class="error"> {{ errorForm.subTitle }} </span>

              <label for="current-novedad-description" class="mt-2 lbl-size">Descripción</label>
              <textarea v-model="currentNovedad.content" id="current-novedad-description" class="input-fix" required></textarea>
              <span v-if="errors.content === true" class="error"> {{ errorForm.content }} </span>

              <label for="current-novedad-image" class="mt-2 lbl-size">Imagen</label>
              <input type="file" @change="onFileChange" id="current-novedad-image"  class="input-fix" required/>
              <span v-if="errors.image === true" class="error"> {{ errorForm.image }} </span>

              <div class="input-group mb-3 mt-3">
                <div class="input-group-text">
                  <input class="form-check-input mt-0" type="checkbox" v-model="currentNovedad.disponible" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  :value="currentNovedad.disponible ? 'Habilitado' : 'Deshabilitado'"
                  disabled
                  :style="{ color: currentNovedad.disponible ? '#28a745' : 'black' }"
                />
              </div>

              <div class="d-flex justify-content-end">
                <button class="btn btn-secondary mt-2 mr-4" @click="closeEditModal">Cancelar</button>
                <button class="btn btn-green mt-2" @click="editNovedad">Guardar</button>
              </div>
            </div>
          </b-modal>

          <b-modal id="modalConfirmDelete" ref="modalConfirmDelete" hide-footer>
            <span class="d-flex justify-content-center"><i class="fi fi-rs-interrogation icon-alert"></i></span>
            <p class="text-center">¿Estás seguro de que deseas eliminar la novedad "{{ selectedNovedad ? selectedNovedad.title : '' }}"?</p>
            <div class="d-flex justify-content-center">
              <button class="btn btn-secondary" @click="closeConfirmDeleteModal">Cancelar</button>
              <button class="btn btn-danger ml-2" @click="confirmDelete">Eliminar</button>
            </div>
          </b-modal>

          <b-modal id="modalMessage" ref="modalMessage" title="Mensaje" hide-footer>
            <p>{{ modalMessage }}</p>
            <button type="button" class="btn btn-primary" @click="closeModal">Cerrar</button>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';
import Card from '@/components/common/Card';



export default {
  middleware: 'auth',
  transition: 'slide-left',
  layout: 'crm',
  data() {
    return {
			searchQuery: '',
      loadingNovedades: false,
      newNovedad: {
        id: null,
        title: '',
        subTitle: '',
        content: '',
        image: '',
        disponible: false,
      },
      currentNovedad: {},
      novedades: [],
      modalMessage: '',
      selectedFile: null,
      selectedNovedad: null,
      newsToDeleteIndex:null,
			filterText: '',

			errors: {
        title: false,
        subTitle: false,
        content: false,
        image: false,
			},

			errorForm: {
        title: 'Ingrese un titulo',
        subTitle: 'Ingrese un subtitulo',
        content: 'Ingrese el contenido de la noticia',
        image: 'Ingrese una imagen',
			},
    };
  },
  components: {
    Card,
  },
	computed: {
    filteredNews() {
			return this.novedades.filter(novedad =>
			novedad.title.toLowerCase().includes(this.searchQuery.toLowerCase())
			);
    }
  },
  methods: {
    showAddModal() {
      this.$refs.addNovedadModal.show();
    },
    closeAddModal() {
      this.$refs.addNovedadModal.hide();
      this.errors.title = false;
      this.errors.subTitle = false;
      this.errors.content = false;
      this.errors.image = false;
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newNovedad.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveNovedad() {

			let  haveError = false;
			if (!this.newNovedad.title || this.newNovedad.title == '') {
				this.errors.title = true;
				haveError = true;
			}
			if (!this.newNovedad.subTitle || this.newNovedad.subTitle == '') {
				this.errors.subTitle = true;
				haveError = true;
			}
			if (!this.newNovedad.content || this.newNovedad.content == '') {
				this.errors.content = true;
				haveError = true;
			}
      const newNovedadImage = document.getElementById('new-novedad-image');
			if (newNovedadImage == null) {
				this.errors.image = true;
				haveError = true;
			}

			if (haveError) return;

      this.saveNovedades();
    },

    closeEditModal() {
      this.$refs.editNovedadModal.hide();
      this.errors.title = false;
      this.errors.subTitle = false;
      this.errors.content = false;
      this.errors.image = false;
    },

		showEditNovedadModal(currentNovedad) {
			this.currentNovedad = currentNovedad;
			this.$refs.editNovedadModal.show();
		},

    editNovedad() {
			let inputs = {};

			inputs.newsId = this.currentNovedad.id;
			inputs.toUpdate = {
				title: this.currentNovedad.title,
				subTitle: this.currentNovedad.subTitle,
				content: this.currentNovedad.content,
        disponible: this.currentNovedad.disponible,
			};
      inputs.image = document.getElementById('current-novedad-image');

			this.updateNews(inputs);
			this.closeEditModal();
    },
    deleteNovedad(index) {
      this.newsToDeleteIndex = index;
      this.$refs.modalConfirmDelete.show();
    },
    closeConfirmDeleteModal() {
      this.$refs.modalConfirmDelete.hide();
      this.selectedNovedad = null;

      this.errors.title = false;
      this.errors.subTitle = false;
      this.errors.content = false;
      this.errors.image = false;
    },
    confirmDelete() {
			if (this.newsToDeleteIndex !== null) {
				this.deleteNews(this.newsToDeleteIndex);
			}
      this.closeConfirmDeleteModal();
    },

    showModalMessage(message) {
      this.modalMessage = message;
      this.$refs.modalMessage.show();
    },
    closeModal() {
      this.$refs.modalMessage.hide();
    },

    async saveNovedades() {
      const session = JSON.parse(Cookies.get('session'));
      const token = session.token;

      const obj = {
        token: token,
        payload: {}
      };

			const imgFile = document.getElementById('new-novedad-image');

				if (imgFile != null && imgFile.files.length != 0) {
					const formData1 = new FormData();
					formData1.append('file', document.getElementById('new-novedad-image').files[0]);

					const metadata1 = await axios.post(`${process.env.API_URL}/noticias/upload_image_file`, formData1, { headers: {'Content-Type': 'multipart/form-data' } })
						.then( ({ data }) => {
							return data;
						}).catch(e => {});

					obj.payload = {
            newNovedad: this.newNovedad,
						filename: metadata1.filename,
					};

					await this.$store.dispatch('news/saveNew', obj).then(async (data) => {
						this.showModalMessage("Creado correctamente");
            await this.loadNovedades();
            this.closeAddModal();
					});
				}else{
          alert("Ingrese una imagen");
        }
    },

    async loadNovedades(filter = '') {
      const session = JSON.parse(Cookies.get('session'));
      const token = session.token;

      const obj = {
        token: token,
        payload: {}
      };

      obj.payload.filter = filter;

      this.loadingNovedades = true;
			this.novedades = [];

      await this.$store.dispatch('news/fetchNews', obj).then((response) => {
        const novedadesList = [];

        response.posts.forEach((element) => {
          let novedad = {};

          novedad.id = element._id;
          novedad.title = element.title;
          novedad.subTitle = element.subTitle;
          novedad.content = element.content;
          novedad.image = element.image;
          novedad.disponible = element.disponible;

          novedadesList.push(novedad);
        });

        this.novedades.push(...novedadesList);
        this.loadingNovedades = false;
      });
    },

    async deleteNews(id) {
      const session = JSON.parse(Cookies.get('session'));
      const token = session.token;

      const obj = {
        token: token,
        payload: {}
      };

			obj.payload.id = id;

			await this.$store.dispatch('news/deleteNews', obj).then(async (response) => {
				this.showModalMessage('Eliminado con éxito');
				await this.loadNovedades();
			});
		},

		async updateNews(inputs) {
      const session = JSON.parse(Cookies.get('session'));
      const token = session.token;

      const obj = {
        token: token,
        payload: {}
      };

			obj.payload.newsId = inputs.newsId;
			obj.payload.toUpdate = inputs.toUpdate;

      if (inputs.image != null) {
					const formData1 = new FormData();
					formData1.append('file', document.getElementById('current-novedad-image').files[0]);

					const metadata1 = await axios.post(`${process.env.API_URL}/noticias/upload_image_file`, formData1, { headers: {'Content-Type': 'multipart/form-data' } })
						.then( ({ data }) => {
							return data;
						}).catch(e => {});

          obj.payload.toUpdate.filename = metadata1.filename;
      }

			await this.$store.dispatch('news/updateNews', obj).then(async (response) => {
				this.showModalMessage('Actualizado con éxito');
				await this.loadNovedades();
			});
		}
  },
  async mounted() {
    this.loadNovedades();
  },
};
</script>

<style scoped>
.input-fix {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}
.card-img-top {
  width: 100%;
  height: 150px;
  object-fit: contain;
  border-bottom: 1px solid #ddd;
}
.card-body {
  padding: 15px;
}

.btn-card {
  flex: 1;
  margin-right: 5px;
}
.btn-card:last-child {
  margin-right: 0;
}
.habilitado {
  color: var(--primary-color);
  background: #b1edbfe4;
  padding: 1px 10px;
  font-weight: 500;
  font-size: 12px;
}

.deshabilitado {
  color: #686868;
  background: #CCCCCC;
  padding: 1px 10px;
  padding: 1px 10px;
  font-weight: 500;
  font-size: 12px;
  border-radius: 5px;
}
.input-group {
    position: relative !important;
    display: flex!important;
    flex-wrap: wrap!important;
    align-items: stretch!important;
    width: 100%!important;
}
.input-group-text {
  width: 2%!important;
}
.input-group>.form-control, .input-group>.form-select {
   width: 75% !important;
    margin-top: 0;
    border-radius: 0 !important;
    font-size: 16px;
}
input[type="checkbox"] {
    accent-color: #28a745;
    cursor: pointer;
    height: 20px;
    margin-bottom: 0;
  }
#new-novedad-image, #current-novedad-image {
  display: block !important;
  }
</style>
