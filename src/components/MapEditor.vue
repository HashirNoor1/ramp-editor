<template>
    <div class="flex flex-col mt-4">
        <div class="ramp-editor mt-5" ref="editor" style="width: 70vw; height: 80vh"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import defaultConfig from '../assets/ramp-default.json';
import { createInstance as createRampEditorInstance } from 'ramp-config-editor_editeur-config-pcar';
import 'ramp-config-editor_editeur-config-pcar/style.css';

// config editor
const editor = ref<HTMLElement | null>(null);
const rampEditorApi: any = ref(null);
const currLang = ref('en');
const config = ref<any>(defaultConfig);

onMounted(() => {
    window.addEventListener('ramp4-config-edited', onConfigEdit);
    openEditor();
});

const onConfigEdit = (event: any) => {
    console.log('CONFIG EDITOR EDITED: ', event);
};

const openEditor = () => {
    rampEditorApi.value = createRampEditorInstance(editor.value, config);
    rampEditorApi.setLanguage(currLang.value);
};
</script>

<style lang="scss" scoped>
label {
    text-align: left !important;
    width: fit-content !important;
}

select {
    border: 1px black solid;
    background: white;
    padding: 0.25rem 0.5rem;
}

.map-item {
    width: 300px;
    background: #eee;

    text-align: center;
    padding: 25px;
    cursor: pointer;

    button {
        padding: 0 !important;
    }
}

.edit-map {
    content: url('../assets/edit-icon.svg');
    margin: 0 auto;
    margin-bottom: 20px;
}

.add-map {
    content: url('../assets/add.svg');
    margin: 0 auto;
    margin-bottom: 20px;
}

input[type='number'] {
    width: 76px;
}

:deep(rv-basemap-item .rv-basemap-thumb img) {
    max-width: none;
}

:deep(.rv-details-attrib-value a) {
    white-space: unset !important;
}

$font-list: 'Montserrat', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji,
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
