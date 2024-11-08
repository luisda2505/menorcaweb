<template>
  <div id="AdmCategorias" class="admin-categorias">
    <div class="container">
      <div class="h-100 page-content">
        <div class="box">
          <h3 class="section-title m-0">Administración de Categorías de Atención</h3>
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
								<button class="btn btn-green" @click="listCategories(filterText)">Buscar</button>
							</div>
						</div> -->
					</div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-green" @click="syncApis">Sincronizar</button>
          </div>
          <div class="row mt-4">
						<div class="col-12">
              <Card :loading="loadingCategories">
                <div class="card sm-card">
                  <div class="d-flex justify-content-between">
										<h3 class="subtitle">Lista de Categorías</h3>
										<div class="d-flex justify-content-end d-search">
											<input type="text" v-model="searchQuery" placeholder="Buscar por nombre de categoría..." class="form-control mb-2  f-sm s-b" />
											<i class="fi fi-rs-search"></i>
										</div>
									</div>
                  <table class="table">
                    <thead>
                      <tr>
                        <th class="text-center">Estado</th>
                        <th>Nombre de Categoria</th>
                        <th>Tipo de Categoria</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="filteredCategories.length === 0">
                        <td colspan="3" class="text-center">No se encontró ningún registro</td>
                      </tr>
                      <tr v-for="(category, index) in filteredCategories" :key="category.id">
                        <td class="text-left">
                          <div class="form-check text-left">
                            <input type="checkbox" class="form-check-input" v-model="category.show"  v-on:click="updateVisibility(index)"/>
                          </div>
                        </td>
                        <td>{{ category.name }}</td>
                        <td>{{ category.type }}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="text-center mt-3" id="moreCategoriesBtn">
                    <div @click="listCategories()" style="cursor: pointer">
                      <span class="see-more">VER MÁS</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <b-modal id="modalMessage" ref="modalMessage" title="Mensaje" hide-footer>
            <p>{{ modalMessage }}</p>
            <button type="button" class="btn btn-green" @click="closeModalMessage">Entendido</button>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import Card from '@/components/common/Card';

const session = JSON.parse(Cookies.get('session'));
const token = session.token;

const obj = {
	token: token,
	payload: {}
};

export default {
  middleware: 'auth',
  transition: 'slide-left',
  layout: 'crm',
  data() {
    return {
      searchQuery: "",
      loadingCategories: false,
      categories: [],
      modalMessage: '',
      pageList: 1,
      limitList: 100,
			filterText: '',
    };
  },
	components: {
		Card
	},
  async mounted() {
    this.listCategories();
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {

		showModalMessage(message) {
			this.modalMessage = message;
			this.$refs.modalMessage.show();
		},

		closeModalMessage() {
			this.$refs.modalMessage.hide();
		},

    async syncApis(){

      obj.payload = {};

      await this.$store.dispatch('atencioncliente/syncCategoriesApis', obj).then((response) => {
        this.showModalMessage("Sincronización terminada");
        this.pageList = 1;
        this.listCategories();
      });
    },

    async listCategories(filter = ''){
      let moreBtn = document.getElementById("moreCategoriesBtn");
      obj.payload.limit = this.limitList;

			if (filter != '') {
        obj.payload.limit = 9999;
				this.pageList = 1;
			}

			if (this.pageList == 1) {
        this.loadingCategories = true;
				this.categories = [];
				moreBtn.style.display = "";
			}

			obj.payload.filter = filter;
      obj.payload.page = this.pageList;

      await this.$store.dispatch('atencioncliente/fetchAllCategories', obj).then((response) => {
        const categoriesList = [];

        response.data.forEach((element) => {
          let category = {};
          category.show = element.show;
          category.name = element.name;
          category.type = element.type;
          categoriesList.push(category);
        });

        this.categories.push(...categoriesList);
        if ((Object.keys(categoriesList).length < this.limitList) && moreBtn) moreBtn.style.display = "none";
				this.pageList ++;
				this.loadingCategories = false;
      });
    },

    async updateVisibility(index){
      obj.payload.show = !this.categories[index].show;
      obj.payload.name = this.categories[index].name;

      await this.$store.dispatch('atencioncliente/updateCategoryVisibility', obj).then(async (response) => {
				this.showModalMessage('Estado actualizado con éxito');
				this.pageList = 1;
				await this.listCategories();
      });
    },

  },
};
</script>

<style scoped>
input, select {
  padding: 0.5rem;
}
.table {
	width: 100%;
	border-collapse: collapse;
}
.table th, .table td {
	padding: 10px;
	text-align: left;
}
.form-group {
  margin-bottom: 1rem;
}
.text-right {
  text-align: right;
}
.ml-2 {
  margin-left: 0.5rem;
}
input[type="checkbox"] {
  accent-color: #28a745;
  cursor: pointer;
  height: 20px;
  margin-bottom: 0;
}

.see-more {
	color: #158a2f;
	font-weight: bold;
	position: relative;

	&:hover {
		color: #0e6321;
	}

	position: relative;
	width: 60px;
	margin: auto;
	position: relative;

		&.loading::after {
			content: '';
			margin: 0px auto;
			font-size: 2px;
			position: absolute;
			top: 0;
			right: -32px;
			text-indent: -9999em;
			border-top: 1.1em solid rgba(0, 146, 62, 0.2);
			border-right: 1.1em solid rgba(0, 146, 62, 0.2);
			border-bottom: 1.1em solid rgba(0, 146, 62, 0.2);
			border-left: 1.1em solid #00923e;
			transform: translateZ(0);
			-webkit-animation: load8 1.1s infinite linear;
			animation: load8 1.1s infinite linear;
			border-radius: 50%;
			width: 20px;
			height: 20px;
	}
}
</style>
