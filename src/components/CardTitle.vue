<script>
export default {
  props: ['state']
}
</script>

<template>
    <div class="card-header bg-transparent">
        <h1 class="mt-2 mb-3" :style="{color: state.textColor}">{{state.title}}</h1>
    </div>     
</template>