<template>
  <div id="addPlayer">
    <div class="row">
      <div class="accordion col-6" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button class="btn btn-info text-center col-12" type="button" data-toggle="collapse"
                      data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Add New Player
              </button>
            </h2>
          </div>
          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="tile">
                    <h3 class="tile-title card-header mb-4">Add new player</h3>
                    <div class="tile-body">
                      <form class="form-horizontal">
                        <div class="form-group row">
                          <label class="control-label col-md-3">Name</label>
                          <div class="col-md-8">
                            <input v-model="InputPlayer.name" class="form-control" type="text"
                                   placeholder="Enter full name">
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="control-label col-md-3">Phone</label>
                          <div class="col-md-8">
                            <input v-model="InputPlayer.phoneNumber"
                                   class="form-control col-md-8"
                                   type="tel" placeholder="Enter the phone number">
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="control-label col-md-3">BarCode</label>
                          <div class="col-md-8">
                            <input v-model="InputPlayer.barCode"
                                   class="form-control col-md-8"
                                   type="text" placeholder="Scan the card here">
                          </div>
                        </div>
                        <div class="form-group row">
                          <label class="control-label col-md-3">height</label>
                          <div class="col-md-8">
                            <input v-model="InputPlayer.height" class="form-control col-md-8"
                                   type="number" placeholder="Enter the player height">
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="control-label col-md-3">weight</label>
                          <div class="col-md-8">
                            <input v-model="InputPlayer.weight"
                                    class="form-control col-md-8"
                                   type="number" step="any" placeholder="Enter the player weight">
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="control-label col-md-3">Plan</label>
                          <div class="col-md-8">
                            <select @change="PickPlan($event.target.value)" class="form-control col-md-8"
                                    id="plansList">
                              <option :value="null" disabled selected>Choose a plan</option>
                              <option v-for="(plan, index) in activatedPlans" :value="index" :key="plan.id">{{ plan.name }}
                              </option>
                            </select>
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="control-label col-md-3">Price</label>
                          <div class="col-md-8">
                            <input v-model="InputPlayer.payedMoney"
                                    class="form-control col-md-8"
                                   type="number">
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="control-label col-md-3">Begin Date</label>
                          <div class="col-md-8">
                            <input v-model="InputPlayer.beginDate"
                                   class="form-control col-md-8"
                                   type="date">
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="control-label col-md-3">End Date</label>
                          <div class="col-md-8">
                            <input v-model="InputPlayer.endDate"
                                    class="form-control col-md-8"
                                   type="date">
                          </div>
                        </div>

                        <div class="form-group row">
                          <label class="control-label col-md-3">Photo</label>
                          <div class="col-md-8">
                            <input ref='UploadedFile' class="form-control" type="file" id="uploadPhoto">
                          </div>
                        </div>

                        <div class="form-group">
                          <label class="control-label">Player's Diet</label>
                          <textarea
                            class="form-control"
                            rows="4"
                            type="text"
                            v-model="InputPlayer.dietPlan"
                          ></textarea>
                        </div>

                        <div class="form-group">
                          <label class="control-label">Player's Training Plan</label>
                          <textarea
                            class="form-control"
                            rows="4"
                            type="text"
                            v-model="InputPlayer.trainingPlan"
                          ></textarea>
                        </div>

                      </form>
                    </div>
                    <div class="tile-footer">
                      <div class="row">
                        <div class="col-md-8 ">
                          <button v-on:click="addPlayer" class="btn btn-primary" type="button" data-toggle="collapse"
                                  data-target="#collapseOne">
                            <i class="mdi mdi-check-circle"></i>
                            Register
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment';
import axios from "axios";


