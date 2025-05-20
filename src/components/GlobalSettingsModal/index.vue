<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { useAppStore } from '@/store/app'
import { languageOptions } from '@/constants/language'
import { themeOptions } from '@/constants/theme'

const appStore = useAppStore()

const modalOpen = ref(false)
// 临时状态 - 用于记录打开弹窗时的状态
const initialState = ref({
  defaultCodingLang: appStore.defaultCodingLang,
  defaultResponseLang: appStore.defaultResponseLang,
  language: appStore.language,
  isDarkMode: appStore.isDarkMode,
})

// 表单数据 - 绑定到UI
const formData = ref({
  defaultCodingLang: appStore.defaultCodingLang,
  defaultResponseLang: appStore.defaultResponseLang,
  language: appStore.language,
  theme: appStore.isDarkMode ? 'dark' : 'light',
})

// 应用默认设置（store中的值）
const applyDefaultSettings = () => {
  appStore.setDefaultCodingLang(appStore.defaultCodingLang)
  appStore.setDefaultResponseLang(appStore.defaultResponseLang)
  appStore.setLanguage(appStore.language)
  appStore.setDarkMode(appStore.isDarkMode)
}

// 应用当前表单设置
const applyCurrentSettings = () => {
  appStore.setDefaultCodingLang(formData.value.defaultCodingLang)
  appStore.setDefaultResponseLang(formData.value.defaultResponseLang)
  appStore.setLanguage(formData.value.language)
  appStore.setDarkMode(formData.value.theme === 'dark')
}

// 重置 - 恢复到store中的默认状态
const handleReset = () => {
  // 重置为默认值
  appStore.resetToDefaults();

  // 更新表单显示
  formData.value = {
    defaultCodingLang: appStore.defaultCodingLang,
    defaultResponseLang: appStore.defaultResponseLang,
    language: appStore.language,
    theme: appStore.isDarkMode ? 'dark' : 'light',
  };
}

// 取消 - 恢复到打开弹窗时的状态
const handleCancel = () => {
  // 恢复到初始状态
  formData.value = {
    defaultCodingLang: initialState.value.defaultCodingLang,
    defaultResponseLang: initialState.value.defaultResponseLang,
    language: initialState.value.language,
    theme: initialState.value.isDarkMode ? 'dark' : 'light',
  }
  // 应用初始状态
  appStore.setDefaultCodingLang(initialState.value.defaultCodingLang)
  appStore.setDefaultResponseLang(initialState.value.defaultResponseLang)
  appStore.setLanguage(initialState.value.language)
  appStore.setDarkMode(initialState.value.isDarkMode)

  modalOpen.value = false
}

// 提交 - 保存设置
const handleSubmit = () => {
  message.success('设置保存成功')
  modalOpen.value = false
}

// 即时应用设置
const applyImmediately = () => {
  applyCurrentSettings()
}

// 暴露打开方法
const open = () => {
  // 保存当前状态到初始状态
  initialState.value = {
    defaultCodingLang: appStore.defaultCodingLang,
    defaultResponseLang: appStore.defaultResponseLang,
    language: appStore.language,
    isDarkMode: appStore.isDarkMode,
  }

  // 初始化表单数据
  formData.value = {
    defaultCodingLang: appStore.defaultCodingLang,
    defaultResponseLang: appStore.defaultResponseLang,
    language: appStore.language,
    theme: appStore.isDarkMode ? 'dark' : 'light',
  }

  modalOpen.value = true
}

defineExpose({ open })
</script>

<template>
  <a-modal v-model:open="modalOpen" title="全局设置" @cancel="handleCancel">
    <div class="p-4 space-y-6">
      <!-- 默认编程语言 -->
      <div class="flex justify-between items-center">
        <span class="text-primary">默认编程语言</span>
        <a-input
          v-model:value="formData.defaultCodingLang"
          placeholder="设置默认编程语言"
          style="width: 200px"
          @change="applyImmediately"
        />
      </div>

      <!-- 默认回答语种 -->
      <div class="flex justify-between items-center">
        <span class="text-primary">默认回答语种</span>
        <a-input
          v-model:value="formData.defaultResponseLang"
          placeholder="倾向于回答的自然语言"
          style="width: 200px"
          @change="applyImmediately"
        />
      </div>

      <!-- 页面显示语言 -->
      <div class="flex justify-between items-center">
        <span class="text-primary">页面显示语言</span>
        <a-select
          v-model:value="formData.language"
          style="width: 200px"
          @change="applyImmediately"
        >
          <a-select-option
            v-for="option in languageOptions"
            :key="option.key"
            :value="option.value"
          >
            {{ option.label }}
          </a-select-option>
        </a-select>
      </div>

      <!-- 外观主题 -->
      <div class="flex justify-between items-center">
        <span class="text-primary">外观主题</span>
        <a-select
          v-model:value="formData.theme"
          style="width: 200px"
          @change="applyImmediately"
        >
          <a-select-option
            v-for="option in themeOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </a-select-option>
        </a-select>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-2">
        <a-button @click="handleReset">
          重置
        </a-button>
        <a-button @click="handleCancel">
          取消
        </a-button>
        <a-button type="primary" @click="handleSubmit">
          保存
        </a-button>
      </div>
    </template>
  </a-modal>
</template>
