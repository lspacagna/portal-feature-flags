<script setup>
import 'animate.css';
import StepItem from '../../components/steps/StepItem.vue';
import DocumentationIcon from '../../components/icons/IconDocumentation.vue';
</script>

<script>
export default {
    props: ['state', 'files', 'currentStep'],
    data() {
        return {
            currentPercent: 0,
            currentFile: 0
        }
    }
}
</script>

<template>
    <h1 id="file-icon" class="mb-5" :style="{ color: state.textColor }">
        <font-awesome-icon icon="file" />
    </h1>
    <div id="search-icon">
        <h1>
            <font-awesome-icon icon="magnifying-glass" :style="{ color: state.buttonColor }" />
        </h1>
    </div>

    <div>
        <StepItem :currentStep="currentStep" :position="2" :state="state">
            <template #icon>
                <font-awesome-icon icon="eye" />
            </template>
            <template #heading>Digitizing</template>
        </StepItem>
        <StepItem :currentStep="currentStep" :position="3" :state="state" :flipped="true">
            <template #icon>
                <font-awesome-icon icon="arrows-split-up-and-left" />
            </template>
            <template #heading>Classifying</template>
        </StepItem>
        <StepItem :currentStep="currentStep" :position="4" :state="state">
            <template #icon>
                <font-awesome-icon icon="brain" />
            </template>
            <template #heading>Extracting</template>
        </StepItem>
        <StepItem :currentStep="currentStep" :position="5" :state="state">
            <template #icon>
                <font-awesome-icon icon="check" />
            </template>
            <template #heading>Validating</template>
        </StepItem>
        <StepItem :currentStep="currentStep" :position="6" :state="state">
            <template #icon>
                <font-awesome-icon icon="code" />
            </template>
            <template #heading>Performing Post-Processing</template>
        </StepItem>
    </div>


    <!-- <h2 :style="{ color: state.textColor }">Uploading Files</h2> -->
</template>

<style scoped>
#file-icon {
    font-size: 5em;
}

#search-icon {
    width: 50px;
    position: absolute;
    top: 100px;
    left: 51%;
    -webkit-animation: searching 4s linear infinite;
    -moz-animation: searching 4s linear infinite;
    -o-animation: searching 4s linear infinite;
    animation: searching 4s linear infinite;
}

#search-icon h1{
    font-size: 2.2em;
}

@-webkit-keyframes searching {
    from {
        -webkit-transform: rotate(0deg) translateX(10px) rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg) translateX(10px) rotate(-360deg);
    }
}

@-moz-keyframes searching {
    from {
        -moz-transform: rotate(0deg) translateX(10px) rotate(0deg);
    }

    to {
        -moz-transform: rotate(360deg) translateX(10px) rotate(-360deg);
    }
}

@-o-keyframes searching {
    from {
        -o-transform: rotate(0deg) translateX(10px) rotate(0deg);
    }

    to {
        -o-transform: rotate(360deg) translateX(10px) rotate(-360deg);
    }
}

@keyframes searching {
    from {
        transform: rotate(0deg) translateX(10px) rotate(0deg);
    }

    to {
        transform: rotate(360deg) translateX(10px) rotate(-360deg);
    }
}
</style>