export default {
  data() {
    return {
      InputPlayer: {
        name:null,
        phoneNumber:null,
        height:null,
        weight:null,
        plan:null,
        payedMoney:null,
        beginDate:null,
        endDate:null,
        dietPlan:null,
        trainingPlan:null
      },
      MEDIA_API:process.env.MEDIA_API,
    }
  },
  methods: {
    resetForm:function (){
      this.InputPlayer = Object.assign({}, {})
      this.InputPlayer = {
        name:null,
        phoneNumber:null,
        barCode:null,
        height:null,
        weight:null,
        plan:null,
        payedMoney:null,
        beginDate:null,
        endDate:null,
        dietPlan:null,
        trainingPlan:null
      }
      document.getElementById("uploadPhoto").value = ""
      document.getElementById('plansList').selectedIndex = 0

    },
    addPlayer: async function () {
      // this.isFormOk()
      // console.log(this.InputPlayer)
      //   this.resetForm()
      //   return
      let formData = new FormData()
      if (this.isFormOk()) {
        formData.append('file', this.$refs.UploadedFile.files[0])
        if(this.$refs.UploadedFile.files[0]){ // because photo is optional
          try{
           const photo =  await axios.post(`${this.MEDIA_API}/photo/upload?phone=${this.InputPlayer.phoneNumber}`, formData)
            this.InputPlayer.photo = photo.data.url
          }catch (err){
            this.$swal.fire("Error in upload photo", "error")
            console.log("Error in upload photo")
            console.log(err)
          }
        }
        try {
          const player = await this.$axios.$post('/player/new', this.InputPlayer);
          // player added then make subscribe request
          // subscribe request
          const sub = await this.$axios.$post('/subscription/new', {
            player_id: player.id,
            plan_id: this.InputPlayer.plan.id,
            beginDate: this.InputPlayer.beginDate,
            endDate: this.InputPlayer.endDate,
            payedMoney: Number(this.InputPlayer.payedMoney),
            creationDate: moment().format("yyyy-MM-DD")
          })

          let weights = await this.$axios.$post('playerWeight/new', {
            date: moment().format('yyyy-MM-DD'),
            weight: this.InputPlayer.weight,
            player_id: player.id
          })
          weights = [weights]
          // subscribe request is done
          const storePlayer = {
            // creating store object
            ...player,
            subscription: sub,
            weights: weights
          }
          await this.$store.commit('addPlayer', storePlayer)

          await this.$store.commit('addSubscriptionIncome', sub)
          this.$swal.fire({
            title:"Player Added Successfully",
            icon:'success'
          })
          this.resetForm()

        } catch (e) {
          if(this.$refs.UploadedFile.files[0])
            await axios.delete(`${this.MEDIA_API}/photo/delete/${this.InputPlayer.photo}`)
          this.$swal.fire({
            icon: 'error',
            title: "Adding Operation FAILED"
            //text: e.response.data.message
          })
          console.log(e)
          this.resetForm()
          return false;
        }
        // ....
      }
    },
    PickPlan: function (planIndex) {
      this.InputPlayer.plan = this.activatedPlans[planIndex]
      this.InputPlayer.beginDate = moment().format("yyyy-MM-DD")
      this.InputPlayer.endDate = moment().add( this.InputPlayer.plan.months,"months").format('yyyy-MM-DD')
      this.InputPlayer.payedMoney = this.InputPlayer.plan.price
    },
    isFormOk: function () {
      if(!this.InputPlayer.height){
        this.InputPlayer.height = "0"
      }
      if(!this.InputPlayer.weight){
        this.InputPlayer.weight = "0"
      }
      if(!this.InputPlayer.dietPlan){
        this.InputPlayer.dietPlan = "None"
      }
      if(!this.InputPlayer.trainingPlan){
        this.InputPlayer.trainingPlan = "None"
      }
      for (let i = 0, arr = Object.keys(this.InputPlayer); i < arr.length; i++) {
        if (!this.InputPlayer[arr[i]]) {
          this.$swal.fire({
            icon: "error",
            title: "Input Error",
            text: `${arr[i]} Should not be Empty`
          })
          return false
        }
      }
      return true
    }

  },
  computed: {
    activatedPlans: function () {
      return this.$store.state.plans.filter(plan => plan.isActivated)
    },
  }
}
</script>

<style>

</style>
