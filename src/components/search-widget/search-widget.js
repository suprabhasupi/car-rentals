export default {
  name: 'SearchWidget',
  components: {
  },
  data () {
    return {
      searchInput: '',
      isAutoCompleteVisible: false,
      filteredLocation: [],
      startDate: '',
      showError: false,
      errorMessage: '',
      arrowCounter: 0
    }
  },
  props: ['seletedDate', 'selectedLocation'],
  computed: {
    allLocation () {
      const {Home} = this.$store.state
      if (Home.allNewCategory) {
        let location = Home.allNewCategory.map(i => i.location)
        return Array.from(new Set(location))
      }
    }
  },
  methods: {
    findCars (query) {
      if (query && query.length === 0) {
        this.filteredLocation = []
        this.isAutoCompleteVisible = false
      } else {
        this.filteredLocation = this.allLocation.filter(loc => loc.toLowerCase().includes(query.toLowerCase()))
        this.isAutoCompleteVisible = true
      }
    },
    handleSearchCar () {
      this.isAutoCompleteVisible = false
      this.arrowCounter = 0
      if (!this.searchInput) {
        this.showError = true
        this.errorMessage = 'Please enter Location'
      } else if (!this.startDate) {
        this.showError = true
        this.errorMessage = 'Please enter Start Date'
      } else {
        this.$router.push({
          name: 'SearchResult',
          query: {
            startDate: this.startDate,
            location: this.searchInput
          }
        })
      }
    },
    handleAutoCompleteSelection (loc) {
      this.searchInput = loc
      this.isAutoCompleteVisible = false
    },
    onArrowDown (evt) {
      if (this.arrowCounter < this.searchInput.length - 1 || this.arrowCounter < this.filteredLocation.length - 1) {
        this.arrowCounter = this.arrowCounter + 1
        this.setActiveDescendent()
      }
    },
    onArrowUp (evt) {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
        this.setActiveDescendent()
      }
    },
    setActiveDescendent () {
      this.activedescendant = this.getId(this.arrowCounter)
    },
    getId (index) {
      return `result-option-${index}`
    },
    isSelected (i) {
      return i === this.arrowCounter
    }
  },
  mounted () {
    console.log('mointed called-->', this.seletedDate, this.selectedLocation)
    this.startDate = this.seletedDate
    this.searchInput = this.selectedLocation
  }
}
