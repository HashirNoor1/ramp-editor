<template>
    <div class="flex-col mx-8 my-16">
        <MapInstance :config="rampConfig" />
        <div class="mt-4 flex-col">
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
                class="flex border rounded p-3 w-4/5 h-40"
                :class="{ 'border-blue-500 bg-blue-50': isDragging }"
                placeholder="Paste RAMP config JSON here"
                aria-label="RAMP config JSON input"
                @dragover.prevent="() => (isDragging = true)"
                @dragleave="() => (isDragging = false)"
                @drop.prevent="onDrop"
            ></textarea>
            <div v-if="jsonError" class="text-red-600">{{ jsonError }}</div>

            <button
                class="flex border-2 border-solid rounded font-bold hover:bg-gray-400 px-4 py-2 mt-4 h-12"
                @click="uploadJson"
                :disabled="!!jsonError || !jsonInput"
            >
                Upload RAMP Config
            </button>
        </div>
    </div>
    <!-- <MapEditor /> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MapInstance from './components/MapInstance.vue';

const jsonInput = ref<any>(null);
const jsonError = ref<string>('');
const isDragging = ref<boolean>(false);
// const configName = ref<string>('');
const rampConfig = ref<any>({});

const uploadJson = () => {
    try {
        rampConfig.value = JSON.parse(jsonInput.value);
    } catch {
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
