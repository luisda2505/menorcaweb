<template>
    <div class="col upload-file" @click="clickImage">
        <template v-if="!url" class="w-100">
            <img src="~/assets/img/modals/subir.png" class="w-25 imgDefault" />
            <p>{{text}}</p>
        </template>
        <img v-else :src="url" class="previewImage py-2" />
        <input ref="image" @change="loadImage" type="file" hidden>
    </div>
</template>
<script>
export default {
    data() {
        return {
            url: ""
        }
    },
    props:{
        text:String,
    },
    methods: {
        clickImage() {
            console.log("nani");
            this.$refs.image.click();
        },
        loadImage(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        }
    }
}
</script>
<style>
.previewImage {
    height: 100%;
}

.imgDefault {
    margin-bottom: -20px;
}
</style>