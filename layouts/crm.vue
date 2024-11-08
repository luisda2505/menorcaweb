<template>
	<div>
		<Menu :positionFixed="positionFixed" :logged="true" />
		<div class="page" v-bind:class="{ fixed: positionFixed }">
			<div class="container">
				<Sidebar />
				<Nuxt />
			</div>
		</div>
	</div>
</template>
<script>
	import Menu from '@/components/common/Menu';
	import Sidebar from '@/components/common/Sidebar';

	export default {
		components: { Menu, Sidebar },
		data() {
			return {
				positionFixed: true,
			};
		},
	};
</script>
