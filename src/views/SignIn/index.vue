<script setup lang="ts">
import SingleLayout from '@/layouts/SingleLayout/index.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { t } from '@/locales';
import { loginApi } from '@/api/login';
import { message } from 'ant-design-vue';

const router = useRouter();

const username = ref('');
const password = ref('');
const rememberMe = ref(false);

const remember = () => {
  rememberMe.value = !rememberMe.value
}

const gotoReset = () => {
  router.push({ name: 'ResetPassword' });
}

const gotoSignUp = () => {
  router.push({ name: 'SignUp' });
}

const handleSignIn = async () => {
  if (!username.value) {
    message.error(t('message.error.usernameEmpty'));
    return;
  }
  if (!password.value) {
    message.error(t('message.error.passwordEmpty'));
    return;
  }
  await loginApi(username.value, password.value);
  message.success(t('message.success.signIn'));
  router.push({ name: 'Home' });
};
</script>

<template>
  <SingleLayout>
    <template #content>
      <div class="flex flex-col items-center mx-8 mt-20">
        <!-- 标题 -->
        <h1 class="text-3xl md:text-5xl font-bold mb-2 text-primary">
          {{ t('signin.title') }}
        </h1>

        <!-- 登录表单 -->
        <div class="w-full max-w-md flex flex-col body-bg items-center justify-center mt-4 px-8 py-4 rounded-[10px] space-y-4">
          <p class="text-2xl font-bold text-secondary">
            {{ t('signin.label') }}
          </p>
          <!-- 输入框 -->
          <a-input
            v-model:value="username"
            type="text"
            :placeholder="t('signin.usernamePlaceholder')"
            class="w-full px-4 py-2 rounded-[10px] border-all custom-input"
          />
          <a-input-password
            v-model:value="password"
            type="password"
            :placeholder="t('signin.passwordPlaceholder')"
            class="w-full px-4 py-2 rounded-[10px] border-all custom-input"
          />

          <!-- 记住我 -->
          <div class="w-full flex justify-between text-sm text-secondary mb-6 mx-2 px-2">
            <a-checkbox @change="remember">
              {{ t('signin.remember') }}
            </a-checkbox>
            <span class="primary underline-link" @click="gotoReset">{{ t('signin.forget') }}</span>
          </div>

          <!-- 登录按钮 -->
          <button
            class="w-[40%] py-2 font-bold rounded-[10px] border-none primary-button"
            @click="handleSignIn"
          >
            {{ t('signin.button') }}
          </button>

          <!-- 注册提示 -->
          <p class="text-center text-secondary mt-4 font-bold">
            {{ t('signin.signupLabel') }} <span class="primary underline-link" @click="gotoSignUp">{{ t('signin.signupButton') }}</span>
          </p>
        </div>
      </div>
    </template>
  </SingleLayout>
</template>

<style lang="scss">
@use '@/style/custom-theme' as *;
.custom-input:focus {
  transition: all 0.2s ease;
  border-color: var(--primary);
}
</style>
