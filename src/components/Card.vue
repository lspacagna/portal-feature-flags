<script setup>
import CardTitle from '../components/CardTitle.vue'
import CardBody from './CardBody.vue';
</script>

<script>
export default {
    props: ['state'],
    data() {
        return {
            headerVisible: true
        }
    },
    methods: {
        hideHeader() {
            this.headerVisible = false;
        }
    }
}
</script>

<template>
    <div class="container pt-8 pb-5">
        <div class="row justify-content-center">
            <div class="col-lg-7 col-md-9 col-sm-12">
                <div class="card border-0 mb-0 text-center"
                    :style="{ backgroundColor: state.bgColor, color: state.textColor }">
                    <CardTitle :state="state" v-if="headerVisible"></CardTitle>
                    <CardBody :state="state" @uploaded="hideHeader"></CardBody>
                </div>
            </div>
        </div>
    </div>
</template>