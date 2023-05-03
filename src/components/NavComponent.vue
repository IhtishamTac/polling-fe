<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
        <ul id="menuz" class="navbar-nav">
      <li class="nav-item"><a href="#" class="nav-link">
        <RouterLink to="/home" style="text-decoration:none; color: black;"><b>Home</b></RouterLink>
        </a></li>
      <li class="nav-item"><a href="#" class="nav-link" v-if="this.user.role === 'admin'">
        <RouterLink to="/poll" style="text-decoration:none; color: black;" >Poll</RouterLink>
        </a></li>
    </ul>
    </div>
    <div class="nav-nav">
        <a href="#" class="nav-link text-dark" style="font-size: 18px;" v-on:click.prevent="logout">Logout</a>
      </div>
  </nav>
  <br />
</template>

<style>
@import "../assets/nav.css";
</style>

<script>
import axios from "axios";
export default {
    data() {
        return {
            user: []
        }
    },
    mounted() {
        const access_token = localStorage.getItem("access_token");
          const headers = {
            "Content-Type": "aplication/json",
            Authorization: `Bearer ${access_token}`,
          };
        axios.post("/auth/me",{},{
            headers
        }).then((resp)=>{
            this.user = resp.data.user
        }).catch((err)=>{
            this.$swal({
                icon: "error",
                title: "Oops! Something went wrong",
                text: err.response.data.message,
            });
        })
        
    },
  methods: {
    async logout() {
      this.$swal({
        icon: "warning",
        title: "Alert",
        text: "Are you sure, want to logout?",
        showCancelButton: true,
        confirmButtonText: "Yes sir!",
      }).then((result) => {
        if (result.isConfirmed) {
          const access_token = localStorage.getItem("access_token");
          const headers = {
            "Content-Type": "aplication/json",
            Authorization: `Bearer ${access_token}`,
          };
          axios
            .post(
              "/auth/logout",
              {},
              {
                headers,
              }
            )
            .then(() => {
              console.log("Logout successful");
              localStorage.removeItem('access_token')
              this.$router.push("/login");
            })
            .catch((err) => {
              this.$swal({
                icon: "error",
                title: "Oops! Something went wrong",
                text: err.response.data.message,
              });
            });
        }
      });
    },
  },
};
</script>
