<template>
  <div class="login-container">
    <el-form
        class="login-form"
        :rules="rules"
        ref="form"
        :model="user"
        @submit.prevent="handleSubmit"
    >
      <div class="login-form__header">
        <img
            class="login-logo"
            src="@/assets/login_logo.png"
            alt="拉勾心选"
        >
      </div>
      <el-form-item prop="account">
        <el-input v-model="user.account">
          <template #prefix>
            <svg-icon iconName="icon-user"></svg-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input v-model="user.pwd" type="password">
          <template #prefix>
            <svg-icon iconName="icon-lock"></svg-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="imgcode">
        <div class="imgcode-wrap">
          <el-input
              v-model="user.imgcode"
              placeholder="请输入验证码"
          >
            <template #prefix>
              <svg-icon iconName="icon-key"></svg-icon>
            </template>
          </el-input>
          <img
              class="imgcode"
              alt="验证码"
              :src="captchaSrc"
              @click="loadCaptcha"
          >
        </div>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" class="submit-button" type="primary" native-type="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {ElMessage, FormInstance} from "element-plus";
import {getCaptcha, login} from "@/api/common";
import {useStore} from "@/store/index"
import {useRoute, useRouter} from "vue-router";
import {IFormRule} from "@/types/element-plus";

const router = useRouter()
const route = useRoute()
const store = useStore()
let form = ref<FormInstance | null>(null);
const captchaSrc = ref('')
const loading = ref(false)
const user = reactive({
  account: 'admin',
  pwd: '123456',
  imgcode: ''
})
const rules = reactive<IFormRule>({
  account: [
    {required: true, message: 'Please input account', trigger: 'change'},
  ],
  pwd: [
    {required: true, message: 'Please input pwd', trigger: 'change'},
  ],
  imgcode: [
    {required: true, message: 'Please input imgcode', trigger: 'change'},
  ],
})
const handleSubmit = async () => {
  const valid = await form.value?.validate()
  if (!valid) {
    return false
  }
  loading.value = true
  let data = await login(user).catch(() => {
    loadCaptcha()
  }).finally(() => {
    loading.value = false
  })
  if (!data) {
    return
  }
  store.setMenus(data.menus)
  console.log(data.menus)
  // data.menus.forEach(item=>{
  //   router.addRoute({ path: item.path, component:  })
  // })
  store.setUser({
    ...data.user_info,
    token: data.token
  })
  ElMessage.success("登录成功")
  let redirect = route.query.redirect || "/"
  router.replace("/")
}
const loadCaptcha = async () => {
  let data = await getCaptcha()
  captchaSrc.value = URL.createObjectURL(data)
}
onMounted(() => {
  loadCaptcha()
})
</script>
<style scoped lang="scss">
.login-container {
  min-width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;

  .login-form {
    padding: 30px;
    border-radius: 6px;
    background: #fff;
    min-width: 350px;

    .login-form__header {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 30px;
    }

    .login-logo {
      width: 271px;
      height: 74px;
    }

    .imgcode-wrap {
      display: flex;
      align-items: center;
      justify-content: center;

      .imgcode {
        height: 37px;
      }
    }
  }

  .submit-button {
    width: 100%;
  }
}
</style>
