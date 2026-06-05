<template>

  <div class="container-app py-6">

    <!-- Header -->
     <div class="relative flex items-center justify-center mb-6">

      <h1 class="text-2xl font-bold text-center">
        {{ $t("users") }}
      </h1>

    <button
      @click="openCreate"
      class="absolute right-0 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
    >
      {{ $t("createUser") }}
    </button>

  </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-10">
      {{ $t("loading") }}
    </div>

    <!-- Tabla de usuarios -->
    <div v-else class="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow">

      <table class="w-full">

        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th class="p-3 text-left">Avatar</th>
            <th class="p-3 text-left">{{ $t("name") }}</th>
            <th class="p-3 text-left">{{ $t("surname") }}</th>
            <th class="p-3 text-left">{{ $t("email") }}</th>
            <th class="p-3 text-left">{{ $t("role") }}</th>
            <th class="p-3 text-left">{{ $t("actions") }}</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-t dark:border-gray-700"
          >

            <td class="p-3">
              <img
                :src="user.avatar_url || '/avatar usuario.png'"
                alt="avatar"
                class="w-10 h-10 rounded-full object-cover"
                @error="(e) => e.target.src = '/avatar usuario.png'"
              />
            </td>

            <td class="p-3">{{ user.name }}</td>
            <td class="p-3">{{ user.surname }}</td>
            <td class="p-3">{{ user.email }}</td>

            <td class="p-3">
              <span
                class="px-2 py-1 rounded text-xs"
                :class="user.role === 'admin' ? 'bg-red-500 text-white' : 'bg-gray-300 dark:bg-gray-600'"
              >
                {{ user.role }}
              </span>
            </td>

            <td class="p-3">
              <div class="flex gap-3">
                <button @click="openEdit(user)" class="text-blue-500 hover:underline">
                  {{ $t("edit") }}
                </button>
                <button @click="removeUser(user.id)" class="text-red-500 hover:underline">
                  {{ $t("delete") }}
                </button>
              </div>
            </td>

          </tr>
        </tbody>

      </table>

    </div>

    <!-- Modal crear/editar usuario -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >

      <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-lg">

        <h2 class="text-2xl font-bold mb-4">
          {{ editingId ? $t("editUser") : $t("createUser") }}
        </h2>

        <form class="flex flex-col gap-4" @submit.prevent="saveUser">

          <div>
            <input v-model="form.name" type="text" :placeholder="$t('name')" class="input" />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>

          <div>
            <input v-model="form.surname" type="text" :placeholder="$t('surname')" class="input" />
            <p v-if="errors.surname" class="text-red-500 text-sm mt-1">{{ errors.surname }}</p>
          </div>

          <div>
            <input v-model="form.email" type="email" :placeholder="$t('email')" class="input" />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <div v-if="!editingId">
            <input v-model="form.password" type="password" :placeholder="$t('password')" class="input" />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>

          <input v-model="form.avatar_url" type="text" placeholder="https://..." class="input" />

          <select v-model="form.role" class="input">
            <option value="user">{{ $t("user") }}</option>
            <option value="admin">{{ $t("admin") }}</option>
          </select>

          <div class="flex gap-3 pt-2">
            <button
              type="submit"
              :disabled="saving"
              class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50"
            >
              {{ saving ? $t("loading") : (editingId ? $t("save") : $t("create")) }}
            </button>
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700"
            >
              {{ $t("cancel") }}
            </button>
          </div>

        </form>

      </div>

    </div>

  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";

import { required, isEmail, minLength } from "../utils/validators";

const toast = useToast();
const { t } = useI18n();

const users = ref([]);
const loading = ref(false);
const saving = ref(false);
const showModal = ref(false);
const editingId = ref(null);
const errors = ref({});

const form = ref({
  name: "",
  surname: "",
  email: "",
  password: "",
  avatar_url: "",
  role: "user"
});

/* =========================
   LOAD USERS
========================= */
const loadUsers = async () => {
  loading.value = true;

  try {
    const res = await getUsers();
    users.value = res.data?.data || [];

  } catch (err) {
    toast.error(t("toastUserError"));
  } finally {
    loading.value = false;
  }
};

/* =========================
   MODAL
========================= */
const openCreate = () => {
  editingId.value = null;
  errors.value = {};
  form.value = {
    name: "",
    surname: "",
    email: "",
    password: "",
    avatar_url: "",
    role: "user"
  };
  showModal.value = true;
};

const openEdit = (user) => {
  editingId.value = user.id;
  errors.value = {};

  form.value = {
    name: user.name || "",
    surname: user.surname || "",
    email: user.email || "",
    password: "",
    avatar_url: user.avatar_url || "",
    role: user.role || "user"
  };

  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingId.value = null;
  errors.value = {};

  form.value = {
    name: "",
    surname: "",
    email: "",
    password: "",
    avatar_url: "",
    role: "user"
  };
};

/* =========================
   VALIDATION
========================= */
const validate = () => {
  const e = {};

  e.name = required(form.value.name, t("validationRequired"));

  e.email =
    required(form.value.email, t("validationRequired")) ||
    isEmail(form.value.email, t("validationEmail"));

  if (!editingId.value) {
    e.password =
      required(form.value.password, t("validationRequired")) ||
      minLength(form.value.password, 6, t("validationPasswordMin"));
  }

  Object.keys(e).forEach(k => {
    if (!e[k]) delete e[k];
  });

  errors.value = e;
  return !Object.keys(e).length;
};

/* =========================
   SAVE USER
========================= */
const saveUser = async () => {
  if (!validate()) return;

  saving.value = true;

  try {
    const payload = {
      name: form.value.name,
      surname: form.value.surname,
      email: form.value.email,
      avatar_url: form.value.avatar_url,
      role: form.value.role
    };

    if (!editingId.value && form.value.password) {
      payload.password = form.value.password;
    }

    if (editingId.value) {
      await updateUser(editingId.value, payload);
      toast.success(t("toastUserUpdated"));
    } else {
      await createUser(payload);
      toast.success(t("toastUserCreated"));
    }

    closeModal();
    await loadUsers();

  } catch (err) {
    console.error(err);
    toast.error(t("toastUserError"));
  } finally {
    saving.value = false;
  }
};

/* =========================
   DELETE USER
========================= */
const removeUser = async (id) => {
  if (!confirm(t("confirmDeleteUser"))) return;

  try {
    await deleteUser(id);
    users.value = users.value.filter(u => u.id !== id);
    toast.success(t("toastUserDeleted"));
  } catch (err) {
    console.error(err);
    toast.error(t("toastUserError"));
  }
};

onMounted(loadUsers);
  
</script>
