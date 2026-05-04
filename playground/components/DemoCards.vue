<template>
  <div class="col-span-1 p-8 w-full flex flex-col items-start gap-8">
    <h2 class="text-lg font-semibold dark:text-white -mb-4">Card</h2>
    <PUCard
      :isBordered="false"
      customClass="relative h-95 w-full bg-white flex flex-col justify-end"
    >
      <img
        alt="Product image"
        class="absolute top-15 left-1/2 -translate-x-1/2 w-65 h-full object-contain object-top"
        src="https://dlcdnwebimgs.asus.com/files/media/0cb01c7f-25af-4e9b-b7da-3a9a8f5e7d31/v5/images/power-box.webp"
      />
      <div class="px-4 flex flex-col gap-2">
        <h2 class="text-xs uppercase font-semibold opacity-40">New</h2>
        <h1 class="text-xl font-bold">ASUS ROG Xbox Ally X</h1>
        <p class="text-sm">
          Powerful gaming handheld for console-quality gaming on the go.
        </p>
        <div class="flex items-end justify-between">
          <p class="mt-4 text-xl font-bold">$499.99</p>
          <PUButton
            color="ios"
            variant="default"
            label="Buy now"
            customClass="px-5 py-2.5"
          />
        </div>
      </div>
    </PUCard>
    <PUCard
      :isBordered="false"
      customClass="w-full min-h-70 bg-emerald-400 p-6 flex flex-col justify-between gap-3"
    >
      <div class="flex flex-col gap-3">
        <h2 class="text-xs uppercase font-semibold opacity-40">Strategy</h2>
        <h1 class="text-2xl font-bold">Money market fund</h1>
        <p class="text-sm">
          A money market fund is a type of mutual fund that invests in
          short-term debt securities, such as Treasury bills and commercial
          paper.
        </p>
      </div>
      <div
        class="flex items-center justify-between border-t border-black/10 pt-7"
      >
        <div class="flex flex-col">
          <p class="text-xs font-semibold">Return</p>
          <h2 class="text-3xl font-bold">3.5%</h2>
        </div>
        <PUButton
          isIconOnly
          icon="stash:arrow-right-solid"
          iconSize="25"
          customClass="bg-black text-white hover:brightness-110"
        />
      </div>
    </PUCard>
    <PUCard
      shadow="md"
      :isBordered="false"
      customClass="relative h-95 w-full bg-white flex flex-col justify-end"
    >
      <img
        alt="Product image"
        class="absolute inset-0 w-full h-full object-cover rounded-2xl"
        src="https://www.southernliving.com/thmb/uC9lfdB-vpeXk1XuxT12bII4EQc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1474089369-d2b0855436be4074ae986429058bf15c.jpg"
      />
      <div class="absolute inset-0 bg-black/40 rounded-2xl" />
      <div class="p-3 flex flex-col gap-2 z-10 text-white">
        <h2 class="text-xs uppercase font-semibold opacity-70">Travel</h2>
        <h1 class="text-4xl font-bold">Explore the world with us</h1>
        <p class="text-sm opacity-90">
          Discover new destinations, experience different cultures, and make
          unforgettable memories with our travel services.
        </p>
      </div>
    </PUCard>
    <PUCard
      customClass="min-h-100 w-full bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-end p-5"
    >
      <h1
        class="text-6xl text-center uppercase font-black text-white/60 backdrop-blur-sm stroked-text"
      >
        Liquid Glass
      </h1>
      <PUCard
        :isBordered="false"
        customClass="mt-2 h-100 w-full bg-white/60 backdrop-blur-2xl flex flex-col gap-4 border border-white/60 backdrop-saturate-150 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:to-white/0 before:pointer-events-none"
      >
        <PUCard
          shadow="none"
          :isBordered="false"
          customClass="relative mt-2 h-40 w-full bg-white/50 flex flex-col justify-end border border-white/90 overflow-hidden"
        >
          <div
            class="absolute -top-8 right-5 translate-x-1/2 w-40 h-32 bg-purple-500/25 rounded-full blur-[30px] pointer-events-none"
          />
          <img
            alt="Product image"
            class="absolute -top-8 right-5 translate-x-1/2 w-35 h-full object-contain object-top"
            src="https://framerusercontent.com/images/4aKiy891Evx73m4uRXiOoZULpc.png"
          />
          <div class="flex flex-col gap-1">
            <h1 class="font-bold text-2xl">Refer & Earn Money</h1>
            <p class="text-xs font-extralight opacity-40">
              For each friend that you invite
            </p>
          </div>
        </PUCard>
        <div class="px-2 flex flex-col gap-3">
          <h1 class="font-medium">How it works</h1>
          <div class="flex items-center gap-3">
            <Icon
              name="fluent:people-28-regular"
              size="50"
              class="opacity-80"
            />
            <p class="text-sm opacity-60">
              Share your unique referral link with friends.
            </p>
          </div>
          <div class="flex items-center gap-3">
            <Icon
              name="fluent:note-add-20-regular"
              size="80"
              class="opacity-80"
            />
            <p class="text-sm opacity-60">
              Your friend registers using your link and completes a purchase.
            </p>
          </div>
        </div>
      </PUCard>
    </PUCard>
  </div>
</template>

<style scoped>
.stroked-text {
  -webkit-text-stroke: 0.4px rgb(240, 240, 240);
  font-family: "Arial", sans-serif;
}
</style>
