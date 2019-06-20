<template>
  <div class="search-widget-wrapper">
    <div class="search-widget">
      <div class="location-input">
        <i class="material-icons location">location_on</i>
        <input type="text"
          autocomplete="off"
          name="location"
          placeholder="Location Name"
          v-model="searchInput"
          @input="findCars(searchInput)"
          @focus="findCars(searchInput)"
          @keydown.down="onArrowDown"
          @keydown.up="onArrowUp"
          @keyup.enter="filteredLocation.length > 0 ? handleAutoCompleteSelection(filteredLocation[arrowCounter]) : handleAutoCompleteSelection(searchInput[arrowCounter])"
        />
        <i class="material-icons arrow">arrow_drop_down</i>
      </div>

      <div v-if="isAutoCompleteVisible && filteredLocation.length > 0" class="auto">
        <ul>
          <li v-for="(location, i) in filteredLocation"
            :key="i"
            @click="handleAutoCompleteSelection(location)"
            :class="{ 'is-active': isSelected(i) }"
            :id="getId(i)"
            :aria-selected="isSelected(i)"
            >
            {{location}}
          </li>
        </ul>
      </div>

      <div class="location-input">
        <i class="material-icons calendar">calendar_today</i>
        <input type="date"
          name="date-time"
          :min="minDate"
          v-model="startDate"
        />
      </div>
      <button @click="handleSearchCar">Submit</button>

    </div>
    <div class="error" v-if="showError">{{errorMessage}}</div>
  </div>
</template>

<script>
  import './search-widget.scss'

  import SearchWidget from './search-widget'
  export default SearchWidget
</script>