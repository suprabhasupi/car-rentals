<template>
  <div class="search-widget-wrapper">
    <div class="search-widget">
      <input type="text"
        autocomplete="off"
        name="location"
        placeholder="Location Name"
        v-model="searchInput"
        @input="findCars(searchInput)"
        @focus="findCars(searchInput)"
      />
      <i class="material-icons">arrow_drop_down</i>

      <div v-if="isAutoCompleteVisible && filteredLocation.length > 0" class="auto">
        <ul>
          <li v-for="(location, i) in filteredLocation"
            :key="i"
            @click="handleAutoCompleteSelection(location)"
            >
            {{location}}
          </li>
        </ul>
      </div>

      <input type="date"
        name="date-time"
        min="2019-06-16"
        v-model="startDate"
      />
      <button @click="handleSearchCar">Submit</button>

    </div>
  </div>
</template>

<script>
  import './search-widget.scss'

  import SearchWidget from './search-widget'
  export default SearchWidget
</script>