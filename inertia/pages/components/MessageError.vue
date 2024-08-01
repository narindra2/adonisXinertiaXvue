<template v-if="messageError">
    <Transition name="slide-fade">
        <div v-if="messageError" class="text-danger mb-1 mt-1 fs-mini"> {{ getMessageError }}</div>
    </Transition>
</template>
<script>
export default {
    name: 'MessageError',
    props: { messageError: null },
    computed: {
        getMessageError() {
            if (Array.isArray(this.messageError)) {
                return this.messageError[0]
            } else {
                return this.messageError
            }
        }
    }
}
</script>
<style scoped>
.fs-mini {
    font-size: 14px;
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>