<template>

    <div class="accordion">
        <div class="tab__header">
            <a href="#" class="tab__link" @click.prevent="active = !active">
                <strong>{{ title }}</strong>
                <span class="down-Arrow" v-show="!active">
                    <i class="fi fi-bs-chevron-double-down"></i>
                </span>
                <span class="up-Arrow" v-show="active">
                    <i class="fi fi-bs-chevron-double-up"></i>
                </span>
            </a>
        </div>
        <div class="tab__content" v-show="active">
            <slot />
        </div>
    </div>

</template>

<script>

export default {
    data() {
        return {
            active: false,
        }
    },
    props: [
        'title'
    ],
    components: {

    },
    computed: {

    },
    async mounted() {


    },
    methods: {


    }
}
</script>
