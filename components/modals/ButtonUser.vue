<template>
	<div class="option mx-2" ref="option">
		<div ref="circleExclamation" class="circle-exclamation float-right mt-2 mr-2" @click="getValueRadio">
			<small>!</small>
		</div>
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
	},
	methods: {
		handleOptionSelect() {
			this.$refs.circleExclamation.click();
		},
		getValueRadio(e) {
			let options = document.getElementsByClassName('option');

			for (let i = 0; i < options.length; i++) {
				options[i].classList.remove('picked');
			}

			let circles = document.getElementsByClassName('circle-exclamation');

			for (let i = 0; i < circles.length; i++) {
				circles[i].classList.remove('selected');
			}

			this.$refs.option.classList.add('picked');
			this.$refs.circleExclamation.classList.add('selected');
			this.$emit('handleOptionSelected', this.value);
		},
	},
};
</script>
<style scoped>
.circle-exclamation {
	background-color: #fff;
	color: #f4851f;
	width: 15px;
	height: 15px;
	border-radius: 100%;
	border: 1px #f4851f solid;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: .5s;
}

.selected {
	background-color: #f4851f;
	color: #fff;
}

.option {
	height: auto;
	min-height: 125px;
	width: 100%;
	border: 1px solid gray;
	border-radius: 10px;
}

.picked {
	border: 2px solid #f4851f;
	box-shadow: 0px 1px 5.8px 0px #f4851f;
	transition: .2s;
}

input[type='radio'] {
	width: 20px;
	height: 20px;
	margin: 3px 3px 0px 0px;
	accent-color: #ce8314;
}

span {
	font-size: 12px;
	font-weight: 600;
}

.content-button {
	justify-content: center;
	width: 100%;
}

img {
	width: 45px;
	height: 45px;
}
</style>
