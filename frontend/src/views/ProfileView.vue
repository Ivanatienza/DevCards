<template>
  <div class="max-w-3xl mx-auto py-10">

    <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 flex justify-center">

      <div class="w-full max-w-md">

        <!--Avatar-->
        <div class="flex flex-col items-center mb-10">

          <img
            :src="avatarPreview || auth.user?.avatar_url || '/default-avatar.png'"
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

        <form class="space-y-4">

          <div>
            <input
              v-model="form.name"
              type="text"
              :placeholder="t('name')"
              class="border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-full text-sm bg-transparent focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="errors.name" class="text-red-500 text-xs mt-1 text-center">
              {{ errors.name }}
            </p>
          </div>

          <div>
            <input
              v-model="form.surname"
              type="text"
              :placeholder="t('surname')"
              class="border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-full text-sm bg-transparent focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="errors.surname" class="text-red-500 text-xs mt-1 text-center">
              {{ errors.surname }}
            </p>
          </div>

          <div>
            <input
              v-model="form.email"
              type="email"
              :placeholder="t('email')"
              class="border border-gray-300 dark:border-gray-700 rounded-lg p-2 w-full text-sm bg-transparent focus:ring-2 focus:ring-blue-500"
            />
            <p v-if="errors.email" class="text-red-500 text-xs mt-1 text-center">
              {{ errors.email }}
            </p>
          </div>

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

import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import Button from "../components/UI/Button.vue";

const { t } = useI18n();
const auth = useAuthStore();
const router = useRouter();
const toast = useToast();

const avatarPreview = ref("");
const fileInput = ref(null);

const form = ref({
  name: "",
  surname: "",
  email: ""
});

const errors = ref({
  name: "",
  surname: "",
  email: ""
});

//Actualizar avatar usuario
watch(
  () => auth.user,
  (user) => {
    if (!user) return;

    form.value = {
      name: user.name || "",
      surname: user.surname || "",
      email: user.email || ""
    };
  },
  { immediate: true }
);

//Validación campos
const validateField = (field, value) => {
  if (!value) return "";

  if (field === "email") {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? "" : t("validationEmail");
  }

  if (value.length < 2) return "Mínimo 2 caracteres";

  return "";
};

watch(() => form.value.name, (v) => errors.value.name = validateField("name", v));
watch(() => form.value.surname, (v) => errors.value.surname = validateField("surname", v));
watch(() => form.value.email, (v) => errors.value.email = validateField("email", v));

//Comprobar tamaño avatar
const triggerFile = () => {
  fileInput.value?.click();
};

const handleAvatar = (event) => {
  try {
    const file = event.target.files[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error(t("avatarMaxSize"));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        avatarPreview.value = reader.result;

        auth.updateUser({
          ...auth.user,
          avatar_url: reader.result
        });

      } catch (e) {
        toast.error(t("toastProfileError"));
      }
    };

    reader.readAsDataURL(file);

  } catch (e) {
    toast.error(t("toastProfileError"));
  }
};

//Guardar perfil
const saveProfile = async () => {
  try {

   const hasRealErrors = Object.values(errors.value).some(
  (e) => e && e.length > 0
);

if (hasRealErrors) {
  toast.error(t("toastProfileError"));
  return;
}

    auth.updateUser({
      ...auth.user,
      ...form.value
    });

    toast.success(t("toastProfileUpdated"));

    router.push("/dashboard");

  } catch (e) {
    toast.error(t("toastProfileError"));
  }
};

</script>
