<template>
	<div>
		<b-modal id="modal_sac" size="lg" centered class="modal fade" tabindex="-1" :hide-footer="hideFooterModal"
			:hide-header="true" aria-hidden="true">
			<div class="d-flex justify-content-end">
				<button type="button" aria-label="Close" class="close" @click="closeModal">×</button>
			</div>
			<div class="row">
				<div class="d-none d-sm-none d-md-none d-lg-block col-lg-2 col-xl-2">
					<Circles :circlesSelected="circlesSelected" />
				</div>
				<div class="col-12 col-md-12 col-lg-10 col-xl-10">
					<component :is="getComponentMain" @nextModal="nextModal" @createNewTicket="createNewTicket" @backModal="backModal"
						@setStatusClient="setStatusClient" :statusClient="statusClient" @selectCategoryType="selectCategoryType"
						:categoriesOptions="categoriesOptions" :messageErrorList="messageErrorList" :selectedTitular="selectedTitular"
						:savedTitulars="savedTitulars" :setSelectedProject="setSelectedProject"></component>
				</div>
			</div>
		</b-modal>

		<b-modal id="modalLoader" ref="modalLoader" size="xsmall" title="" :no-close-on-backdrop="true" centered hide-footer hide-header>
			<div class="text-center">
				<b-spinner variant="success" style="width: 6rem; height: 6rem;"></b-spinner>
			</div>
		</b-modal>
	</div>

</template>
<script>
import Cookies from 'js-cookie';
import NewDocumentForm from '../../components/modals/NewDocumentForm.vue';
import SuccessMessage from '../../components/modals/SuccessMessage.vue';
import MainModal from '../../components/modals/MainModal.vue';
import ErrorModal from '../../components/modals/ErrorModal.vue';
import RequestDocument from '../../components/modals/RequestDocument.vue';
import RequiredDocuments from '../../components/modals/RequireDocuments.vue';
import ProgressBar from '../../components/modals/ProgressBar.vue';
import Circles from './Circles.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
	components: {
		NewDocumentForm,
		SuccessMessage,
		MainModal,
		ErrorModal,
		RequestDocument,
		RequiredDocuments,
		ProgressBar,
		Circles
	},
	data() {
		return {
			hideFooterModal: true,
			activeForm: true,
			indexComponent: 0,
			statusClient: 0,
			circlesSelected: 1,
			categoriesOptions: [],
			messageErrorList: [],
			selectedTitular: 0,
			savedTitulars:[],
			selectedProject: ''
		};
	},
	methods: {
		setSelectedProject(value){
			this.selectedProject = value;
		},
		handleNextButton() {
			this.activeForm = false;
		},
		handleVerificationModal() { },
		nextModal({indexmodal, errorMessageList = [], idTitular, savedTitular = []}) {
			this.messageErrorList = errorMessageList;
			this.savedTitulars.push(savedTitular);
			this.selectedTitular = idTitular;
			this.indexComponent = indexmodal;
		},
		backModal(value) {
			this.indexComponent = value;
		},
		setStatusClient(value) {
			this.statusClient = value;
		},
		closeModal() {
			this.$bvModal.hide('modal_sac');
			this.indexComponent = 0;
		},
		async selectCategoryType(value) {
			this.$refs.modalLoader.show();

			const session = JSON.parse(Cookies.get('session'));
			const token = session.token;

			const obj = {
				token: token,
				selectedType: value
			};

			this.categoriesOptions = await this.$store.dispatch('atencioncliente/fetchProjectCategories', obj).then((data) => {
				return data;
			});

			this.$refs.modalLoader.hide();

			this.nextModal({indexmodal: 1});
		},
		async createNewTicket(closeDialog) {
			const session = Cookies.get('session') ? JSON.parse(Cookies.get('session')) : null;
			const token = session ? session.token : null;

			// let attentionType = 0;

			// switch(attentionType){
			// 	case "Consulta": attentionType = 1;
			// 		break;
			// 	case "Solicitud": attentionType = 3;
			// 		break;
			// 	case "Reclamo": attentionType = 4;
			// 		break;
			// 	case "Queja": attentionType = 5;
			// 		break;
			// 	case "Seguimiento": attentionType = 6;
			// 		break;
			// }

			const obj = {
				token: token,
				payload: {
					// unitId: this.budgetUnit,
					unitId: 27625,
					titularId: parseInt(this.user.profile.sperantClientId),
					// titularId: 21384,
					categoryAttentionId: 12,
					attentionTypeId: 3,
					// budgetId: this.newRequestDocument.contractNumber,
					budgetId: 116217,
					projectName: this.selectedProject,
				}
			};

			await this.$store.dispatch('atencioncliente/createSperantNewTicket', obj).then((data) => {
				if (data.success) {
					this.indexComponent = 2;
				}
			});

			closeDialog();
		}
	},
	computed: {
		...mapGetters({
			user: "account/getUserAccount",
			budgetUnit: 'atencioncliente/getBudgedUnit',
		}),
		getComponentMain() {
			switch (this.indexComponent) {
				case 0:
					return 'MainModal';
				case 1:
					this.circlesSelected = 2;
					return 'NewDocumentForm';
				case 2:
					this.circlesSelected = 3;
					return 'SuccessMessage';
				case 3:
					return 'ErrorModal';
				case 4:
					return 'RequestDocument';
				case 5:
					return 'RequiredDocuments';
				case 6:
					return 'ProgressBar';
				default:
					return 'MainModal';
			}
		},
	},
};

</script>
