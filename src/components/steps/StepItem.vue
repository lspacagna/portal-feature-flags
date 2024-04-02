<script>
export default {
    props: ['currentStep', 'position', 'state', 'flipped'],
}
</script>

<template>
    <div class="item">
        <i :class="{ 'text-processing': currentStep == position, 'icon-complete': currentStep > position, 'flipped': flipped }">
            <slot name="icon"></slot>
        </i>
        <div class="details">
            <h3 :class="{ 'text-processing': currentStep == position, 'text-complete': currentStep > position }" :style="{ color: state.textColor }">
                <slot name="heading"></slot>
            </h3>
            <slot></slot>
        </div>
        <div class="status">
             <div class="processing" v-if="currentStep == position">
                <font-awesome-icon icon="spinner" class="fa-spin"/>
            </div>
            <div class="completed" v-if="currentStep > position">
                <font-awesome-icon icon="check"/>
            </div>
           
            
        </div>
    </div>
</template>

<style scoped>

.item:before, .item:after{
    border-left: 1px solid white!important;
}

.status{
    margin: auto;
}
.details h3{
    opacity: 20%;
}

.flipped{
    transform: rotate(180deg);
}

.completed{
    color: green;
}

.text-processing{
    opacity: 100%!important;
    font-weight: bold;
}

.text-complete{
    color: green;
    opacity: 100%!important;
}

.icon-complete{
    opacity: 100%!important;
}

.item {
    margin-top: 2rem;
    display: flex;
}

.details {
    flex: 1;
    margin-left: 1rem;
}

i {
    display: flex;
    place-items: center;
    place-content: center;
    width: 32px;
    height: 32px;
    opacity: 20%;
}

h3 {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--color-heading);
}


.item {
    margin: 0 30px;
    margin-top: 0;
    padding: 1rem 0 1rem calc(var(--section-gap) / 2);
}

i {
    top: calc(50% - 25px);
    left: -0px;
    position: absolute;
    border: 1px solid #E7E7E7;
    border-radius: 8px;
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
}

.item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 24px;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
}

.item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 24px;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
}

.item:first-of-type:before {
    display: none;
}

.item:last-of-type:after {
    display: none;
}
</style>