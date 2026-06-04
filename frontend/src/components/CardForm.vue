<template>

<div class="flex flex-col gap-4">

  <input
    v-model="title"
    type="text"
    :placeholder="$t('title')"
    class="border p-2 rounded dark:bg-gray-700 dark:text-white"
  />
  <p v-if="errors.title" class="text-red-500 text-sm">
    {{ errors.title }}
  </p>

  <textarea
    v-model="description"
    :placeholder="$t('description')"
    class="border p-2 rounded dark:bg-gray-700 dark:text-white"
  />
  <p v-if="errors.description" class="text-red-500 text-sm">
    {{ errors.description }}
  </p>

  <input
    v-model="documentation_url"
    type="url"
    :placeholder="$t('documentationUrl')"
    class="border p-2 rounded dark:bg-gray-700 dark:text-white"
  />
  <p v-if="errors.documentation_url" class="text-red-500 text-sm">
    {{ errors.documentation_url }}
  </p>

  <input
    v-model="logo_url"
    type="url"
    :placeholder="$t('logoUrl')"
    class="border p-2 rounded dark:bg-gray-700 dark:text-white"
  />

  <input
    v-model="tags"
    type="text"
    :placeholder="$t('tagsPlaceholder')"
    class="border p-2 rounded dark:bg-gray-700 dark:text-white"
  />
  <p v-if="errors.tags" class="text-red-500 text-sm">
    {{ errors.tags }}
  </p>

  <label class="flex gap-2 items-center">
    <input type="checkbox" v-model="is_public" />
    {{ $t('publicCard') }}
  </label>

  <!-- BOTONES -->
  <div class="flex justify-center gap-4 pt-4">

    <Button @click="submit">
      {{ $t("save") }}
    </Button>
    
    <Button variant="danger" @click="onCancel">
      {{ $t("cancel") }}
    </Button>

  </div>

</div>

</template>

<script setup>

import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import Button from "./UI/Button.vue";

const { t } = useI18n();

const props = defineProps({
  card: Object
});

const emit = defineEmits(["save", "cancel"]);

const title = ref("");
const description = ref("");
const documentation_url = ref("");
const logo_url = ref("");
const is_public = ref(false);
const tags = ref("");
const errors = ref({});

watch(
  () => props.card,
  (val) => {
    if (!val) {
      title.value = "";
      description.value = "";
      documentation_url.value = "";
      logo_url.value = "";
      is_public.value = false;
      tags.value = "";
      return;
    }

    title.value = val.title || "";
    description.value = val.description || "";
    documentation_url.value = val.documentation_url || "";
    logo_url.value = val.logo_url || "";
    is_public.value = !!val.is_public;
    tags.value = Array.isArray(val.tags)
      ? val.tags.join(", ")
      : (val.tags || "");
  },
  { immediate: true }
);

const validate = () => {
  errors.value = {};

  if (!title.value.trim()) {
    errors.value.title = t("validationRequired");
  }

  if (!description.value.trim()) {
    errors.value.description = t("validationRequired");
  }

  if (!documentation_url.value.trim()) {
    errors.value.documentation_url = t("validationRequired");
  } else if (!documentation_url.value.startsWith("http")) {
    errors.value.documentation_url = t("validationUrl");
  }

  const tagArray = tags.value
    .split(",")
    .map(t => t.trim().toLowerCase())
    .filter(Boolean);

  if (tagArray.length !== new Set(tagArray).size) {
    errors.value.tags = t("validationDuplicateTags");
  }

  return Object.keys(errors.value).length === 0;
};

const submit = () => {
  if (!validate()) return;

  const uniqueTags = [...new Set(
    tags.value
      .split(",")
      .map(t => t.trim().toLowerCase())
      .filter(Boolean)
  )];

  emit("save", {
    title: title.value,
    description: description.value,
    documentation_url: documentation_url.value,
    logo_url: logo_url.value,
    is_public: is_public.value ? 1 : 0,
    tags: uniqueTags
  });
};

const onCancel = () => {
  emit("cancel");
};

</script>
