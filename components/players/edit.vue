<template>
  <div id="editButton">
    <div
      class="modal fade"
      id="staticBackdrop"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Edit player info
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <div class="col-md-12">
              <div class="tile">
                <div class="tile-body">
                  <form>
                    <div class="form-group">
                      <label class="control-label"><i class="mdi mdi-account-circle"></i> Full name</label>
                      <input
                        class="form-control"
                        type="text"
                        v-bind:value="InputPlayer.name"
                        @input="InputPlayer.name = $event.target.value"
                      />
                    </div>
                    <div class="form-group">
                      <label class="control-label"><i class="mdi mdi-phone"></i> Phone Number</label>
                      <input
                        class="form-control"
                        type="tel"
                        v-bind:value="InputPlayer.phoneNumber"
                        @input="InputPlayer.phoneNumber = $event.target.value"
                      />
                    </div>
                    <div class="form-group">
                      <label class="control-label"><i class="mdi mdi-barcode"></i> Barcode</label>
                      <input
                        class="form-control"
                        type="text"
                        v-bind:value="InputPlayer.barCode"
                        @input="InputPlayer.barCode = $event.target.value"
                      />
                    </div>
                    <div class="form-group">
                      <label class="control-label"><i class="mdi mdi-human-male-height-variant"></i> Height</label>
                      <input
                        class="form-control"
                        type="text"
                        v-bind:value="InputPlayer.height"
                        @input="InputPlayer.height = $event.target.value"
                      />
                    </div>
                    <div class="form-group">
                      <label class="control-label"><i class="mdi mdi-calendar"></i> beginDate</label>
                      <input
                        class="form-control"
                        type="date"
                        v-bind:value="moment(InputPlayer.subscription.beginDate).format('yyyy-MM-DD')"
                        @input="InputPlayer.subscription.beginDate = $event.target.value"
                      />
                    </div>
                    <div class="form-group">
                      <label class="control-label"><i class="mdi mdi-calendar-remove"></i> endDate</label>
                      <input
                        class="form-control"
                        type="date"
                        v-bind:value="moment(InputPlayer.subscription.endDate).format('yyyy-MM-DD')"
                        @input="InputPlayer.subscription.endDate = $event.target.value"
                      />
                    </div>
                    <div class="form-group">
                      <label class="control-label"><i class="mdi mdi-dumbbell"></i> Player Training plan</label>
                      <textarea
                        class="form-control"
                        rows="4"
                        type="text"
                        v-bind:value="InputPlayer.trainingPlan"
                        @input="InputPlayer.trainingPlan = $event.target.value"
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label class="control-label"><i class="mdi mdi-food-apple"></i> Player Diet Plan</label>
                      <textarea
                        class="form-control"
                        rows="4"
                        type="text"
                        v-bind:value="InputPlayer.dietPlan"
                        @input="InputPlayer.dietPlan = $event.target.value"
                      ></textarea>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="save">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment/moment";

export default {
  data() {
    return {
      InputPlayer: {},
      originalDates: {
        beginDate: null,
        endDate: null
      },
      originalWeight: null
    }
  },
  methods: {
    moment: (args) => moment(args),
    save: function () {
      // we need to edit 2 things :
      // 1) player data
      // 2) begin and end date of the current sub
      let player = Object.assign({}, this.InputPlayer)
      player.subscription = Object.assign({}, this.InputPlayer.subscription)
      this.$axios.$post('/player/edit/' + player.id, player).then(() => {
        if (this.isDateEdited()) {
          this.$axios.$post('subscription/updateDate/' + player.subscription.id, {
            player_id: player.id,
            plan_id: player.subscription.plan.id,
            beginDate: player.subscription.beginDate,
            endDate: player.subscription.endDate,
            barCode: player.barCode
          })
          this.$store.commit('editLastPlayerSubscription', {
            beginDate: player.subscription.beginDate,
            endDate: player.subscription.endDate
          })
        }

        this.$store.commit('editPlayer', player)
        player = Object.assign({}, {})
        $(`#staticBackdrop`).modal('hide')
      }).catch(err => {
        console.log("Error is : ")
        console.log(err)
        this.$swal.fire({
          icon: "error",
          title: "An Error Occurred",
          text: err.response.data.message

        })

      })
    },

    isDateEdited: function () {// if date is edited it will return true , else will return false :D
      return this.InputPlayer.subscription.beginDate !== this.originalDates.beginDate ||
        this.InputPlayer.subscription.endDate !== this.originalDates.endDate;

    },
  },
  created() {
    this.InputPlayer = Object.assign({},this.$store.state.players.items[this.$store.state.players.viewPlayer])
    // all this assingment operations to avoid refrences
    this.InputPlayer.subscription = Object.assign({}, this.InputPlayer.subscription)
    this.InputPlayer.subscription.plan = Object.assign({}, this.InputPlayer.subscription.plan)

    // for validations ( to avoid making unuseful requests )
    this.originalDates.beginDate = this.InputPlayer.subscription.beginDate
    this.originalDates.endDate = this.InputPlayer.subscription.endDate

  }
};
</script>

<style>
</style>
