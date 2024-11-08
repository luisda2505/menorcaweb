<template>
	<div class="welcome-card">
		<template v-if="gender == 'f'">
			<img class="user-female" src="~assets/img/resumen/female-mi-resumen.svg" alt="" />
		</template>
		<template v-else>
			<img class="user-male" src="~assets/img/resumen/male-mi-resumen.svg" alt="" />
		</template>

		<div></div>
		<div class="text">
			<h1 class="welcome-title">¡{{ gender == 'f' ? 'Bienvenida' : 'Bienvenido' }} {{ name }}!</h1>
			<span>
				Puedes conocer tus pagos pendientes o pagar tu próxima letra además de conocer tu deuda total.
			</span>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			gender: String,
			name: String,
		},
	};
</script>
<style lang=""></style>
