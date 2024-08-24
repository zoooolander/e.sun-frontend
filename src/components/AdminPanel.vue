<template>
  <div>
    <!-- 投票項目管理標題 -->
    <h2>投票項目管理</h2>
    <div>
      <!-- 用於輸入新投票項目的文本框，透過 v-model 綁定 newItem -->
      <input v-model="newItem" placeholder="新增投票項目">
      <!-- 新增按鈕，點擊時調用 addVotingItem 方法 -->
      <button @click="addVotingItem">新增</button>
    </div>
    <!-- 迭代顯示所有的投票項目，並提供刪除功能 -->
    <ul>
      <li v-for="item in votingItems" :key="item.id">
        {{ item.name }}
        <!-- 刪除按鈕，點擊時調用 deleteVotingItem 方法 -->
        <button @click="deleteVotingItem(item.id)">刪除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'; // 從 Vue 中引入 ref 和 onMounted
import axios from 'axios'; // 引入 Axios，用於處理 HTTP 請求

export default {
  setup() {
    const votingItems = ref([]); // 用 ref 建立一個反應式變數來存放投票項目
    const newItem = ref(''); // 用 ref 建立一個反應式變數來存放新增的投票項目名稱

    // 非同步方法，從後端獲取所有投票項目
    const fetchVotingItems = async () => {
      const response = await axios.get('/api/voting-items');
      votingItems.value = response.data; // 將獲取的數據存放在 votingItems 中
    };

    // 非同步方法，新增一個投票項目
    const addVotingItem = async () => {
      if (newItem.value.trim()) { // 確保輸入框中有內容
        await axios.post('/api/voting-items', { name: newItem.value }); // 向後端發送 POST 請求，新增項目
        newItem.value = ''; // 清空輸入框
        fetchVotingItems(); // 重新獲取並更新投票項目列表
      }
    };

    // 非同步方法，刪除指定的投票項目
    const deleteVotingItem = async (id) => {
      await axios.delete(`/api/voting-items/${id}`); // 向後端發送 DELETE 請求，刪除指定項目
      fetchVotingItems(); // 重新獲取並更新投票項目列表
    };

    // 當元件掛載時，自動調用 fetchVotingItems 方法以獲取投票項目
    onMounted(() => {
      fetchVotingItems();
    });

    // 返回需要在模板中使用的變數和方法
    return {
      votingItems,
      newItem,
      addVotingItem,
      deleteVotingItem,
    };
  },
};
</script>
