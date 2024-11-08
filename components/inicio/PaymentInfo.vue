<template>
    <div class="card mt-4">
        <h3 class="card-title mb-2">Mis últimos pagos</h3>

        <ul v-if="payments" class="latest-payments">
            <!-- <li style="cursor: pointer" @click="goToPayments()" v-for="(payment, index) in payments" :key="index">
                <div>
                    <header v-bind:class="[overduePayments(payment), paidPayments(payment)]">
                        <span class="middot">&middot;</span>
                        <h4>
                            {{ paymentStatus(payment) }}
                        </h4>
                    </header>
                </div>
                <div class="d-flex justify-content-between">
                    <span class="date" v-if="payment.fecha_pago !== null">
                        {{ $moment(payment.fecha_pago).format('DD MMMM YYYY') }}
                    </span>
                    <span v-else>Aún no se ha efectuado el pago</span>
                    <span class="amount">
                        {{ payment.monto_pagado | currency_format(payment.moneda_venta) }}
                    </span>
                </div>
            </li> -->
        </ul>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="">

</style>