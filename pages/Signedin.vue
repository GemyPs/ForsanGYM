<template>
  <div id="Signedin">
    <page-title icon="mdi mdi-home" title='Dashboard'/>

    <div class="row mt-3">
      <div class="col-md-12">
        <div class="tile">
          <h3 class="text-center card-header">Signed in Players Table</h3>
          <div class="tile-body">
            <div class="table-responsive">
              <div
                id="sampleTable_wrapper"
                class="
                  dataTables_wrapper
                  container-fluid
                  dt-bootstrap4
                  no-footer
                "
              >
                <div class="row">
                  <div class="col-md-12">
                    <table
                      class="
                        table table-hover table-bordered
                        dataTable
                        no-footer
                        text-break
                      "
                      id="sampleTable"
                      role="grid"
                      aria-describedby="sampleTable_info"
                      style="width: 100%"
                    >
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th style="width: 20%">Name</th>
                        <th>PhoneNumber</th>
                        <th>Ended</th>
                      </tr>
                      </thead>
                      <tbody>
                      <!-- Start looping -->
                      <tr v-for="(item, index) in signedinPlayersData" :key="item.id">
                        <td>{{ (index + 1) + ((pageNumber-1)*10) }}</td>
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.phoneNumber }}</td>
                        <td>{{ item.ended }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
<!--                <paging :count="$store.state.players.count" per-page="10"  v-on:getDataAtPage="loadDataOfPage"/>-->

                <div class="row justify-content-start mx-1">
                  <client-only>
                  <paginate
                    :page-count="Math.ceil($store.state.signedinPlayers.count/10)"
                    :click-handler="loadDataOfPage"
                    :container-class="'pagination'"
                    :prev-class="'page-item'"
                    :prev-link-class="'page-link'"
                    :page-class="'page-item'"
                    :page-link-class="'page-link'"
                    :next-class="'page-item'"
                    :next-link-class="'page-link'"
                  ></paginate>
                  </client-only>
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
import Paging from "../components/paging";
export default {

  components: {Paging},
  data() {
    return {
      API_URL: process.env.API_URL,
      MEDIA_API:process.env.MEDIA_API,
      pageNumber:1
    }
  },
  async asyncData({$axios, store}){
    if(!store.state.signedinPlayers.isLoaded){
      try {
        const res = await $axios.$get('/player/SignedInPlayers?limit=10&page=1')
        await store.commit('setSignedInPlayers', res)
      } catch (err) {
        console.log('error on Players load (pages/players/SignedInPlayers) :')
        console.log(err)
      }
    }
  },
  methods: {
    loadDataOfPage: function (page){
      this.pageNumber = page
       this.$axios.$get('/player/SignedInPlayers?limit=10&page='+page).then(res=>{
          this.$store.commit('setSignedInPlayers', res)
      })
    },
  },
  computed: {
    signedinPlayersData: function () {
      return this.$store.state.signedinPlayers.items
    }
  }
}
</script>
