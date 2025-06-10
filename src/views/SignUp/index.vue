<script setup lang="ts">
import SingleLayout from '@/layouts/SingleLayout/index.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { t } from '@/locales';
import { registerApi } from '@/api/login';
import { message } from 'ant-design-vue';

const router = useRouter();
const route = useRoute();

const username = ref('');
const password = ref('');
const recheckPassword = ref('')
const rememberMe = ref(false);

const remember = () => {
  rememberMe.value = !rememberMe.value
}

const gotoSignIn = () => {
  router.push({ name: 'SignIn' });
}

const handleSignUp = async () => {
  if (!username.value) {
    message.error('用户名不能为空');
    return;
  }
  if (!password.value) {
    message.error('密码不能为空');
    return;
  }
  if (!recheckPassword.value) {
    message.error('请再次确认密码');
    return;
  }
  if (password.value !== recheckPassword.value) {
    message.error('两次输入的密码不一致');
    return;
  }
  await registerApi(username.value, password.value)
  message.success(t('signup.success'))
};
</script>

<template>
  <SingleLayout>
    <template #content>
      <div class="flex flex-col items-center mx-8 mt-20">
        <!-- 标题 -->
        <h1 class="text-3xl md:text-5xl font-bold mb-2 text-primary">
          {{ t('signup.title') }} {{ t('productName') }}
        </h1>

        <!-- 注册表单 -->
        <div class="w-full max-w-md flex flex-col body-bg items-center justify-center mt-4 px-8 py-4 rounded-[10px] space-y-4">
          <p class="text-2xl font-bold text-secondary">
            {{ t('signup.label') }}
          </p>
          <!-- 输入框 -->
          <a-input
            v-model:value="username"
            type="text"
            :placeholder="t('signup.usernamePlaceholder')"
            class="w-full px-4 py-2 rounded-[10px] border-all custom-input"
          />
          <a-input-password
            v-model:value="password"
            type="password"
            :placeholder="t('signup.passwordPlaceholder')"
            class="w-full px-4 py-2 rounded-[10px] border-all custom-input"
          />
          <a-input-password
            v-model:value="recheckPassword"
            type="password"
            :placeholder="t('signup.recheckPlaceholder')"
            class="w-full px-4 py-2 rounded-[10px] border-all custom-input"
          />

          <!-- 记住我 -->
          <div class="w-full flex justify-start text-sm text-secondary mb-6 mx-2 px-2">
            <a-checkbox @change="remember">
              {{ t('signup.remember') }}
            </a-checkbox>
          </div>

          <!-- 注册按钮 -->
          <button
            class="w-[40%] py-2 font-bold rounded-[10px] border-none primary-button"
            @click="handleSignUp"
          >
            {{ t('signup.button') }}
          </button>

          <!-- 登录提示 -->
          <p class="text-center text-secondary mt-4 font-bold">
            {{ t('signup.signinLabel') }} <span class="primary underline-link" @click="gotoSignIn">{{ t('signup.signinButton') }}</span>
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
