<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
        <ul id="menuz" class="navbar-nav">
      <li class="nav-item"><a href="#" class="nav-link">
        <RouterLink to="/" style="text-decoration:none; color: black;"><b>Home</b></RouterLink>
        </a></li>
      <li class="nav-item"><a href="#" class="nav-link" v-if="this.user.role === 'admin'">
        <RouterLink to="/poll" style="text-decoration:none; color: black;" >Poll</RouterLink>
        </a></li>
        <li data-bs-target="#success" data-bs-toggle="modal"><a href="#"  style="text-decoration:none; color: black;" >Tes</a></li>
        <div class="modal fade" id="success">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">

              </div>
            <div class="modal-body">
              <h1 style="text-align: center;" class="badge bg-danger w-100">Error</h1>
              <p style="text-align: center;">An Error Occured! Please Contact Admin</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-primary" data-bs-dismiss="modal" >Ok</button>
            </div>
          </div>
          </div>
        </div>
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
