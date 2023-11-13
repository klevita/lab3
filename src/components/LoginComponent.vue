<template>
    <div>
        <v-card style="min-width: 370px;">
            <v-form>
                <v-card-title>
                    Вход
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="email" :rules="emailRules" label="Почтовый ящик" required></v-text-field>

                        <v-text-field v-model="pass" :counter="8" :rules="passRules" label="Кодовое слово"
                            required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" variant="outlined" @click="form.validate(); login()">войти</v-btn>
                    <v-spacer />
                    <v-btn text @click="$emit('switch')">Регистрация</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
        <v-alert transition="slide-x-transition" v-show="error" style="margin-top: 10px;" dense prominent type="error">Пользователь не найден</v-alert>
    </div>
</template>

<script lang="ts" >
import Vue from "vue"

export default Vue.extend({
    name: "LoginComponent",
    data: () => ({
        pass: '',
        email: '',
        valid: false,
        error:false,
        passRules: [
            (v: string) => /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v) || "цифры, спец символы, буквы: строчные, заглавные",
        ],
        emailRules: [
            (v: string) => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(v) || "неправильная почта",
        ],
    }),
    methods:{
        async login() {
            await this.$store.dispatch('fetchUser', { email: this.email, pass: this.pass })
            if(this.$store.state.user.token.length){
                this.$router.replace({name:'home'})
            }else{
                this.error = true
                setTimeout(()=>{
                    this.error = false
                },3500)
            }
        }
    },
    computed: {
        form(): Vue & { validate: () => boolean } {
            return this.$refs.form as Vue & { validate: () => boolean }
        }
    }
});
</script>
<style lang="scss" scoped></style>
