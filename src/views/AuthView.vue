<template>
    <div class="auth-wrapper">
        <RegistrationComponent @switch="mode = 'login'" @registered="mode = 'login'" v-if="mode === 'register'" />
        <LoginComponent @switch="mode='register'" v-if="mode === 'login'"/>
    </div>
</template>

<script lang="ts" >
import LoginComponent from "@/components/LoginComponent.vue";
import RegistrationComponent from "@/components/RegistrationComponent.vue";
import AuthService from "@/services/AuthService";
import Vue from "vue"

export default Vue.extend({
    name: "AuthView",
    data: () => ({
        mode:<'register' | 'login'>'register'
    }),
    mounted(){
        AuthService.Logout()
        this.$store.commit('dropUser')
    },
    methods: {},
    components: { RegistrationComponent, LoginComponent }
});
</script>
<style lang="scss" scoped>
.auth-wrapper {
    margin-top: 20vh;
}
</style>
