<template>
  <div>
    <div
      class="flex flex-col items-center justify-center pt-6 mx-auto space-y-6 md:w-auto"
    >
      <div class="w-full">
        <NumberParcelsToPay />
      </div>

      <div class="w-full">
        <TextArea
          placeholder="En caso necessite de atendimento e/ou serviços especiais, informe aqui....."
        />
      </div>

      <div class="w-full">
        <CheckInput>
          <template #label>
            Declaro que li e aceito as
            <span class="underline decoration-solid">condiçoes de compra</span>
            e
            <span class="underline decoration-solid"
              >política de privacidade</span
            >
          </template>
        </CheckInput>
      </div>
    </div>
  </div>
</template>

<script setup>
import NumberParcelsToPay from '@/components/Check/NumberParcelsToPay.vue';
import TextArea from '@/components/FormUI/TextArea.vue';
import CheckInput from '@/components/FormUI/CheckInput.vue';
</script>

<style scoped></style>
