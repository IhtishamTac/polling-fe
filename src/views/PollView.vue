<script setup>
import NavComponent from "../components/NavComponent.vue";
</script>
<template>
  <NavComponent></NavComponent>
  <div class="container mt-3">
    <button
      class="btn btn-secondary mb-4"
      style="width: 145px"
      data-bs-toggle="modal"
      data-bs-target="#modalAddPoll"
    >
      Add Poll
    </button>
    <div class="modal fade" id="modalAddPoll">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Add Poll</h2>
          </div>
          <div class="modal-body">
            <label for="title">Title : </label>
            <input
              type="text"
              class="form-control"
              name="title"
              v-model="pollData.title"
            />
            <label for="desc">Descriptions : </label>
            <textarea
              class="form-control"
              style="resize: none"
              name="desc"
              v-model="pollData.description"
            ></textarea>
            <label for="deadline">Deadline :</label>
            <input
              type="date"
              name="deadline"
              class="form-control"
              v-model="pollData.deadline"
            />
            <label for="choices">Choices : </label>
            <div
              class="d-flex"
              v-for="(choice, id) in pollData.choices"
              :key="id"
            >
              <input
                type="text"
                class="form-control"
                v-model="pollData.choices[id]"
              />
              
              <button
                class="btn btn-danger"
                @click="pollData.choices.pop()"
                v-if="id == pollData.choices.length - 1 && id > 0"
              >
                Remove
              </button>
            </div>
            <button
                class="btn btn-warning w-100"
                @click="pollData.choices.push('')"
              >
                Add
              </button>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="addPoll">Add Poll</button>
            <button
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              id="cancelz"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Title</th>
              <th scope="col">Descriptions</th>
              <th scope="col">Choices</th>
              <th scope="col">Deadline</th>
              <th scope="col" class="actions">Action</th>
            </tr>
          </thead>
          <tbody v-for="poll in polls" :key="poll.id">
            <tr>
              <th scope="row">{{ poll.id }}</th>
              <td>{{ poll.title }}</td>
              <td>{{ poll.description }}</td>
              <td>
                <div v-for="choices in poll.choices" :key="choices.id">
                  {{ choices.choices + ", " }}
                </div>
              </td>
              <td>{{ poll.deadline }}</td>
              <td class="actions-button">
                <button
                  class="btn btn-danger"
                  @click.prevent="deletePoll(poll.id)"
                >
                  Delete
                </button>
                <button
                  class="btn btn-warning"
                  @click.prevent="detailPoll(poll.id)"
                  data-bs-toggle="modal"
                  data-bs-target="#modalDetail"
                >
                  Details
                </button>
                <div class="modal fade" id="modalDetail">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-body">
                        <label for="titles">Title <b>:</b> <p><b>{{ detailPollData.title }}</b></p></label><br>
                        <label for="description">Description <b>:</b><p><b>{{ detailPollData.description }}</b></p></label><br>
                        <label for="deadline">Deadline <b>:</b><br>
                            <div class="badge" :class="{
                                'bg-warning': new Date(detailPollData.deadline) > new Date(),
                                'text-dark': new Date(detailPollData.deadline) > new Date(),
                                'bg-danger': new Date(detailPollData.deadline) < new Date(),
                            }"><b>{{ detailPollData.deadline }}</b></div>
                        </label><br>
                        <label for="choice">Choices <b>:</b></label><br>
                        <div class="">
                            <div class="" v-for="choice in detailPollData.choices" :key="choice.id" >
                                <span><b>{{ choice.choices + ', '}}</b></span>
                            </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
.actions {
  text-align: right;
}
.actions-button {
  text-align: right;
}
.modal-body{
  text-align: left;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      polls: [],
      token: localStorage.getItem("access_token"),
      pollData: {
        title: "",
        description: "",
        deadline: "",
        choices: [""],
      },
      detailPollData: {
        title: "",
        description: "",
        deadline: "",
        choices: [],
      },
    };
  },
  mounted() {
    const headers = {
      Authorization: "Bearer " + this.token,
    };
    axios
      .get("poll", {
        headers,
      })
      .then((res) => {
        this.polls = res.data.data;
      })
      .catch((err) => {
        this.$swal({
          icon: "error",
          title: "Oopss!",
          text: err,
        });
      });
  },
  methods: {
    deletePoll(id) {
      this.$swal({
        icon: "warning",
        title: "Are You Sure?",
        showCancelButton: true,
        confirmButtonText: "Sure!",
      })
        .then((result) => {
          if (result.isConfirmed) {
            const headers = {
              Authorization: "Bearer " + this.token,
            };
            axios
              .delete("poll/" + id, { headers })
              .then((res) => {
                this.polls.splice(this.polls.indexOf(id - 1), 1);
                this.$swal({
                  icon: "success",
                  text: res.data.message,
                });
              })
              .catch((err) => {
                this.$swal({
                  icon: "error",
                  text: err.data.message,
                });
              });
          }
        })
        .catch((err) => {
          this.$swal({
            icon: "error",
            text: err.data.message,
          });
        });
    },
    async addPoll() {
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      await axios
        .post(
          "poll",
          {
            ...this.pollData,
          },
          { headers }
        )
        .then(() => {
          this.$router.push("/poll");
          document.getElementById("cancelz").click();
          this.pollData = {};
          this.pollData.choices = [""];
        })
        .catch((err) => {
          this.$swal({
            icon: "error",
            text: err,
          });
        });
    },
    detailPoll(id) {
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      axios
        .get("poll/" + id, { headers })
        .then((res) => {
          this.detailPollData = res.data.data;
        })
        .catch((err) => {
          this.$swal({
            icon: "error",
            text: err,
          });
        });
    },
  },
};
</script>
