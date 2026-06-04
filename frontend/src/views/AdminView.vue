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
