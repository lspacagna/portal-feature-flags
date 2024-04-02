<script setup>
import 'animate.css';
</script>

<script>
export default {
    props: ['state', 'files'],
    data() {
        return {
            currentPercent: 0,
            currentFile: 0
        }
    },
    mounted() {
        this.processFiles()
    },
    methods: {
        async processFiles() {
            // Get how long per file
            let fileTimeout = parseInt(this.state.stepTimeout / this.files);

            if(this.files == 1){
                fileTimeout = parseInt(this.state.stepTimeout / 3)
            }

            for (let i = 0; i < this.files; i++) {
                // Delay process
                await this.delay(fileTimeout);
                
                // Get how much to increase loading bar by
                this.currentFile++;
                let filePercent = 100 / this.files;
                this.currentPercent = Math.round(this.currentPercent + filePercent);
            }
        },
        delay(ms) {
            return new Promise(res => setTimeout(res, ms));
        }
    }
}
</script>

<template>
    <h1 id='upload-icon' class="display-1 mb-5" :style="{ color: state.textColor }">
        <font-awesome-icon icon="arrow-up" />
    </h1>
    <div class="progress-wrapper mb-4">
        <div class="progress-info">
            <div class="progress-label">
                <span :style="{ color: state.buttonColor }">{{currentFile}} / {{ files }}</span>
            </div>
            <div class="progress-percentage">
                <span :style="{ color: state.textColor }">{{currentPercent}}%</span>
            </div>
        </div>
        <div class="progress">
            <div class="progress-bar"
                :style="{ backgroundColor: state.buttonColor, borderColor: state.buttonColor, color: state.btnTextColor, width: currentPercent + '%' }"
                role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>
    <h2 :style="{ color: state.textColor }">Uploading Files</h2>
</template>

<style>
#upload-icon {
    animation: shakeY 5s infinite;
}

.progress-label span {
    opacity: 61%
}
</style>

