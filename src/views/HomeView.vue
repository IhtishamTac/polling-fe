<script setup>
import NavComponent from "../components/NavComponent.vue";
</script>
<template>
  <NavComponent></NavComponent>
  <div class="container mt-5">
    <div class="row">
      <div class="col-3" v-for="poll in polls" :key="poll.id">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h4>{{ poll.title }}</h4>
              <hr />
              Deadline :
              <div class="badge bg-warning w-100 text-dark">
                {{ poll.deadline }}
              </div>
              <h5>Pilihan Anda :</h5>
              <br />
              <div class="" v-for="choice in poll.choices" :key="choice.id">
                <input
                  type="radio"
                  name="choices"
                  :value="choice.id"
                  @click="vote(poll.id, choice.id)"
                />
                <span
                  ><b>{{ choice.choices + ", " }}</b></span
                ><br />
                <span
                  class="badge bg-secondary"
                  :style="{ width: (choice.percentage || 0) + '%' }"
                >
                  {{ choice.percentage || 0 }} %</span
                >
              </div>
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
  computed: {
    UserId() {
      return localStorage.getItem("user_id");
    },
  },
  methods: {
    async vote(poll_id, choice_id) {
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      await axios
        .post(`poll/${poll_id}/vote/${choice_id}`, {}, { headers })
        .then(() => {
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
        })
        .catch((err) => {
          this.$swal({
            icon: "warning",
            text: err.response.data.message,
          });
        });
    },
  },
};
</script>
