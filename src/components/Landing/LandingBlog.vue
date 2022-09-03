<template>
  <div>
    <div class="container mx-auto px-4">

      <div class="md:flex md:items-center md:justify-around">
        <div class="md:basis-2/5">
          <img src="@/assets/img/blog1.jpg" class="w-full object-cover blog-image" />
        </div>
        <div class="space-y-4 mt-3 md:basis-2/5">
          <p class="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam nostrum quaerat odit corrupti iusto praesentium
            voluptatibus pariatur ad, libero commodi perferendis alias, nam
            nobis quod eligendi totam expedita temporibus quasi?
          </p>
          <div>
            <button class="float-right flex">
              Read full
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="ml-2">
                <path
                  d="M13.0014 11.7483C12.8114 11.7483 12.6214 11.6783 12.4714 11.5283C12.1814 11.2383 12.1814 10.7583 12.4714 10.4683L20.6714 2.26828C20.9614 1.97828 21.4414 1.97828 21.7314 2.26828C22.0214 2.55828 22.0214 3.03828 21.7314 3.32828L13.5314 11.5283C13.3814 11.6783 13.1914 11.7483 13.0014 11.7483Z"
                  fill="#292D32" />
                <path
                  d="M21.9992 7.55C21.5892 7.55 21.2492 7.21 21.2492 6.8V2.75H17.1992C16.7892 2.75 16.4492 2.41 16.4492 2C16.4492 1.59 16.7892 1.25 17.1992 1.25H21.9992C22.4092 1.25 22.7492 1.59 22.7492 2V6.8C22.7492 7.21 22.4092 7.55 21.9992 7.55Z"
                  fill="#292D32" />
                <path
                  d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                  fill="#292D32" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-start md:justify-center">
        <p class="font-semibold blogfontsize font-blog md:-mt-40 -mt-16">Blog</p>
      </div>

      <div class="md:flex md:flex-row-reverse md:items-center md:justify-around md:-mt-20 -mt-16">
        <div class="md:basis-2/5">
          <img src="@/assets/img/blog2.jpg" class="w-full object-cover blog-image" />
        </div>
        <div class="space-y-4 mt-3 md:basis-2/5">
          <p class="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Laboriosam nostrum quaerat odit corrupti iusto praesentium
            voluptatibus pariatur ad, libero commodi perferendis alias, nam
            nobis quod eligendi totam expedita temporibus quasi?
          </p>
          <div>
            <button class="float-right flex">
              Read full
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="ml-2">
                <path
                  d="M13.0014 11.7483C12.8114 11.7483 12.6214 11.6783 12.4714 11.5283C12.1814 11.2383 12.1814 10.7583 12.4714 10.4683L20.6714 2.26828C20.9614 1.97828 21.4414 1.97828 21.7314 2.26828C22.0214 2.55828 22.0214 3.03828 21.7314 3.32828L13.5314 11.5283C13.3814 11.6783 13.1914 11.7483 13.0014 11.7483Z"
                  fill="#292D32" />
                <path
                  d="M21.9992 7.55C21.5892 7.55 21.2492 7.21 21.2492 6.8V2.75H17.1992C16.7892 2.75 16.4492 2.41 16.4492 2C16.4492 1.59 16.7892 1.25 17.1992 1.25H21.9992C22.4092 1.25 22.7492 1.59 22.7492 2V6.8C22.7492 7.21 22.4092 7.55 21.9992 7.55Z"
                  fill="#292D32" />
                <path
                  d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z"
                  fill="#292D32" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-16 pb-10">
      <p class="text-center font-bold text-4xl">
        Saiba mais sobre a cultura<br />para onde voce quer viajar
      </p>
      <div class="text-center mt-8">
        <button class="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 text-2xl">
          Visite nosso blog
        </button>
      </div>
    </div>

  </div>
</template>

<script setup></script>

<style scoped>
.font-blog {
  font-size: 20rem;
  z-index: -1;
}

.blog-image {
  height: 30rem;
}

@media only screen and (max-width: 768px) {
  .font-blog {
    font-size: 12rem;
    z-index: -1
  }
}
</style>