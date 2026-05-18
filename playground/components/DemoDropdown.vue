<template>
  <PUCard class="p-6 w-full flex flex-col items-start gap-8">
    <h2 class="text-lg font-semibold dark:text-white -mb-4">
      Dropdown
    </h2>

    <div class="w-full flex flex-col gap-3">
      <div
        class="text-black/60 dark:text-white/50 text-xs font-semibold uppercase tracking-[0.1em] border-b border-white/[0.06] pb-2.5"
      >
        Icon button activator
      </div>
      <div class="flex items-center gap-3">
        <PUDropdown menu-min-width="min-w-60">
          <template #activator>
            <PUButton
              size="md"
              is-icon-only
              icon="ion:printer"
              icon-size="18"
              rounded="lg"
              color="ios"
            />
          </template>
          <template #content>
            <div class="flex flex-col p-1">
              <PUButton
                size="md"
                color="default"
                variant="ghost"
                label="Print order details"
                class="w-full justify-start"
                start-icon="ion:bag-handle"
                icon-size="20"
              />
              <PUButton
                size="md"
                color="default"
                variant="ghost"
                label="Print manufacturing order"
                class="w-full justify-start"
                start-icon="ion:document-text"
                icon-size="20"
              />
            </div>
          </template>
        </PUDropdown>
      </div>
    </div>

    <div class="w-full flex flex-col gap-3">
      <div
        class="text-black/60 dark:text-white/50 text-xs font-semibold uppercase tracking-[0.1em] border-b border-white/[0.06] pb-2.5"
      >
        Labeled activator
      </div>
      <div class="flex items-center gap-3">
        <PUDropdown menu-min-width="min-w-52">
          <template #activator>
            <PUButton
              size="md"
              color="primary"
              variant="default"
              label="Actions"
              start-icon="ion:flash"
              icon-size="18"
              rounded="lg"
            />
          </template>
          <template #content>
            <div class="flex flex-col p-1">
              <PUButton
                size="md"
                color="default"
                variant="ghost"
                label="Edit"
                class="w-full justify-start"
                start-icon="ion:create-outline"
                icon-size="20"
              />
              <PUButton
                size="md"
                color="default"
                variant="ghost"
                label="Duplicate"
                class="w-full justify-start"
                start-icon="ion:copy-outline"
                icon-size="20"
              />
              <PUButton
                size="md"
                color="danger"
                variant="ghost"
                label="Delete"
                class="w-full justify-start"
                start-icon="ion:trash-outline"
                icon-size="20"
              />
            </div>
          </template>
        </PUDropdown>
      </div>
    </div>
  </PUCard>
</template>

<script setup lang="ts"></script>
