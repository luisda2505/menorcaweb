<template>
    <div class="card">
        <h3 class="card-title mb-2">¡Refiere y gana!</h3>
        <p class="mb-2">Recuerda que refiriendo a tus amigos y/o familiares puedes ganar hasta S/750.00 soles</p>

        <ul class="list-unstyled m-0">
            <li>
                Has referido a:
                <!-- <span class="text-orange">
                    {{ referrals }}
                    {{ referrals == 1 ? 'persona' : 'personas' }}
                </span> -->
            </li>
            <!--<li>Has cobrado: <span class="text-orange">S/ 500.00</span></li>-->
            <li class="mt-3">
                <b v-b-modal.modal-popup class="fake-link">Entérate más</b>
                de nuestras recompensas
            </li>
        </ul>

        <div class="text-right mt-3">
            <nuxt-link to="/mis-referidos" class="btn btn-green"> Referir Ahora </nuxt-link>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="">

</style>