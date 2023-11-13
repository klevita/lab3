<template>
    <div class="folder-wrapper">
        <v-expansion-panels >
            <v-expansion-panel >
                <v-expansion-panel-header color="#F5F5F5">
                    <span>
                        {{ folderData.name }}
                    </span>
                    <div style="display: flex;justify-content: end;margin-right: 80px;">
                        <v-chip>
                            {{ (folderData.size / 1000000).toFixed(3) + ' мб' }}
                        </v-chip>
                    </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-card class="folder-item-wrapper">
                        <v-file-input :error="fileError" :loading="fileLoading"
                            :messages="fileErrors" v-model="file" show-size label="Загрузить файл"></v-file-input>
                    </v-card>
                    <FileComponent v-for="f in files" :data="f" :key="f.id" />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import FileService, { _File } from "../services/FileService"
import { _Folder } from "../services/FolderService"
import FileComponent from './FileComponent.vue'

export default Vue.extend({
    name: "FolderComponent",
    data: () => ({
        fileLoading: false,
        fileError: false,
        fileErrors: [] as string[],
        file: undefined as File | undefined | null,
        rawFilesData: [] as _File[],
    }),
    async mounted() {
        this.rawFilesData = (await FileService.GetFiles(this.folderData.id)).data;
    },
    methods: {
        validateFile(f: File | undefined | null) {
            this.fileError = false;
            this.fileErrors = [];
            if (!f) {
                return false;
            }
            if (f.size > 20000000) {
                this.fileError = true;
                this.fileErrors.push("Размер файла не должен превышан 20мб");
            }
            if (f.name.slice(-4) === ".php") {
                this.fileError = true;
                this.fileErrors.push("Нельзя загружать .php файлы");
            }
            return !(!!this.fileErrors.length);
        },
        async processFile(f: File | undefined | null) {
            if (this.validateFile(f) && f) {
                this.fileLoading = true;
                const resp = await FileService.UploadFile(f,this.folderData.id);
                this.$store.commit('setWeight',this.$store.state.weight + resp.data.size)
                this.fileLoading = false;
                this.rawFilesData = (await FileService.GetFiles(this.folderData.id)).data;
            }
        }
    },
    computed: {
        files(): _File[] {
            return this.rawFilesData.filter((f) => {
                if(this.$store.state.fileExtensionSearch.length){
                    if(f.full_name.slice(f.full_name.lastIndexOf('.')+1) !== this.$store.state.fileExtensionSearch){
                        return false
                    }
                }
                if(this.$store.state.fileNameSearch.length){
                    if(!f.name.includes(this.$store.state.fileNameSearch)){
                        return false
                    }
                }
                return true
            })
        }
    },
    props: {
        folderData: {
            required: true,
            type: Object as PropType<_Folder>,
        },
    },
    watch: {
        file(newVal) {
            this.processFile(newVal)
        }
    },
    components: { FileComponent }
})
</script>
<style scoped lang="scss">
.folder-wrapper {
    margin-top: 10px;
    background-color: #F5F5F5;

    .folder-item-wrapper {
        display: flex;
        align-items: center;
        background-color: #F5F5F5;
        padding: 0 12px 0 12px;
        margin-top: 12px;
    }
}
</style>
<style lang="scss">
.v-expansion-panel::before {
    box-shadow: none !important;
}

.v-expansion-panel-header {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.v-expansion-panel-content__wrap{
    padding-right: 0;
    padding-left: 24px;
}
</style>
