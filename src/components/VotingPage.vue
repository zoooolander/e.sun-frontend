<template>
  <div>
    <h2>投票頁面</h2>
    <form @submit.prevent="submitVotes">
      <div v-for="item in votingItems" :key="item.id">
        <label>
          <input type="checkbox" :value="item.id" v-model="selectedItems">
          {{ item.name }} - 目前票數: {{ item.voteCount }}
        </label>
      </div>
      <button type="submit">投票</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const votingItems = ref([]);
    const selectedItems = ref([]);

    const fetchVotingItems = async () => {
      const response = await axios.get('/api/voting-items');
      votingItems.value = response.data;
    };

    const submitVotes = async () => {
      if (selectedItems.value.length > 0) {
        await axios.post('/api/vote', { items: selectedItems.value });
        selectedItems.value = [];
        fetchVotingItems();
      }
    };

    onMounted(() => {
      fetchVotingItems();
    });

    return {
      votingItems,
      selectedItems,
      submitVotes,
    };
  },
};
</script>
