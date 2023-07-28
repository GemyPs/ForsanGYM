<template>
  <div id="View">
    <page-title title="Player Info" icon="mdi mdi-account"/>
    <div class="row align-items-center flex-md-row-reverse">
      <div class="col-md-3 mb-3 mb-md-0">
        <div class="img mx-auto text-center">
          <div v-if="player.photo">

            <div class="rounded-circle user-img my-2" :style="`background-image:url(${playerPhoto})`" ></div>

<!--            <img-->
<!--              class="rounded-circle my-2"-->
<!--              :src="playerPhoto"-->
<!--              alt=""-->
<!--              style="width: 15rem; height:auto"-->
<!--            />-->
          </div>
          <div v-else>
            <div class="rounded-circle user-img my-2" style="background-image:url('/defaultPlayer.jpg')" ></div>

<!--            <img-->
<!--              class="rounded-circle my-2"-->
<!--              src='/defaultPlayer.jpg'-->
<!--              alt=""-->
<!--              style="width: 15rem; height:auto"-->
<!--            />-->

          </div>
        </div>

        <div class="d-flex actions  text-center my-1 mx-auto w-100">
          <button type="button" class="btn btn-dark mx-auto w-100" data-toggle="modal" data-target="#updatePhotoModal">Update Photo</button>
          <update-photo :player="player" :MEDIA_API="MEDIA_API"/>
        </div>

        <div class="d-flex actions  text-center my-1 mx-auto w-100">
          <button type="button" class="btn btn-warning mx-auto w-100" data-toggle="modal"
                  data-target="#staticBackdrop" >Edit
          </button>
          <edit />
          <!-- End of popup window -->
        </div>

        <div class="d-flex actions  text-center my-1 mx-auto w-100">
          <button type="button" class="btn btn-outline-primary mx-auto w-100" v-on:click="freeze()">Freeze
          </button>
        </div>

        <div class="d-flex actions  text-center my-1 mx-auto w-100">
          <button type="button" class="btn btn-outline-secondary mx-auto w-100" v-on:click="addInvite()">Invite
            Friend
          </button>
        </div>

      </div>
      <div class="col-md-9 text-break">
        <div class="tile">
          <div class="tile-title-w-btn">
            <h2 data-toggle="dropdown" class="title">
              <span class="mdi mdi-account-circle"></span>
              {{ player.name }}
            </h2>
          </div>
          <div class="tile-body">

            <div class="row mb-2">
              <div class="col-md-3">
                <h5 class="mb-0">
                  <span class="mb-0 mdi mdi-id-card"></span> ID
                </h5>
              </div>

              <div class="col-md-9">
                <h5 class="mb-0 font-weight-normal">{{ player.id }}</h5>
              </div>
            </div>

            <div class="row mb-2">
              <div class="col-md-3">
                <h5 class="mb-0">
                  <span class="mb-0 mdi mdi-phone"></span> Phone Number
                </h5>
              </div>

              <div class="col-md-9">
                <h5 class="mb-0 font-weight-normal">{{ player.phoneNumber }}</h5>
              </div>
            </div>

            <div class="row mb-2">
              <div class="col-md-3">
                <h5 class="mb-0">
                  <span class="mb-0 mdi mdi-barcode"></span> BarCode
                </h5>
              </div>

              <div class="col-md-9">
                <h5 class="mb-0 font-weight-normal">{{ player.barCode }}</h5>
              </div>
            </div>

            <div class="row mb-2">
              <div class="col-md-3">
                <h5 class="mb-0">
                  <span class="mb-0 mdi mdi-road"></span> Plan
                </h5>
              </div>

              <div class="col-md-9">
                <h5 class="mb-0 font-weight-normal" v-if="player.subscription.plan.id">
                  {{ player.subscription.plan.name }}</h5>
                <h5 class="mb-0 font-weight-normal" v-else style="color: #ea051c">Deleted Plan</h5>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-3">
                <h5 class="mb-0">
                  <span class="mb-0 mdi mdi-calendar"></span> BeginDate
                </h5>
              </div>
              <div class="col-md-9">
                <h5 class="mb-0 font-weight-normal">{{ player.subscription.beginDate }}</h5>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-3">
                <h5 class="mb-0">
                  <span class="mb-0 mdi mdi-calendar-remove-outline"></span> EndDate
                </h5>
              </div>
              <div class="col-md-9">
                <h5 class="mb-0 font-weight-normal">{{ player.subscription.endDate }}</h5>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-3">
                <h5 class="mb-0">
                  <span class="mb-0 mdi mdi-weight-kilogram"></span> Weight
                </h5>
              </div>
              <div class="col-md-9">
                <h5 class="mb-0 font-weight-normal">{{ playerWeights[playerWeights.length - 1].weight }}</h5>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-3">
                <h5 class="mb-0">
                  <span class="mb-0 mdi mdi-human-male-height-variant"></span> Height
                </h5>
              </div>
              <div class="col-md-9">
                <h5 class="mb-0 font-weight-normal">{{ player.height }}</h5>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-3">
                <h5 class="mb-0">
                  <span class="mb-0 mdi mdi-dumbbell"></span> Training Plan
                </h5>
              </div>
              <div class="col-md-7">
                <h5 class="mb-0 font-weight-normal" v-if="player.trainingPlan">
                  {{ player.trainingPlan }}
                  <br/>
                </h5>
                <h5 class="mb-0 font-weight-normal" v-else>
                  {{ player.name }} has no training plan.
                  <br/>
                </h5>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-3">
                <h5 class="mb-0">
                  <span class="mb-0 mdi mdi-food-apple"></span>Diet
                </h5>
              </div>

              <div class="col-md-7">
                <h5 class="mb-0 font-weight-normal" v-if="player.dietPlan">
                  {{ player.dietPlan }}
                  <br/>
                </h5>
                <h5 class="mb-0 font-weight-normal" v-else>
                  {{ player.name }} has no diet plan.
                  <br/>
                </h5>
              </div>
            </div>

            <div class="row mb-2">
              <div class="col-md-3">
                <h5 class="mb-0">
                  <span class="mb-0 mdi mdi-snowflake"></span> Freezing
                </h5>
              </div>
              <div class="col-md-9">
                <h5 class="mb-0 font-weight-normal" v-if="player.subscription.plan.id">
                  {{ player.subscription.plan.freezeDays }} ({{ player.subscription.plan.freezeDays - player.freeze }}
                  Left)</h5>
                <h5 class="mb-0 font-weight-normal" v-else style="color: #ea051c"> No freezing days (Deleted Plan)</h5>
              </div>
            </div>

            <div class="row mb-2">
              <div class="col-md-3">
                <h5 class="mb-0">
                  <span class="mb-0 mdi mdi-account-arrow-right"></span> Invitation
                </h5>
              </div>
              <div class="col-md-9">
                <h5 class="mb-0 font-weight-normal" v-if="player.subscription.plan.id">
                  {{ player.subscription.plan.invites }} ({{ player.subscription.plan.invites - player.invited }}
                  Left)</h5>
                <h5 class="mb-0 font-weight-normal" v-else style="color: #ea051c">No invites (Deleted Plan)</h5>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="row ">

      <div class="col-md-7">
        <PlayerSubscriptions :player-id="$route.params.id"/>
      </div>

      <div class="col-md-5">
        <WeightTable />
      </div>

    </div>
  </div>
