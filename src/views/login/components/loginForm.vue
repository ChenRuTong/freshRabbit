<template>
  <div class="loginForm">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>账户登录</span>
        </div>
      </template>
      <el-form
        ref="ruleFormRef"
        :rules="rules"
        label-position="left"
        label-width="60px"
        :model="loginForm"
        style="max-width: 460px">
        <el-form-item label="账户" prop="account">
          <el-input v-model="loginForm.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" />
        </el-form-item>
        <el-form-item label-width="0px" prop="agree">
          <el-checkbox-group v-model="loginForm.agree">
            <el-checkbox name="agree" label="我已同意隐私条款和服务条款" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label-width="0px">
          <el-button
            class="btn"
            type="primary"
            @click="login(ruleFormRef)"
            :loading-icon="Eleme"
            :loading="loginLoading"
            >点击登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import type { FormRules } from 'element-plus/lib/components/form/src/types.js'
  import { reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { loginFn } from '@/api/login'
  import { useUserStore } from '@/stores/user'
  import { Eleme } from '@element-plus/icons-vue'
  import type { FormInstance } from 'element-plus/lib/components/form/index.js'

  const useUser = useUserStore()
  const loginForm = ref({
    account: 'heima282',
    password: 'hm#qd@23!',
    agree: [],
  })
  const loginLoading = ref(false)
  const ruleFormRef = ref<FormInstance>()

  const rules = reactive<FormRules>({
    account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    agree: [{ type: 'array', required: true, message: '请同意条款', trigger: 'change' }],
  })

  const router = useRouter()
  const route = useRoute()

  const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        const loginQuery = {
          account: loginForm.value.account,
          password: loginForm.value.password,
        }
        try {
          loginLoading.value = true
          const { code, msg, result } = await loginFn(loginQuery)
          useUser.setUserInfo(result).then((res) => {
            if (route.params.fromPath) {
              router.push({ path: `${route.params.fromPath}` })
            } else {
              router.push({ path: '/layout' })
            }
          })
        } catch (err) {
          //@ts-ignore
          ElMessage.error(err.msg)
        } finally {
          loginLoading.value = false
        }
      }
    })
  }
</script>

<style scoped lang="scss">
  .loginForm {
    width: 380px;
    position: absolute;
    top: 60px;
    right: 500px;
    .card-header {
      text-align: center;
    }
    .btn {
      width: 100%;
    }
  }
</style>
