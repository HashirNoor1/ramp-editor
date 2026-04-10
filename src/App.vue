<template>
    <div class="flex-col mx-8 my-16">
        <MapInstance :config="rampConfig" />
        <div class="mt-4 flex-col relative w-4/5">
            <!-- <button
                class="bg-white border rounded border-black hover:bg-gray-100 font-bold p-4"
                @click="fileInput?.click()"
            >
                Upload RAMP config
            </button>
            <input
                type="text"
                class="rounded p-2 ml-4 w-72"
                :value="configName"
                placeholder="No file selected"
                readonly
            />
            <input
                ref="fileInput"
                type="file"
                class="cursor-pointer"
                @change="onFileUpload($event)"
                accept=".json"
                tabindex="-1"
                aria-label="RAMP config upload"
            /> -->
            <textarea
                v-model="jsonInput"
                class="flex border rounded textarea-padding w-full h-40"
                :class="{ 'border-blue-500 bg-blue-50': isDragging }"
                :placeholder="t('editor.ramp.upload.placeholder')"
                :aria-label="t('editor.ramp.upload.input')"
                @dragover.prevent="() => (isDragging = true)"
                @dragleave="() => (isDragging = false)"
                @drop.prevent="onDrop"
            ></textarea>

            <!-- textbox mini toolbar -->
            <div class="flex absolute bottom-2 right-2 border">
                <!-- Undo -->
                <button
                    @click="undoText"
                    class="bg-white rounded shadow hover:bg-gray-300 toolbar-button-padding"
                    :title="t('editor.input.toolbar.undo')"
                    :aria-label="t('editor.input.toolbar.undo')"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M8 19q-.425 0-.712-.288T7 18t.288-.712T8 17h6.1q1.575 0 2.738-1T18 13.5T16.838 11T14.1 10H7.8l1.9 1.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275L4.7 9.7q-.15-.15-.213-.325T4.426 9t.063-.375T4.7 8.3l3.6-3.6q.275-.275.7-.275t.7.275t.275.7t-.275.7L7.8 8h6.3q2.425 0 4.163 1.575T20 13.5t-1.737 3.925T14.1 19z"
                        />
                    </svg>
                </button>
                <!-- Redo -->
                <button
                    @click="redoText"
                    class="bg-white rounded shadow hover:bg-gray-300 toolbar-button-padding"
                    :title="t('editor.input.toolbar.redo')"
                    :aria-label="t('editor.input.toolbar.redo')"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M16.2 10H9.9q-1.575 0-2.738 1T6 13.5T7.163 16T9.9 17H16q.425 0 .713.288T17 18t-.288.713T16 19H9.9q-2.425 0-4.163-1.575T4 13.5t1.738-3.925T9.9 8h6.3l-1.9-1.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l3.6 3.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-3.6 3.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z"
                        />
                    </svg>
                </button>
                <!-- Paste -->
                <button
                    @click="pasteFromClipboard"
                    class="bg-white rounded shadow hover:bg-gray-300 toolbar-button-padding"
                    :title="t('editor.input.toolbar.paste')"
                    :aria-label="t('editor.input.toolbar.paste')"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="20"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6h2v14h11v2Zm4-4q-.825 0-1.412-.587Q7 16.825 7 16V4q0-.825.588-1.413Q8.175 2 9 2h9q.825 0 1.413.587Q20 3.175 20 4v12q0 .825-.587 1.413Q18.825 18 18 18Zm0-2h9V4H9v12Zm0 0V4v12Z"
                        />
                    </svg>
                </button>
                <!-- Clear -->
                <button
                    @click="clearJson"
                    class="bg-white rounded shadow hover:bg-gray-300 toolbar-button-padding"
                    :title="t('editor.input.toolbar.clear')"
                    :aria-label="t('editor.input.toolbar.clear')"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.61 122.88" height="20" width="20">
                        <path
                            d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z"
                        />
                    </svg>
                </button>
            </div>

            <div v-if="jsonError" class="mt-2 text-red-600">{{ jsonError }}</div>

            <button
                class="flex border-2 border-solid rounded font-bold hover:bg-gray-400 upload-button-padding h-12"
                @click="uploadJson"
                :disabled="!!jsonError || !jsonInput"
            >
                {{ t('editor.ramp.upload') }}
            </button>
        </div>
    </div>
    <!-- <MapEditor /> -->
