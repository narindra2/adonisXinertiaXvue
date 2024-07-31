<template v-if="messageError">
    <div class="text-danger mb-1 mt-1 fs-mini" > {{  getMessageError }}</div>
</template>
<script >
export default {
    name : 'MessageError',
    props  : { messageError : undefined },
    computed: {
    getMessageError() {
        if (Array.isArray(this.messageError) ) {
            return this.messageError[0]
        }else{
            return  this.messageError
        }
    }
  }
}
</script>
<style scoped>
.fs-mini {
    font-size: 14px;
}
</style>