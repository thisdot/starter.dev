<template>
  <section class="row q-col-gutter-lg q-px-md q-mt-md">
    <div class="col-3">
      <h6 class="text-weight-bold q-my-none">
        Count: <span name="text-count">{{ count }}</span>
      </h6>
    </div>
    <div class="col-3">
      <q-btn
        name="btn-increment"
        color="primary"
        unelevated
        @click="increment"
        >Increment</q-btn
      >
    </div>
    <div class="col-3">
      <q-btn
        name="btn-decrement"
        color="primary"
        unelevated
        @click="decrement"
        >Decrement</q-btn
      >
    </div>
    <div class="col-3">
      <q-btn name="btn-reset" color="primary" unelevated @click="reset"
        >Reset</q-btn
      >
    </div>

    <div class="col-12 text-center">
      <router-link class="text-primary" to="/">Return home</router-link>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'NumberCounter',
});
</script>

<script lang="ts" setup>
import gql from 'graphql-tag';
import { apolloClient, cache } from 'src/init/setupGraphQL';

const count = ref(0);

const query = gql`
  query Counter {
    count
  }
`;

const updateCount = async (value = 0) => {
  await apolloClient.writeQuery({
    query,
    data: {
      count: value
    }
  })

  console.log(value);


}

updateCount();

const data = apolloClient.readQuery({ query });



const increment = () => {

count.value++;

}

const decrement = () => {

count.value--;

}
const reset = () => {

count.value = 0;

}

</script>