</template>

<style scoped>
.textarea-padding {
    @apply p-3;
}

.toolbar-button-padding {
    @apply p-2;
}

.upload-button-padding {
    @apply text-base px-4 py-2 mt-4;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import MapInstance from './components/MapInstance.vue';

const jsonInput = ref<any>(null);
const jsonError = ref<string>('');
const isDragging = ref<boolean>(false);
// const configName = ref<string>('');
const rampConfig = ref<any>({});
const history = ref<string[]>([]);
const future = ref<string[]>([]);
const isUndoRedoing = ref(false);

const { t } = useI18n();

watch(jsonInput, (newValue, oldValue) => {
    if (isUndoRedoing.value) {
        isUndoRedoing.value = false;
        return;
    }

    // track history
    history.value.push(oldValue);
    future.value = [];
});

const uploadJson = () => {
    try {
        rampConfig.value = JSON.parse(jsonInput.value);
    } catch (err) {
        jsonError.value = 'Invalid JSON';
    }
};

const onDrop = async (event: DragEvent) => {
    isDragging.value = false;
    const data = event.dataTransfer;
    if (data && data.files.length > 0) {
        const file = data.files[0];
        const text = await file.text();
        jsonInput.value = text;
        return;
    }
};

const undoText = () => {
    if (history.value.length === 0) return;
    isUndoRedoing.value = true;
    // get last state from history and update future stack
    const prev = history.value.pop();
    future.value.push(jsonInput.value);
    jsonInput.value = prev;
};

const redoText = () => {
    if (future.value.length === 0) return;
    isUndoRedoing.value = true;
    // get last state from future and update history stack
    const next = future.value.pop();
    history.value.push(jsonInput.value);
    jsonInput.value = next;
};

const pasteFromClipboard = async () => {
    try {
        const text = await navigator.clipboard.readText();
        jsonInput.value = text;
    } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
    }
};

const clearJson = () => {
    jsonInput.value = '';
    jsonError.value = '';
};

// FOR FILE UPLOAD
// const onFileUpload = async (event: Event) => {
//     const files = (event.target as HTMLInputElement).files;
//     const uploadedFile = files && files.length > 0 ? files[0] : undefined;

//     if (!uploadedFile) {
//         if (fileInput.value) fileInput.value.value = '';
//         return;
//     }

//     // parse uploaded RAMP config JSON file
//     try {
//         const text = await uploadedFile.text();
//         rampConfig.value = JSON.parse(text);
//         configName.value = uploadedFile.name;
//     } catch (err) {
//         console.error('Failed to parse uploaded JSON file:', err);
//     }

//     if (fileInput.value) {
//         fileInput.value.value = '';
//     }
// };
</script>

<style lang="scss">
$font-list: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

.ovwContainer .layerTile {
    max-width: initial;
}

body {
    font-size: 16px;
}

#app {
    font-family: $font-list;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    --sr-accent-colour: #00d2d3;

    --sr-content-background: rgba(249, 250, 251, 1);

    --sr-border-colour: rgba(229, 231, 235, 1);
    // border-gray-200

    .scroll-arrow {
        animation: bounce-light 1s 4.5;

        &:hover {
            animation-iteration-count: infinite;
        }
    }

    @keyframes bounce-light {
        0%,
        100% {
            transform: translateY(-10%);
            animationtimingfunction: cubic-bezier(0.8, 0, 1, 1);
        }
        50% {
            transform: translateY(0);
            animationtimingfunction: cubic-bezier(0, 0, 0.2, 1);
        }
    }
}

input[type='file']:not(:focus-visible) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}
</style>
