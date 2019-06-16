export default {
  name: 'SearchWidget',
  components: {
  },
  data () {
    return {
      searchInput: '',
      isAutoCompleteVisible: false,
      filteredLocation: [],
      startDate: ''
    }
  },
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
      if (query.length === 0) {
        this.filteredLocation = []
        this.isAutoCompleteVisible = false
      } else {
        this.filteredLocation = this.allLocation.filter(loc => loc.toLowerCase().includes(query.toLowerCase()))
        this.isAutoCompleteVisible = true
      }
    },
    handleSearchCar () {
      this.isAutoCompleteVisible = false
      this.$router.push({
        name: 'SearchResult',
        query: {
          startDate: this.startDate,
          location: this.searchInput
        }
      })
    },
    handleAutoCompleteSelection (loc) {
      this.searchInput = loc
      this.isAutoCompleteVisible = false
    }
  }
}