</template>

<script>
import PageTitle from "../../components/layout/pageTitle";
import Edit from '../../components/players/edit.vue';
import WeightTable from "../../components/players/weightTable";
import moment from "moment/moment";
import Swal from "sweetalert2";
import PlayerSubscriptions from "../../components/players/playerSubscriptions"
import axios from "axios";
import UpdatePhoto from "../../components/players/updatePhoto";

export default {
  components: {UpdatePhoto, PlayerSubscriptions, WeightTable, PageTitle, Edit},
  async asyncData({route, $axios, store}) {

    try{
      // to avoid duplications
      const player = await $axios.$get('player/'+route.params.id)
      const playerWeights = await $axios.$get('playerWeight/allWeights/'+route.params.id+'?limit=10&page=1')
      const subscriptions = await $axios.$get('subscription/' + route.params.id + '?limit=10&page=1')
      await store.commit('editPlayer', player)
      await store.commit('setViewPlayer', player)
      await store.commit('setPlayerWeights', playerWeights)
      await store.commit('setPlayerSubscriptions', subscriptions)
    }catch(err){
      console.log("error form setting player or subscriptions pages/players/view : ")
      console.log(err)
    }
  },
  data(){
    return{
      MEDIA_API:process.env.MEDIA_API,
    }
  },
  methods: {
    freeze: function () {
      this.$swal.fire({
        title: "How many Days you want to freeze ? ",
        input: "text",
        icon: "question",
        iconColor: "#316aff",
        inputPlaceholder: `Enter a number from 1 to ${this.player.subscription.plan.freezeDays - this.player.freeze} `,
        showCancelButton: true
      }).then(res => {
        if (!res.isDismissed) {
          if (isNaN(Number(res.value)) || res.value === "") {
            // Validate the value is a number :D
            Swal.fire({
              icon: "error",
              title: "days must be a number"
            })
          } else {
            this.$axios.$post('player/freeze/' + this.player.id, {freezeDays: Number(res.value)}).then(() => {
              this.$axios.$post('subscription/updateDate/' + this.player.subscription.id, {
                beginDate: this.player.subscription.beginDate,
                endDate: moment(this.player.subscription.endDate).add(Number(res.value), 'day').format("YYYY-MM-DD")
              }).then(() => {
                this.$store.commit('editViewPlayer', {
                  ...this.player,
                  subscription: {
                    ...this.player.subscription,
                    endDate: moment(this.player.subscription.endDate).add(Number(res.value), 'day').format("YYYY-MM-DD")
                  },
                  freeze: this.player.freeze + Number(res.value)
                })
              }).catch(err => {
                this.$swal.fire({
                  title: `Freezing player Failed`,
                  icon: "error",
                  text: err.response.data.message
                })
              })
            }).catch(err => {
              this.$swal.fire({
                title: `Freezing player Failed`,
                icon: "error",
                text: err.response.data.message
              })
            })

          }

        }

      })

    },

    addInvite: function () {
      this.$swal.fire({
        title: `How many invitations you want to add ? `,
        icon: "question",
        input: 'text',
        inputPlaceholder: `Enter a number from 1 to ${this.player.subscription.plan.invites - this.player.invited} `,
        showCancelButton: true
      }).then(res => {
        if (!res.isDismissed) {
          if (isNaN(Number(res.value)) || res.value === "") {
            // Validate the value is a number :D
            Swal.fire({
              icon: "error",
              title: "invitations must be a number"
            })
          } else {
            this.$axios.$post('player/inviteFriend/' + this.player.id, {
              invites: Number(res.value)
            }).then(() => {
              this.$store.commit('editViewPlayer', {
                ...this.player,
                subscription: {
                  ...this.player.subscription,
                  endDate: moment(this.player.subscription.endDate).add(Number(res.value), 'day').format("YYYY-MM-DD")
                },
                invited: this.player.invited + Number(res.value)
              })
            }).catch(err => {
              this.$swal.fire({
                title: `Inviting a friend Faild`,
                icon: "error",
                text: err.response.data.message
              })
            })
          }
        }
      })
    },

  },
  computed: {
    player: function () {
      return this.$store.state.players.items[this.$store.state.players.viewPlayer]
    },
    playerPhoto: function (){
      return `${this.MEDIA_API}/photo/${this.player.photo}`
    },
    playerWeights:function (){
      return this.$store.state.playerWeights.items
    }

  },
};
</script>

<style>
.user-img{
  height: 15rem;
  width: 15rem;
  border-radius: 50%;
  margin:auto;
  background-size:cover ;
}
</style>
