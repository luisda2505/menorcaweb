<template>
  <!-- Sidebar -->

  <simplebar class="sidebar" data-simplebar-auto-hide="true" style="height: 82vh">
    <div class="container" v-if="!loading">
      <template
        v-if="
          $route.path == '/mi-perfil' || $route.path == '/mi-perfil/cambio-contrasena'
        "
      >
        <ul class="list">
          <li @click="goToInicio" :class="{ active: $route.path == '/inicio' }">
            <img src="~assets/img/icons/dashboard.png" alt="Icono Inicio"/> Inicio
          </li>
          <li @click="goToProfile" :class="{ active: $route.path == '/mi-perfil' }">
            <img src="~assets/img/icons/user.png" alt="Icono usuario"/> Mis datos personales
          </li>
          <li
            @click="goToChangePassword"
            :class="{
              active: $route.path == '/mi-perfil/cambio-contrasena',
            }"
          >
            <img src="~assets/img/icons/lock.png" alt="icono para contraseña"/> Cambiar contraseña
          </li>
        </ul>
      </template>
      <template v-else>
        <ul class="list">
          <li @click="goToInicio" :class="{ active: $route.path == '/inicio' }">
            <img src="~assets/img/icons/dashboard.png" alt="Icono Inicio"/> Inicio
          </li>
          <li @click="goToMisPagos" :class="{ active: $route.path == '/mis-pagos' }">
            <img src="~assets/img/icons/money.png" alt="icono mis pagos" /> Mis pagos
          </li>
          <li
            @click="goToMisPropiedades"
            :class="{ active: $route.path == '/mis-inmuebles' }"
          >
            <img src="~assets/img/icons/house.png" alt="icono mis inmuebles"/> Mis inmuebles
          </li>
          <li
            @click="goToMisReferidos"
            :class="{ active: $route.path == '/mis-referidos' }"
          >
            <img src="~assets/img/icons/people.png" alt="icono mis referidos"/> Mis referidos
          </li>
          <li
            @click="goToAtencionAlCliente"
            :class="{ active: $route.path == '/atencion-al-cliente' || $route.path.includes('/atencion-al-cliente/detalle') }"
          >
            <img src="~assets/img/icons/girl.png" alt="icono atencion al cliente"/> Atención al cliente
          </li>
          <li
            @click="goToMisConstrucciones"
            :class="{ active: $route.path == '/construcciones' || $route.path.includes('/construcciones/nueva-cotizacion') }"
          >
            <img src="~assets/img/icons/building.png" alt="icono construcciones"/> Construcciones
          </li>
          <li
            @click="goToPreguntasFrecuentes"
            :class="{ active: $route.path == '/preguntas-frecuentes' }"
          >
            <img src="~assets/img/icons/question.png" alt="icono preguntas frecuentes"/> Preguntas Frecuentes
          </li>

          <!-- Modificamos Configuración para que sea un ul con 3 opciones dentro -->
          <li>
            <div @click="toggleConfigMenu">
              <img src="~assets/img/icons/ajustes.png" alt="icono configuracion" /> 
              Configuración
              <i 
                :class="isConfigMenuOpen ? 'fi fi-bs-chevron-double-up' : 'fi fi-bs-chevron-double-down'" 
                class="expand-icon"
              ></i>
            </div>
            
            <ul class="sub-list" v-if="isConfigMenuOpen">
              <li @click="goToAdmPreguntasFrecuentes" :class="{ active: $route.path == '/configuracion/preguntas-frecuentes' }">
                Preguntas frecuentes
              </li>
              <li @click="goToAdmNovedades" :class="{ active: $route.path == '/configuracion/novedades' }">
                Novedades
              </li>
              <li @click="goToAdmGruposCategoria" :class="{ active: $route.path == '/configuracion/grupos-categoria' }">
                Grupos de categoria
              </li>
            </ul>
          </li>
        </ul>
      </template>
    </div>
  </simplebar>
</template>

<script>
import router from "vue-router";
import Cookies from "js-cookie";
import { mapGetters } from "vuex";
import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

export default {
  transition: "slide-left",
  data() {
    return {
      isConfigMenuOpen: false,
      loading: true,
    };
  },
  components: {
    simplebar,
  },
  watch: {
    budgets(newVal) {
      if (newVal) {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      budgets: "property/getBudgets",
    }),
  },
  async mounted() {
    const session = JSON.parse(Cookies.get("session"));
    const token = session.token;

    if (
      localStorage.getItem("budget_code") === null &&
      localStorage.getItem("project_type") === null &&
      localStorage.getItem("contract_num") === null &&
      localStorage.getItem("budget_id") === null &&
      localStorage.getItem("project_id") === null &&
      localStorage.getItem("project_name") === null
    ) {
      await this.$store.dispatch("property/fetchBudgets", { token }).then((response) => {
        if (response.success) {
          localStorage.setItem("budget_id", this.budgets[0].id);
          localStorage.setItem("budget_code", this.budgets[0].code);
          localStorage.setItem("project_id", this.budgets[0].project_id);
          localStorage.setItem("project_name", this.budgets[0].project.name);
          localStorage.setItem("project_type", this.budgets[0].project.projectType);
          localStorage.setItem("contract_num", this.budgets[0].contract_num);
          localStorage.setItem("unit_code", this.budgets[0].unit_code);

          localStorage.setItem("etapa", this.budgets[0].etapa);
          localStorage.setItem("manzana", this.budgets[0].manzana);
          localStorage.setItem("lote", this.budgets[0].lote);
        }
      });
    } else {
      this.loading = false;
    }
  },
  methods: {
    goToInicio() {
      this.$router.push("/inicio");
    },
    goToMisPagos() {
      this.$router.push("/mis-pagos");
    },
    goToProfile() {
      this.$router.push("/mi-perfil");
    },
    goToChangePassword() {
      this.$router.push("/mi-perfil/cambio-contrasena");
    },
    goToMisPropiedades() {
      this.$router.push("/mis-inmuebles");
    },
    goToMisConstrucciones() {
      this.$router.push("/construcciones");
    },
    goToMisReferidos() {
      this.$router.push("/mis-referidos");
    },
    goToAtencionAlCliente() {
      this.$router.push("/atencion-al-cliente");
    },
    goToPreguntasFrecuentes() {
      this.$router.push("/preguntas-frecuentes");
    },
    goToAdmPreguntasFrecuentes() {
      this.$router.push("/configuracion/preguntas-frecuentes");
    },
    goToAdmNovedades() {
      this.$router.push("/configuracion/novedades");
    },
    goToAdmGruposCategoria() {
      this.$router.push("/configuracion/grupos-categoria");
    },
    toggleConfigMenu() {
      this.isConfigMenuOpen = !this.isConfigMenuOpen; 
    }
  },
};
</script>
