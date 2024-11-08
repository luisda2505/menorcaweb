<template>
	<div class="circles-advance w-100">
		<div class="bar"></div>
		<div class="bar-green"></div>
		<div class="circles">
			<div class="circle active">1</div>
			<div class="circle">2</div>
			<div class="circle">3</div>
		</div>
	</div>
</template>
<script>
	export default {
		methods: {
			selectCircle(e) {
				let circle = e.target;
				let circles = circle.parentNode.children;
				for (let i = 0; i < circles.length; i++) {
					circles[i].classList.remove('active');
				}
				circle.classList.add('active');
			},
		},
		props: {
			circlesSelected: Number,
		},
		watch: {
			circlesSelected() {
				let circles = document.getElementsByClassName('circle');

				for (let i = 0; i < this.circlesSelected; i++) {
					circles[i].classList.add('active');
				}
			},
		},
	};
</script>
<style scoped>
	.circle {
		background-color: gray !important;
		width: 40px;
		height: 40px;
		margin: 0px 0px 60px 0px;
		color: #fff;
		font-size: 20px;
	}
	.active {
		background-color: #158a2f !important;
		outline: 3px solid #158a2f;
		outline-offset: 2px;
	}

	.circles {
		position: absolute;
		z-index: 2;
		top: 40px;
	}

	.circles-advance {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 5%;
	}

	.bar-green {
		width: 5px;
		height: 55px;
		background-color: #158a2f;
		z-index: 1;
		position: absolute;
		top: 85px;
	}

	.bar {
		background-color: gray;
		width: 5px;
		height: 185px;
		z-index: 0;
		position: absolute;
		top: 95px;
	}

	.second .third {
		top: 10;
	}
</style>
