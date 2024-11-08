<template>
	<div class="option mx-2" :class="{ picked: docType == value }" ref="option">
		<input class="float-right" type="radio" name="newDocument" :value="value" ref="value" @click="getValueRadio"
			:checked="docType == value" />
		<div class="content-button d-flex flex-column align-items-center mt-4" @click="handleOptionSelect">
			<img :src="img" alt="Solicitud" v-if="img != ''" />
			<span>{{ title }}</span>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: String,
		img: String,
		value: Number,
		result: Number,
		docType: Number,
	},
	methods: {
		handleOptionSelect() {
			this.$refs.value.click();
		},
		getValueRadio(e) {
			let options = document.getElementsByClassName('option');

			for (let i = 0; i < options.length; i++) {
				options[i].classList.remove('picked');
			}
			this.$refs.option.classList.add('picked');
			this.$emit('handleOptionSelected', e.target.value);
		},
	},
};
</script>
<style scoped>
.option {
	height: auto;
	min-height: 165px;
	width: 100%;
	border: 1px solid gray;
	border-radius: 10px;
}

.picked {
	border: 2px solid #158a2f;
	box-shadow: 0px 1px 5.8px 0px #548744b0;
}

input[type='radio'] {
	width: 20px;
	height: 20px;
	margin: 5px 3px 0px 0px;
	accent-color: #158a2f;
}

span {
	font-size: 12px;
}

.content-button {
	justify-content: center;
	width: 100%;
}
</style>
