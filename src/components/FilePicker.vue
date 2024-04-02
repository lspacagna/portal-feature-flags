<script>
export default {
    props: ['state', 'numFiles'],
    methods: {
        filesPicked(event){
            this.$emit("setUploads", event.target.files)
        }
    }
}
</script>

<template>
    <div id="upload">
        <img v-bind:src="state.logo" id='logo'>
        <div class="powered-by text-translucent" :style="{ color: state.textColor }">
            Powered by Instabase<img src="../assets/ib-logo.png" />
        </div>

        <form>
            <div class="custom-file text-left mt-6">
                <div class="form-group mb-0">
                    <input type="file" class="custom-file-input" id="file-selector" multiple @change="filesPicked">
                    <label class="custom-file-label" for="file-selector">Select file</label>
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-default btn-lg btn-block" :disabled="numFiles == 0" value="Submit" @click="$emit('uploadClicked')"
                        :style="{ backgroundColor: state.buttonColor, borderColor: state.buttonColor, color: state.btnTextColor }">
                </div>
            </div>
        </form>
    </div>
</template>

<style>
#logo {
    max-width: 80%;
    max-height: 250px;
}

.powered-by {
    padding-right: 0%;
    text-align: center;
    padding: 10px 0;
}

.powered-by img {
    margin-left: 5px;
    height: 20px;
    width: 20px;
    margin-top: -3px;
}

.text-translucent {
    opacity: 0.7;
}

.custom-file-label {
    background-color: rgba(255, 255, 255, 0.61);
}
</style>