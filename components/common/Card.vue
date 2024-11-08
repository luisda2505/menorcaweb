<template>
	<div>
		<div class="card justify-content-center mt-4" style="height: 213.5px" v-if="loading">
			<div class="loader-big"></div>
		</div>
		<slot v-else></slot>
	</div>
</template>
<script>
	import CardLoader from './CardLoader';

	export default {
		components: {
			CardLoader,
		},
		props: {
			loading: Boolean,
		},
	};
</script>
<style scoped></style>
