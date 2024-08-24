<template>
  <div>
    <!-- 投票項目的標題 -->
    <h2>Voting Items</h2>
    <!-- 使用 v-for 指令迭代顯示所有的投票項目 -->
    <ul>
      <li v-for="item in votingItems" :key="item.id">
        <!-- 顯示投票項目的標題和當前票數 -->
        {{ item.title }} - Votes: {{ item.voteCount }}
        <!-- 多選框，用於使用者選擇要投票的項目，使用 v-model 綁定 selectedItems 陣列 -->
        <input type="checkbox" v-model="selectedItems" :value="item.id">
      </li>
    </ul>
    <!-- 提交投票按鈕，點擊時調用 submitVotes 方法 -->
    <button @click="submitVotes">Vote</button>
  </div>
</template>

<script>
import axios from 'axios'; // 引入 Axios，用於處理 HTTP 請求

export default {
  data() {
    return {
      votingItems: [], // 存放從後端取得的投票項目數據
      selectedItems: [] // 存放使用者選擇的投票項目 ID
    };
  },
  mounted() {
    this.fetchVotingItems(); // 元件掛載時調用 fetchVotingItems 方法取得投票項目數據
  },
  methods: {
    // 非同步方法，用於從後端獲取所有投票項目和當前票數
    async fetchVotingItems() {
      try {
        // 通過 Axios 發送 GET 請求至後端的 /api/voting-items 端點
        const response = await axios.get('http://localhost:8080/api/voting-items');
        // 將回應數據（投票項目列表）存放到 votingItems 中
        this.votingItems = response.data;
      } catch (error) {
        // 捕捉並在控制台顯示請求錯誤信息
        console.error('Error fetching voting items:', error);
      }
    },
    // 非同步方法，用於提交使用者的投票選擇
    async submitVotes() {
      try {
        // 構造投票請求體，包括使用者 ID 和所選投票項目 ID 列表
        const voteRequest = {
          userId: 1, // 範例用戶 ID，實際使用時應替換為動態獲取的使用者 ID
          pollItemIds: this.selectedItems // 使用者選擇的投票項目 ID 陣列
        };
        // 通過 Axios 發送 POST 請求至後端的 /api/vote 端點
        await axios.post('http://localhost:8080/api/vote', voteRequest);
        // 顯示投票成功的提示
        alert('投票提交成功');
        // 重新獲取投票項目信息和票數，刷新頁面顯示
        this.fetchVotingItems();
      } catch (error) {
        // 捕捉並在控制台顯示請求錯誤信息
        console.error('Error submitting votes:', error);
      }
    }
  }
};
</script>
