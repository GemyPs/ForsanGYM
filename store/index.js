// export data that will be stored
import login from "../pages/auth/login";

export const state = () => ({
  plans: [],
  activities: [],
  signedinPlayers: {
    isLoaded:false,
    count:0,
    items: []
  },
  players: {
    isLoaded:false,
    viewPlayer:{},
    count:0,
    ActivePlayersCount:0,
    items: []
  },
  singnedPlayers: {
    count:0,
    items: []
  },
  services: {
    isLoaded:false,
    items: []
  },
  activityPlayers: {
    count:0,
    items:[]
  },
  servicesIncome: {
    isLoaded:false,
    items: []
  },
  subscriptionsIncome: {
    isLoaded:false,
    items: []
  },
  isActivityPlayerSubscriptionsIncomeLoaded: false,
  totalIncome: 0,
  activityPlayerSubscriptions: {
    count: 0,
    items: []
  },
  playerSubscriptions: {
    count: 0,
    isLoaded:false,
    items: []
  },
  playerWeights:{
    count:0,
    items:[]
  },
  outcome:{
    isLoaded:false,
    total:0,
    items:[]
  },
  admins:{
    isLoaded:false,
    items:[]
  },
})

export const mutations = {
  // Player Section --begin
  setPlayers: function (state, players) {
    state.players.items = players.items
    state.players.count = players.count
    state.players.isLoaded=true

  },
  setSignedInPlayers: function (state, players) {
    state.signedinPlayers.items = players.items
    state.signedinPlayers.count = players.count
    state.signedinPlayers.isLoaded=true
  },
  addPlayer: function (state, player) {
    if(state.players.items.length<10){
      state.players.items.push(player)
    }
    state.players.count++

  },
  editPlayer: function (state, player) {
    if(state.players.isLoaded){
      for (let i = 0; i < state.players.items.length; i++) {
        if (state.players.items[i].id === player.id) {
          state.players.items.splice(i, 1, player)
          break
        }
      }
    }else{
      state.players.items.push(player)
    }

  },
  setPlayerSubscriptions(state, subscriptions) {
    state.playerSubscriptions.items = subscriptions.items
    state.playerSubscriptions.count = subscriptions.count
  },
  editLastPlayerSubscription(state, subscription){
    const sub = state.playerSubscriptions.items[state.playerSubscriptions.items.length-1]
    sub.beginDate = subscription.beginDate
    sub.endDate = subscription.endDate
    state.playerSubscriptions.items.splice(state.playerSubscriptions.items.length-1, 1, sub)
  },
  setPlayersNumber(state, playerNumber){
    state.players.count = playerNumber
  },
  setActivePlayersNumber(state, playerNumber){
    state.players.ActivePlayersCount = playerNumber
  },
  deletePlayer: function (state, player_id) {
    state.players.items = state.players.items.filter(player => {
      return player.id !== player_id
    })
    state.players.count--
  },
  setViewPlayer(state, player){
    state.players.viewPlayer = state.players.items.findIndex(obj => obj.id ===player.id)
  },
  editViewPlayer(state, player){
    state.players.items.splice(state.players.viewPlayer, 1, player)
  },
  // Player Section --end
  setPlans: function (state, plans) {
    state.plans = plans
  },
  addPlan: function (state, plan) {
    state.plans.push(plan)
  },
  deletePlan: function (state, plan_id) {
    state.plans = state.plans.filter(plan => {
      return plan.id !== plan_id
    })
  },
  editPlan: function (state, plan){
    const planIndex = state.plans.findIndex(obj=> obj.id === plan.id)
    state.plans.splice(planIndex, 1, plan)
  },
  activatePlan(state, plan){
    plan.isActivated = true
  },
  deActivatePlan(state, plan){
    plan.isActivated = false
  },

  setActivityPlayers: function (state, activityPlayers) {
    state.activityPlayers.items = activityPlayers.items
    state.activityPlayers.count = activityPlayers.count
  },
  addActivityPlayerIncome: function (state, payedMoney){
    state.totalIncome += payedMoney
  },
  deleteActivityPlayer: function (state, activityPlayer_id) {
    state.activityPlayers.items = state.activityPlayers.items.filter(actPlayer => {
      return actPlayer.id !== activityPlayer_id
    })
  },
  SetActivities: function (state, newActivities) {
    state.activities = newActivities
  },
  addActivity: function (state, activity) {
    state.activities.push(activity)
  },
  deleteActivity: function (state, activity_id) {
    state.activities = state.activities.filter(activity => {
      return activity.id !== activity_id
    })
  },

  //  ActivityPlayers -- start

  addNewActivityPlayer: function (state, activityPlayer) {
    state.activityPlayers.items.push(activityPlayer)
    state.totalIncome += activityPlayer.subscription.price
  },
  editActivityPlayer: function (state, activityPlayer) {
    let holder = state.activityPlayers.items.findIndex((obj => obj.id === activityPlayer.id))
    state.activityPlayers.items[holder].name = activityPlayer.name
    state.activityPlayers.items[holder].phoneNumber = activityPlayer.phoneNumber
    state.activityPlayers.items[holder].id = activityPlayer.id
    state.activityPlayers.items[holder].subscription = activityPlayer.subscription
    state.totalIncome += activityPlayer.subscription.price
  },
  editActivityPlayerSubscriptions(state, subscription){
    // TODO
    let holder = state.s.items.findIndex((obj => obj.id === activityPlayer.id))
  },
  editActivity: function (state, act) {
    let objIndex = state.activities.findIndex((obj => obj.id === act.id))
    state.activities[objIndex].name = act.name
    state.activities[objIndex].coachName = act.coachName
    state.activities[objIndex].coachPhoneNumber = act.coachPhoneNumber
    state.activities[objIndex].price = act.price
    state.activities[objIndex].description = act.description
  },
  setAllActivityPlayersubscriptions: function (state, res) {
    state.activityPlayerSubscriptions.items = res.items
    state.activityPlayerSubscriptions.count = res.count
  },
  setActivityPlayerSubscriptionsIncome: function(state, todaysSubscriptions){
    for(let i = 0; i < todaysSubscriptions.length; ++i){
      state.totalIncome += todaysSubscriptions[i].price
    }
    state.isActivityPlayerSubscriptionsIncomeLoaded = true
  },
  // Activity Player -- End

  // Services Part :

  SetServices: function (state, services) {
    for(let i=0;i<services.length;i++){
      services[i].index = i
    }
    state.services.items = services
    state.services.isLoaded = true
  },
  AddService: function (state, service) {
    service.index = state.services.items.length
    state.services.items.push(service)
  },
  DeleteService: function (state, service) {
    for(let i=service.index+1, arr=state.services.items;i<arr.length;i++){
      arr[i].index--
    }
    state.services.items.splice(service.index, 1)
    //Update the table of income with DELETED Service
    for (let i = 0; i < state.servicesIncome.items.length; i++) {
      if (state.servicesIncome.items[i].service && service.id === state.servicesIncome.items[i].service.id ) {
        state.servicesIncome.items[i].serviceName = state.servicesIncome.items[i].serviceName + '(Deleted)'
        break
      }
    }
  },
  //Service end
  setServicesIncome: function (state, servicesIncome) {
    if(servicesIncome.length>0){
      state.servicesIncome.items = servicesIncome
      for (let i = 0; i < servicesIncome.length; i++) {
        if(!state.servicesIncome.items[i].service ){
          // deleted service
          state.servicesIncome.items[i].serviceName = state.servicesIncome.items[i].serviceName + '(Deleted)'
        } // updating total income
          state.totalIncome += (servicesIncome[i].soldItems * servicesIncome[i].payedMoney)
      }
    }
    state.servicesIncome.isLoaded = true
  },
  buyService: function (state, serviceIncome) {
    let objIndex = state.servicesIncome.items.findIndex((obj => obj.id === serviceIncome.id))
    if(objIndex!==-1){
      state.servicesIncome.items.splice(objIndex, 1, serviceIncome)
    }else{
      state.servicesIncome.items.push(serviceIncome)
    }
    state.totalIncome += (serviceIncome.payedMoney * serviceIncome.addQuantity)
  },
  setSubscriptionsIncome: function (state, todaySubscriptions) {

    state.subscriptionsIncome.items = todaySubscriptions
    state.subscriptionsIncome.isLoaded = true
  },
  addSubscriptionIncome: function (state, subscriptionIncome) {
    const subscription = state.subscriptionsIncome.items.find(sub=>sub.plan.id === subscriptionIncome.plan.id)
    subscription.numberOfSubscriptions++
    subscription.payedMoney += subscriptionIncome.payedMoney
    state.totalIncome += subscriptionIncome.payedMoney
  },

    // player weight area start

  setPlayerWeights: function (state, playerWeights){
    state.playerWeights.items = playerWeights.items
    state.playerWeights.count = playerWeights.count
  },

  addPlayerWeight: function (state, playerWeight) {
    if(state.playerWeights.items.length<10){
      delete playerWeight.player
      state.playerWeights.items.push(playerWeight)
      state.playerWeights.count++
    }
  },
  editViewPlayerWeight: function (state, playerWeight) {
    for(let i=0, arr =state.playerWeights.items;i<arr.length;i++){
      if(arr[i].id === playerWeight.id){
        arr.splice(i, 1, playerWeight)
        break;
      }
    }
  },
  // player weight area end

  // outcome area begin --

  setOutcome: function (state, outcomes){
    for(let i=0, arr=outcomes; i<arr.length;i++){
      arr[i].index = i
      state.outcome.total += arr[i].price
    }
    state.outcome.items = outcomes
    state.outcome.isLoaded = true
  },
  addOutcome: function (state, outcome){
    outcome.index = state.outcome.items.length
    state.outcome.total += outcome.price
    state.outcome.items.push(outcome)
  },
  deleteOutcome: function (state, outcome){
    for(let i=outcome.index+1, arr=state.outcome.items;i<arr.length;i++){
      arr[i].index--
    }
    state.outcome.total -= outcome.price
    state.outcome.items.splice(outcome.index, 1)
  },

  // outcome area end --

  // income area begin

  setTotalIncome: function (state){

    for(let i=0, arr= state.subscriptionsIncome.items;i<arr.length;i++){
      state.totalIncome += arr[i].payedMoney
    }
  },

  // income are begin

  //----------------------------------------------------------------------
  //Admins area begin --

  setAdmins: function (state, admins){
    state.admins.items = admins
    state.admins.isLoaded = true
  },
  addAdmin: function (state, admin){
    delete admin.password
    admin = {
      ...admin,
      index : state.admins.items.length
    }
    state.admins.items.push(admin)
  },
  editAdmin: function (state, admin){
    state.admins.items.splice(admin.index, 1, admin)
  },
  deleteAdmin: function (state, admin){
    for(let i=admin.index+1, arr=state.admins.items;i<arr.length;i++){
      arr[i].index--
    }
    state.admins.items.splice(admin.index, 1)
  }

  //Admins area begin --

}

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('storeDispatchFunc')
  },

  async storeDispatchFunc({ commit }) {

  },

}


