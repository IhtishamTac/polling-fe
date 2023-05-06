<script setup>
import NavComponent from "../components/NavComponent.vue";
</script>
<template>
  <NavComponent></NavComponent>
  <div class="container mt-5">
    <div class="row">
      <div class="col-3" >
        <div class="card">
          <div class="card-body">
            <div class="card-title" v-for="poll in polls" :key="poll.id">
              <h4>{{ poll.title }}</h4><hr>
              Deadline :
              <div class="badge bg-warning w-100 text-dark">
                {{ poll.deadline   }}
              </div>
            </div>
            <h5>Pilihan Anda :</h5><br>
            <div v-for="choice in polls.choices" :key="choice.id">
              <span>{{ choice.choices }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      polls: [],
      token: localStorage.getItem("access_token"),
    };
  },
  mounted() {
    const headers = {
      Authorization: "Bearer " + this.token,
    };
    axios
      .get("poll", { headers })
      .then((res) => {
        this.polls = res.data.data;
      })
      .catch((err) => {
        this.$swal({
          icon: "error",
          text: err,
        });
      });
  },
};
</script>
