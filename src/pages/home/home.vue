<template>
  <div class="home-page">
     <div class="home">
      <h1>Self Drive Car Rental</h1>
      <SearchWidget :seleted-date="today" :min-date="today" />
     </div>
  </div>
</template>

<script>
  import './home.scss'

  import HomePage from './home'
  export default HomePage
</script>