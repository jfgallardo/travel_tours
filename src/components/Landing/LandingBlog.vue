<template>
  <div class="pb-20">
    <div class="container mx-auto px-4 relative blog">
      <div class="absolute top-0 left-0">
        <div class="flex items-center space-x-10">
          <div class="basis-2/5">
            <img
              src="@/assets/img/blog1.jpg"
              class="w-full object-cover blog-image"
            />
          </div>
          <div class="basis-2/5 flex flex-col space-y-10">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam nostrum quaerat odit corrupti iusto praesentium
              voluptatibus pariatur ad, libero commodi perferendis alias, nam
              nobis quod eligendi totam expedita temporibus quasi?
            </div>
            <div>
              <button class="float-right">
                Read full <i class="iconsax" icon-name="external-square"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute font-bold blog-text">Blog</div>

      <div class="absolute bottom-0 right-0">
        <div class="flex items-center space-x-5">
          <div class="basis-2/5 flex flex-col space-y-10">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam nostrum quaerat odit corrupti iusto praesentium
              voluptatibus pariatur ad, libero commodi perferendis alias, nam
              nobis quod eligendi totam expedita temporibus quasi?
            </div>
            <div>
              <button class="float-right">
                Read full <i class="iconsax" icon-name="external-square"></i>
              </button>
            </div>
          </div>
          <div class="basis-2/5">
            <img
              src="@/assets/img/blog2.jpg"
              class="w-full object-cover blog-image"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <p class="text-center font-bold text-5xl">
        Saiba mais sobre a cultura<br />para onde voce quer viajar
      </p>
      <div class="text-center mt-8">
        <button class="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1">
          Visite nosso blog
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.blog {
  height: 77rem;
  width: 70rem;
}

.blog-text {
  font-size: 22rem;
  line-height: 3;
  z-index: -1;
  top: 2rem;
  left: 5rem;
}

.blog-image {
  height: 30rem;
}
</style>
