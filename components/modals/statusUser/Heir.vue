<template>
	<div class="heir-dni w-100">
		<p class="mb-0 title">Heredero {{ index + 1 }}</p>
		<div class="dniFront">
			<img src="~/assets/img/modals/dnianverso.png" />
			<a href="">DNI imagen delantera</a>
		</div>
		<div class="dniBack">
			<img src="~/assets/img/modals/dnireverso.png" />
			<a href="">DNI imagen reversa</a>
		</div>

		<input type="radio" name="" id="" />
	</div>
</template>
<script>
export default {
	props: {
		index: Number
	}
};
</script>
<style scoped>
.heir-dni {
	border: 1px solid green;
	border-radius: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	font-size: 10px;
	padding: 10px 10px;
	margin: 10px 0px;
}

.title {
	font-size: 13px;
	font-weight: 500 !important;
	margin-bottom: 0px !important;
}

.heir-dni img {
	width: 40px;
}

input[type='radio'] {
	width: 20px;
	height: 20px;
	margin: 5px 3px 0px 0px;
	accent-color: green;
	cursor: pointer;
}
</style>
