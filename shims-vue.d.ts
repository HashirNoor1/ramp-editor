declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module '*lang.csv' {
    const content: { key: string; enValue: string; enValid: string; frValue: string; frValid: string }[];
    export default content;
}

declare module 'ramp-config-editor_editeur-config-pcar';
