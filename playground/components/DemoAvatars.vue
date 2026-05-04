<template>
  <PUCard class="p-6 w-full flex flex-col items-start gap-8">
    <h2 class="text-lg font-semibold dark:text-white -mb-4">Avatar</h2>
    <div class="flex flex-wrap items-center gap-6">
      <PUAvatar size="sm" />
      <PUAvatar size="md" />
      <PUAvatar size="lg" />
      <div class="w-20 h-20">
        <PUAvatar size="full" />
      </div>
    </div>
    <div class="flex flex-wrap items-center gap-6">
      <PUAvatar rounded="none" />
      <PUAvatar rounded="sm" />
      <PUAvatar rounded="md" />
      <PUAvatar rounded="lg" />
      <PUAvatar rounded="xl" />
      <PUAvatar rounded="2xl" />
      <PUAvatar rounded="full" />
    </div>
    <div class="flex flex-wrap items-center gap-6">
      <PUAvatar
        label="AG"
        class="text-xl font-semibold bg-linear-to-r from-rose-500 to-rose-700 text-black"
      />
      <PUAvatar icon="ion:person" class="text-2xl" />
      <PUAvatar
        image="https://img.freepik.com/vector-gratis/avatar-personaje-empresario-aislado_24877-60111.jpg?semt=ais_incoming&w=740&q=80"
      />
    </div>
  </PUCard>
</template>
