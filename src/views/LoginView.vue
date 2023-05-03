<style>
@import '../../src/assets/css/bootstrap.min.css';


body {
  font-family: Arial, Helvetica, sans-serif;
}
a{
    text-decoration: none;
}
.forgot{
    font-size: 13px;
}
</style>
<template>
  <main>
    <div class="container mt-5">
        <div class="row">
            <div class="col-4">

            </div>
            
      <div class="col-3 mt-5">
        <div class="card">
        <div class="card-body">
          <label for="username">Username :</label><br />
          <input type="text" name="username" class="form-control" v-model="username"/><br />
          <label for="password">Password :</label><br />
          <input type="password" name="password" class="form-control" v-model="password"/><br/>
          <button type="submit" class="btn btn-warning w-100" @click.prevent="login">Login</button>
          <div class="forgot"><br>
            Forgot Your Password?<a href="#"> Click Here.</a>
          </div>
        </div>
      </div>
      </div>
        </div>
    </div>
  </main>
</template>

<script setup>
import '../../src/assets/js/bootstrap.min.js';
</script>
<script>
import axios from "axios";
export default {
    data() {
        return {
            'username' : '',
            'password' : '',
        }
    },
    methods: {
        async login(){
            try{
                if(!this.username || !this.password){
                    this.$swal({
                        'icon': 'error',
                        'title': 'Please fill all fields...',
                    })
                }
                const res = await axios.post("/auth/login", {
                    username : this.username,
                    password : this.password,
                })
                if (res && res.status == 200){
                    console.log('Successfully logged in');
                    localStorage.setItem('access_token', res.data.access_token);
                    this.$router.push('/home')
                }
            }catch(err){
                this.$swal({
                    'icon': 'error',
                    'title': 'Oops..',
                    'text': err,
                })
            }
        }
    },
}
</script>
