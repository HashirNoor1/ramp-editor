<template>
    <div v-focus-container tabindex="0" ref="rampFocusContainer" class="ramp-container">
        <div ref="rampContainer" class="mt-2 h-[60dvh] w-4/5 resize overflow-auto border"></div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';
// import { createInstance } from 'ramp-pcar';
import defaultConfig from '../assets/ramp-default.json';

const props = defineProps({
    config: {
        required: true
    }
});

watch(
    () => props.config,
    (newConfig) => {
        if (rInstance.value) {
            nextTick(() => {
                rInstance.value = (window as any).RAMP.createInstance(
                    rampContainer.value as HTMLElement,
                    newConfig as any
                );
                // rInstance.value.reload(newConfig as any);
            });
        }
    }
);

const rInstance: any = ref(null);
const rampContainer = ref<HTMLElement | null>();

onMounted(() => {
    rInstance.value = (window as any).RAMP.createInstance(rampContainer.value as HTMLElement, defaultConfig as any);
    (window as any).debugInstance = rInstance.value;
});
</script>

<style lang="scss" scoped>
:deep(rv-basemap-item .rv-basemap-thumb img) {
    max-width: none;
}
:deep(.rv-details-attrib-value a) {
    white-space: unset !important;
}

$font-list:
    'Montserrat',
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Helvetica,
    Arial,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji;
:deep(.ramp-app) {
    height: 100%;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6 {
        font-family: $font-list;
        line-height: 1.5;
    }

    input[type='checkbox'] {
        margin-top: unset;
    }
}
</style>
