<template>
    <v-card class="file-card">
        <div style="display: flex;align-items: center;width:calc(100% - 260px);">
            <v-text-field @change="updateFile" v-model="data.name"></v-text-field>
            <div style="padding-left: 5px;padding-bottom: 2px;">
                {{ data.full_name.slice(data.full_name.lastIndexOf('.')) }}
            </div>
        </div>

        <v-spacer />
        <div class="file-card-group">
            <v-chip>
                {{ (data.size / 1000000).toFixed(3) + ' мб' }}
            </v-chip>
            <v-btn class="mx-1" @click="download()" text icon>
                <v-icon medium color="blue">mdi-file-download</v-icon>
            </v-btn>
            <v-tooltip v-model="showTooltip" right>
                <template v-slot:activator="{ on }">
                    <v-btn @click="copyToClipboard()" text icon>
                        <v-icon medium color="blue">mdi-share-variant</v-icon>
                    </v-btn>
                </template>
                <span>Ссылка скопирована</span>
            </v-tooltip>
            <v-btn @click="deleteFile()" text icon>
                <v-icon medium color="red">mdi-trash-can-outline</v-icon>
            </v-btn>
        </div>
    </v-card>
</template>

<script lang="ts" >
import FileService, { _File } from "@/services/FileService";
import Vue, { PropType } from "vue"


export default Vue.extend({
    name: "FileComponent",
    data: () => ({
        showTooltip: false,
    }),
    props: {
        data: {
            required: true,
            type: Object as PropType<_File>,
        }
    },
    methods: {
        async deleteFile() {
            this.$store.commit('setWeight',this.$store.state.weight - this.data.size)
            await FileService.DeleteFile(this.data.id)
            this.$destroy()
            if (this.$el.parentNode)
                this.$el.parentNode.removeChild(this.$el);
        },
        async publishFile(){
            await FileService.PublishFile(this.data.id)
            let resp = await FileService.GetFileById(this.data.id)
            this.data.public_url = resp.data.public_url
        },
        updateFile(e: string) {
            FileService.RenameFile(this.data.id, e)
        },
        async download() {
            if (!this.data.public_url) {
                await this.publishFile()
            }
            const link = document.createElement("a");
            link.download = this.data.name;
            link.href = this.data.public_url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return
        },
        async copyToClipboard() {
            if (!this.data.public_url) {
                await this.publishFile()
            }
            this.showTooltip = true
            navigator.clipboard.writeText(this.data.public_url)
            setTimeout(() => {
                this.showTooltip = false
            }, 1200)
        }
    },
});
</script>
<style lang="scss" scoped>
.file-card {
    width: 100%;
    margin-top: 10px;
    background-color: #F5F5F5;
    padding: 6px 12px 6px 24px;
    display: flex;
    flex-direction: row;

    .file-card-group {
        align-items: center;
        display: flex;
    }
}
</style>
