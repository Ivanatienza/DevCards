<template>
  <div class="max-w-3xl mx-auto py-10">

    <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 flex justify-center">

      <div class="w-full max-w-md">

        <!-- Avatar -->
        <div class="flex flex-col items-center mb-10">

          <img
            :src="avatarPreview || auth.user?.avatar_url || '/avatar-usuario.png'"
            class="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />

          <Button class="mt-4 w-auto px-6" @click="triggerFile">
            {{ t("changeAvatar") }}
          </Button>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleAvatar"
          />

        </div>

        <!-- Form -->
        <form class="space-y-4">

          <input
            v-model="form.name"
            type="text"
            :placeholder="t('name')"
            class="input"
          />

          <input
            v-model="form.surname"
            type="text"
            :placeholder="t('surname')"
            class="input"
          />

          <input
            v-model="form.email"
            type="email"
            :placeholder="t('email')"
            class="input"
          />

          <div class="flex justify-center pt-2">
            <Button class="w-auto px-8" @click="saveProfile">
              {{ t("save") }}
            </Button>
          </div>

        </form>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import api from "../services/api";
import Button from "../components/UI/Button.vue";

const { t } = useI18n();
const auth = useAuthStore();
const router = useRouter();
const toast = useToast();

const fileInput = ref(null);
const avatarPreview = ref("");

const form = ref({
  name: auth.user?.name || "",
  surname: auth.user?.surname || "",
  email: auth.user?.email || ""
});

/* =========================
   AVATAR (solo preview)
========================= */
const triggerFile = () => {
  fileInput.value?.click();
};

const handleAvatar = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    avatarPreview.value = reader.result;
  };

  reader.readAsDataURL(file);
};

/* =========================
   SAVE PROFILE
========================= */
const saveProfile = async () => {
  try {
    const payload = {
      name: form.value.name,
      surname: form.value.surname,
      email: form.value.email,
      avatar_url: avatarPreview.value || auth.user?.avatar_url
    };

    const res = await api.put("/users/profile", payload);

    // actualizar store con respuesta backend
    auth.updateUser(res.data);

    toast.success(t("toastProfileUpdated"));
    router.push("/dashboard");

  } catch (e) {
    toast.error(t("toastProfileError"));
  }
};
  
</script>