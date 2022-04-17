<template>
  <q-page class="row items-center justify-evenly">
    <p v-if="loading">fetching user from github...</p>
    <p v-else>
      {{ data.name }}
    </p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const USER_PROFILE_QUERY = gql`
      query ($username: String!) {
        user(login: $username) {
          status {
            emojiHTML
            message
            __typename
          }
          name
          login
          bio
          company
          avatarUrl
        }
      }
    `;

    const { result, loading } = useQuery(USER_PROFILE_QUERY, {
      username: 'hdjerry',
    });

    const data = useResult(result, [], ({ user }) => ({
      ...user,
    }));

    return { data, loading };
  },
});
</script>
