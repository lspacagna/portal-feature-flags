<script setup>
import FilePicker from './FilePicker.vue'
import Processing from './Processing.vue'
</script>

<script>
export default {
    data() {
        return {
            uploaded: false,
            files: ''
        }
    },
    props: ['state'],
    methods: {
        startUpload() {
            console.log('Upload clicked...')
            console.log(this.files.length)
            this.uploaded = true
            this.$emit("uploaded", true)
        },
        filesPicked(files){
            console.log('Files Uploaded...')
            this.files = files
        }
    }
}
</script>

<template>
    <div class="card-body px-lg-5 py-lg-5">
        <FilePicker :state="state" :numFiles="files.length" @upload-clicked="startUpload" @setUploads="filesPicked" v-if="uploaded == false"></FilePicker>
        <Processing :state="state" :files="files" v-if="uploaded"></Processing>
    </div>
</template>

<style>
    .card-body{
        min-height: 375px;
    }
</style>
