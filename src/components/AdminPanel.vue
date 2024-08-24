<template>
  <div>
    <h2>投票項目管理</h2>
    <div>
      <input v-model="newItem" placeholder="新增投票項目">
      <button @click="addVotingItem">新增</button>
    </div>
    <ul>
      <li v-for="item in votingItems" :key="item.id">
        {{ item.name }}
        <button @click="deleteVotingItem(item.id)">刪除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const votingItems = ref([]);
    const newItem = ref('');

    const fetchVotingItems = async () => {
      const response = await axios.get('/api/voting-items');
      votingItems.value = response.data;
    };

    const addVotingItem = async () => {
      if (newItem.value.trim()) {
        await axios.post('/api/voting-items', { name: newItem.value });
        newItem.value = '';
        fetchVotingItems();
      }
    };

    const deleteVotingItem = async (id) => {
      await axios.delete(`/api/voting-items/${id}`);
      fetchVotingItems();
    };

    onMounted(() => {
      fetchVotingItems();
    });

    return {
      votingItems,
      newItem,
      addVotingItem,
      deleteVotingItem,
    };
  },
};
</script>
