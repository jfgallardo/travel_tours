<template>
  <div>
    <div class="flex flex-col items-center justify-center pt-6 mx-auto space-y-6 pb-72 w-1/2 md:w-auto ">
      <div class="w-full">
        <TextInput v-model="auth.dataBuy.homeState" label="Estado *" name="home-state" />
      </div>

      <div class="w-full">
        <TextInput v-model="auth.dataBuy.homeCity" label="Ciudade *" name="home-city" />
      </div>

      <div class="w-full">
        <NumberParcelsToPay />
      </div>

      <div class="w-full">
        <TextArea placeholder="En caso necessite de atendimento e/ou serviços especiais, informe aqui....." />
      </div>

      <div class="w-full">
        <CheckInput>
          <template #label>
            Declaro que li e aceito as <span class="underline decoration-solid">condiçoes de compra</span> e <span
              class="underline decoration-solid">política de privacidade</span>
          </template>
        </CheckInput>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import TextInput from '@/components/FormUI/TextInput.vue';
import NumberParcelsToPay from "@/components/Check/NumberParcelsToPay.vue";
import TextArea from "@/components/FormUI/TextArea.vue";
import CheckInput from "@/components/FormUI/CheckInput.vue";

const auth = useAuthStore();


</script>

<style scoped>

</style>
