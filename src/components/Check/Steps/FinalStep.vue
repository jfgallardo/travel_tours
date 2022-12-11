<template>
  <div>
    <div
        class="flex flex-col items-center justify-center pt-6 mx-auto space-y-6 pb-72 xl:w-1/3 w-1/2 "
    >
      <div class="w-full">
        <TextInput
            v-model="userStore.user.birthday"
            label="Estado *"
            name="birthday"
        />
      </div>

      <div class="w-full">
        <TextInput
            v-model="userStore.user.birthday"
            label="Ciudade *"
            name="birthday"
        />
      </div>

      <div class="w-full">
        <NumberParcelsToPay/>
      </div>

      <div class="w-full">
        <TextArea placeholder="En caso necessite de atendimento e/ou serviços especiais, informe aqui....."/>
      </div>

      <div class="w-full">
        <CheckInput>
          <template #label>
            Declaro que li e aceito as <span class="underline decoration-solid">condiçoes de compra</span> e <span class="underline decoration-solid">política de privacidade</span>
          </template>
        </CheckInput>
      </div>

    </div>
  </div>
</template>

<script setup>
import {useUserStore} from '@/stores/user';
import TextInput from '@/components/FormUI/TextInput.vue';
import NumberParcelsToPay from "@/components/Check/NumberParcelsToPay.vue";
import TextArea from "@/components/FormUI/TextArea.vue";
import CheckInput from "@/components/FormUI/CheckInput.vue";

const userStore = useUserStore();


</script>

<style scoped>

</style>
