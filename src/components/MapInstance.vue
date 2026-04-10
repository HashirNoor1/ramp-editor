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
.ramp-container :where(.m-5) {
    margin: 5px !important;
}

.ramp-container :where(.mx-4) {
    margin-left: 4px !important;
    margin-right: 4px !important;
}

.ramp-container :where(.mx-5) {
    margin-left: 5px !important;
    margin-right: 5px !important;
}

.ramp-container :where(.p-3) {
    padding: 3px !important;
}

.ramp-container :where(.p-4) {
    padding: 4px !important;
}

.ramp-container :where(.p-5) {
    padding: 5px !important;
}

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
