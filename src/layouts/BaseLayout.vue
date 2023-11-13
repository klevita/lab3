<template>
    <div class="base-layout-wrapper">
        <v-app-bar :elevation="2">
            <v-toolbar-title>Vita Disk</v-toolbar-title>
            <v-spacer />
            <v-chip v-if="$route.name === 'home'">
                {{ ($store.state.weight / 1000000).toFixed(3) + ' мб' }}
            </v-chip>
            <v-spacer />
            <div class="d-flex pt-6" v-if="$route.name === 'home'">
                <v-text-field label="фильтр: имя" clearable v-model="fileName"></v-text-field>
                <v-text-field label="фильтр: расширение" clearable class="ml-2" v-model="fileExtension"></v-text-field>
            </div>
            <v-spacer />
            <v-btn v-if="$route.name !== 'auth'" text :to="{ name: 'auth' }">
                выйти
            </v-btn>
        </v-app-bar>
        <div class="base-layout-slot-container">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: "BaseLayout",
    data: () => ({
        fileExtension: '' as string|null,
        fileName: ''as string|null
    }),
    mounted() {
        this.fileName = this.$store.state.fileNameSearch
        this.fileExtension = this.$store.state.fileExtensionSearch
    },
    watch: {
        fileExtension(newVal: string) {
            this.$store.commit('setFileExtensionSearch', newVal)
        },
        fileName(newVal: string) {
            this.$store.commit('setFileNameSearch', newVal)
        }
    }
})
</script>
<style scoped lang="scss">
.base-layout-wrapper {
    height: 100vh;

    .base-layout-slot-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>