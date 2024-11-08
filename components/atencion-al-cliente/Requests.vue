<template>
	<div class="row mt-4">
		<div class="col-12">
			<div class="welcome-text mb-2">
				<h3 class="section-title m-0" v-if="titular === 'titular'">Crear solicitud de atención</h3>
				<h3 class="section-title m-0" v-else>Solicitudes de atención</h3>
				<p v-if="titular === 'titular'">
					Hola {{ userName }}, si tienes un inconveniente puedes generar una solicitud de atención y un agente
					de Menorca atenderá tu solicitud, recuerda que el tiempo aproximado de respuesta es de 48 a 72
					horas.
				</p>

				<p v-else>
					Hola {{ userName }}, si tienes un inconveniente recuerda que solo el titular del immueble puede
					generar una solicitud de atención, luego de esto, un agente de Menorca atenderá la solicitud,
					recuerda que el tiempo aproximado de respuesta es de 48 a 72 horas.
				</p>

				<img src="~assets/img/faq-ticket.png" alt="" />
			</div>

			<Card :loading="loadingTickets">
				<div class="card">
					<div class="table">
						<div class="bar" v-if="titular === 'titular'">
							<button class="btn btn-green" @click="openCreateModal()">Crear Solicitud</button>
						</div>

						<div class="table__header atencion-cliente">
							<div># TICKET</div>
							<div>PROYECTO</div>
							<div>CATEGORÍA</div>
							<div>FECHA</div>
							<div>PROGRESO</div>
							<div>ESTADO</div>
							<div></div>
						</div>

						<template v-if="tickets && tickets.length > 0">
							<div class="table__body atencion-cliente">
								<div @click="goToDetail(ticket.id)" v-for="ticket in tickets" :key="ticket.id" style="
										cursor: pointer;
										border: 1px solid #158a2f;
										border-radius: 25px;
										margin: 10px 0;
									">
									<div>
										<span># de ticket</span>
										<div class="value-table">{{ ticket.code }}</div>
									</div>
									<div>
										<span>asunto</span>
										<div class="value-table asunto">{{ ticket.detail }}</div>
									</div>
									<div>
										<span>categoría atención</span>
										<div class="value-table">planos y anexos</div>
									</div>
									<div>
										<span>fecha</span>
										<div class="value-table">{{ ticket.date }}</div>
									</div>
									<div>
										<span>progreso</span>
										<div class="steps">
											<div v-for="step in steps" :key="step" class="step"
												:class="{ active: ticket.status.code.id >= step }">
												Step
											</div>
										</div>
									</div>
									<div>
										<span>estado</span>
										<span class="badge badge-primary" v-bind:style="{
											color: ticket.status.code.secondaryColor,
											backgroundColor: ticket.status.code.color,
										}">
											{{ ticket.status.code.name }}
										</span>
									</div>
									<div>
										<i class="fi fi-bs-bell fs-20 d-none"></i>
										<i class="fi fi-bs-bell-notification-social-media fs-20 notification-active"></i>
									</div>
								</div>
							</div>

							<!--<div v-if="nextMoreTickets" class="text-center mt-3">
								<div @click="fetchMoreTickets()" style="cursor: pointer">
									<span class="see-more" :class="{ loading: loadingFetchMoreTickets }">VER MÁS</span>
								</div>
							</div>-->
						</template>

						<template v-else>
							<div class="text-center">
								<strong style="font-size: 16px" v-if="titular === 'titular'">Aún no has generado ninguna
									solicitud</strong>
								<strong v-else>No se encontraron solicitudes generadas</strong>
							</div>
						</template>
					</div>
				</div>
			</Card>
		</div>
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Cookies from 'js-cookie';
import Card from '../common/Card';
import { EVENTS } from '../../core/constants/events';

export default {
	components: { Card },
	data() {
		return {
			filter: {
				exceptions: {
					categories: [],
				},
				options: {
					categories: [],
				},
				form: {
					title: '',
					category: '',
				},
				errors: { title: null, category: null },
			},
			titular: '',
			loadingTickets: true,
			steps: [1, 2, 3, 4],
			currentStep: 0,
			nextMoreTickets: true,
			loadingFetchMoreTickets: false,
			page: 1,
		};
	},
	methods: {
		openCreateModal() {
			this.$bvModal.show('modal_sac');
		},
		goToDetail(id) {
			this.save({
				type: EVENTS.atencionCliente.clickHistorialAtencion,
				payload: {
					atencionId: id,
				},
			});

			this.$router.push('/atencion-al-cliente/detalle/' + id);
		},
		...mapActions({
			save: 'metrics/save',
		}),
	},
	computed: {
		...mapGetters({
			user: 'account/getUser',
			tickets: 'atencioncliente/getTickets',
		}),
		userName() {
			if (this.user !== undefined && this.user.profile !== undefined && this.user.profile.name) {
				let str = this.user.profile.name.split(' ')[0].toLowerCase();
				return str.charAt(0).toUpperCase() + str.slice(1);
			}
		},
	},
	async mounted() {
		this.titular = localStorage.getItem('titular');
		const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : null;
		const token = session ? session.token : null;

		const obj3 = {
			token: token,
			payload: {
				page: this.page,
				// budgetCode: localStorage.getItem('budget_code'),
				budgetCode: "2024-00056",
			},
			params: {},
		};
		this.loadingTickets = true;
		try {
			const response = await this.$store.dispatch('atencioncliente/fetchTickets', obj3);
			this.loadingTickets = false;

			// Guardar los datos en localStorage
			localStorage.setItem('titular_full_name', response.titularFullName);
		} catch (error) {
			console.error('Error al cargar los tickets:', error);
			this.loadingTickets = false;
		}
	},
};
</script>
<style lang=""></style>
