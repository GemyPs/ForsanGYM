<template>
  <div class="modal fade" id="resubscribeModal" tabindex="-1" aria-labelledby="resubscribeModalLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="resubscribeModalLabel">Resubscribe</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group row">
            <label class="control-label col-md-3">Plan</label>
            <div class="col-md-8">
              <select @change="PickPlan" v-model="pickedPlan" class="form-control col-md-8" id="plansList">
                <option selected :value="null" disabled>Choose a plan</option>
                <option v-for="plan in activePlans" :value="plan" :key="plan.id">{{ plan.name }}</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label class="control-label col-md-3">Price</label>
            <div class="col-md-8">
              <input v-bind:value="InputPlayer.payedMoney"
                     @input="InputPlayer.payedMoney = $event.target.value" class="form-control col-md-8"
                     type="number" placeholder="EGP">
            </div>
          </div>

          <div class="form-group row">
            <label class="control-label col-md-3">Begin Date</label>
            <div class="col-md-8">
              <input v-bind:value="InputPlayer.beginDate"
                     @input="InputPlayer.beginDate = $event.target.value" class="form-control col-md-8" type="date">
            </div>
          </div>

          <div class="form-group row">
            <label class="control-label col-md-3">End Date</label>
            <div class="col-md-8">
              <input v-bind:value="InputPlayer.endDate"
                     @input="InputPlayer.endDate = $event.target.value" class="form-control col-md-8" type="date">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click="subscribe">Save changes</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import moment from "moment/moment";

export default {
  name: "resubscribe",
  data() {
    return {
      pickedPlan: null,
      InputPlayer: {}
    }
  },
  props: {
    player: {},
    activePlans: []
  },
  methods: {
    PickPlan: function () {
      this.InputPlayer.beginDate = moment().format("YYYY-MM-DD")
      this.InputPlayer.endDate = moment().add(this.pickedPlan.months, 'month').format("YYYY-MM-DD")
      this.InputPlayer.payedMoney = this.pickedPlan.price
    },
    subscribe: function () {
      if (this.isEndedSubscription()) {
        this.$swal.fire({
          title: "Error",
          text: "This player subscription did not end yet",
          icon: "error"
        })
      } else {
        this.$axios.$post('subscription/new', {
          player_id: this.player.id,
          plan_id: this.pickedPlan.id,
          beginDate: this.InputPlayer.beginDate,
          endDate: this.InputPlayer.endDate,
          payedMoney:Number(this.InputPlayer.payedMoney),
          creationDate: moment().format("yyyy-MM-DD")
        }).then(res => {

          delete res.player
          this.$store.commit('addSubscriptionIncome', res)
          this.$store.commit('editPlayer', {
            ...this.player,
            subscription: {
              ...res
            },
            freeze: 0,
            invited: 0
          })
          $(`#resubscribeModal`).modal('hide')
        }).catch(err => {
          console.log("Error is : ")
          console.log(err)
          this.$swal.fire({
            icon: "error",
            title: "An Error Occurred",
            text: err.response.data.message

          })
        })
      }
    },
    isEndedSubscription: function () {
      return moment(this.player.subscription.endDate).isAfter(moment())
    }
  },
}
</script>

<style scoped>

</style>
