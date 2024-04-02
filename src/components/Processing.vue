<script setup>
import Step1 from '../components/steps/StepOne.vue';
import Step2 from '../components/steps/StepTwo.vue';
import Step7 from '../components/steps/StepSeven.vue';
import 'animate.css';
</script>

<script>
export default {
    props: ['state', 'files'],
    data() {
        return {
            currentStep: 1,
        }
    },
    mounted() {
        console.log('Trigger Progressing..')
        this.triggerSteps()
    },
    methods: {
        async triggerSteps() {
            for (let i = 1; i < 8; i++) {
                console.log('Current Step: ' + this.currentStep)
                await this.delay(this.state.stepTimeout);
                this.currentStep++;
            }
        },
        delay(ms) {
            return new Promise(res => setTimeout(res, ms));
        }
    }
}
</script>

<template>
    <Step1 :state="state" :files="files.length" v-if="currentStep == 1"></Step1>
    <Step2 :state="state" :currentStep="currentStep" v-if="currentStep > 1 && currentStep < 7"></Step2>
    <Step7 :state="state" :files="files" v-if="currentStep > 6"></Step7>
</template>
