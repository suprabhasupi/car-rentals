/* @flow */
import SearchWidget from '../../components/search-widget'

export default {
  name: 'SearchResult',
  data () {
    return {
      allCarResult: [],
      carAtLocation: [],
      location: '',
      startDate: '',
      types: [],
      order: '',
      transmission: '',
      fuelType: '',
      searchCarGroup: '',
      paginationOffset: 0,
      resultsPerPage: 6,
      pageNumber: 0,
      pages: [],
      showMwebFilteredModule: false,
      showMwebResultModule: true,
      isLoading: true
    }
  },
  components: {
    SearchWidget
  },
  computed: {
    result () {
      let filteredCars = this.carAtLocation
      if (this.location) {
        filteredCars = this.filterByLocation(this.location, filteredCars)
      }
      if (this.startDate) {
        filteredCars = this.filterByDate(this.startDate, filteredCars)
      }
      if (this.fuelType) {
        filteredCars = this.sortByFuel(this.fuelType, filteredCars)
      }
      if (this.transmission) {
        filteredCars = this.sortByTransmission(this.transmission, filteredCars)
      }
      if (this.order) {
        filteredCars = this.sortByPrice(this.order, filteredCars)
      }
      if (this.types.length > 0) {
        filteredCars = this.sortByCarGroup(this.types, filteredCars)
      }
      if (this.searchCarGroup) {
        filteredCars = this.searchByCarGroup(this.searchCarGroup, filteredCars)
      }
      this.pages = Math.ceil(filteredCars.length / this.resultsPerPage)

      this.paginationOffset = this.pageNumber * this.resultsPerPage
      if (filteredCars.length < this.paginationOffset) {
        this.paginationOffset = 0
      }
      filteredCars = filteredCars.sort((a, b) => {
        return b.can_book - a.can_book
      })
      filteredCars = filteredCars.slice(this.paginationOffset, this.paginationOffset + this.resultsPerPage)
      return filteredCars
    }
  },
  watch: {
    '$route.query' () {
      this.location = this.$route.query.location
      this.startDate = this.$route.query.startDate
      // this.fuelType = ''
      // this.transmission = ''
      // this.order = ''
      // this.type = ''
      // this.searchByCarGroup = ''
      this.init()
    }
  },
  methods: {
    init () {
      const {Home} = this.$store.state
      if (Home.allNewCategory.length) {
        this.isLoading = false
        this.carAtLocation = Home.allNewCategory
      } else {
        Home.getFeaturedProducts().then(res => {
          let data = res.json()
          return Promise.resolve(data)
        })
        .then(data => {
          if (data) {
            Home.allNewCategory = data
            this.isLoading = false
            this.carAtLocation = data
            this.allCarResult = Home.allNewCategory
            this.carAtLocation = this.allCarResult
          }
        })
      }
    },
    filterByLocation (loc, filterByLocation) {
      return filterByLocation.filter(i => i.location.toLowerCase() === loc.toLowerCase())
    },
    convertDatetoDay (date) {
      let day = new Date(date)
      let weekday = new Array(7)
      weekday[0] = 'Sun'
      weekday[1] = 'Mon'
      weekday[2] = 'Tue'
      weekday[3] = 'Wed'
      weekday[4] = 'Thu'
      weekday[5] = 'Fri'
      weekday[6] = 'Sat'
      return weekday[day.getDay()]
    },
    filterByDate (date, filteredCars) {
      let day = this.convertDatetoDay(date)
      filteredCars.forEach(i => {
        i['can_book'] = i.availability.includes(day)
      })
      return filteredCars
    },
    sortByPrice (order, filteredCars) {
      if (order === 'ascending') {
        this.order = 'ascending'
        return filteredCars.sort((a, b) => a.price - b.price)
      } else {
        this.order = 'descending'
        return filteredCars.sort((a, b) => b.price - a.price)
      }
    },
    sortByCarGroup (types, filteredCars) {
      let result = []
      types.forEach(type => {
        let selectedCars = []
        switch (type) {
          case 'hatchback':
            this.type = 'hatchback'
            selectedCars = filteredCars.filter(i => i.car_Type.toLowerCase() === 'hatchback')
            break
          case 'sedan':
            this.type = 'sedan'
            selectedCars = filteredCars.filter(i => i.car_Type.toLowerCase() === 'sedan')
            break
          case 'mini suv':
            this.type = 'mini suv'
            selectedCars = filteredCars.filter(i => i.car_Type.toLowerCase() === 'mini suv')
            break
          case 'suv':
            this.type = 'suv'
            selectedCars = filteredCars.filter(i => i.car_Type.toLowerCase() === 'suv')
            break
          default:
            console.error('invalid car type selected')
            selectedCars = filteredCars
        }
        result = [...result, ...selectedCars]
      })
      console.log('returning car-->', result)
      return result
    },
    sortByTransmission (transmission, filteredCars) {
      switch (transmission) {
        case 'automatic':
          this.transmission = 'automatic'
          return filteredCars.filter(i => i.transmission.toLowerCase() === 'automatic')

        case 'manual':
          this.transmission = 'manual'
          return filteredCars.filter(i => i.transmission.toLowerCase() === 'manual')

        default:
          console.error('invalid transmission selected')
          return filteredCars
      }
    },
    sortByFuel (fuel, filteredCars) {
      switch (fuel) {
        case 'petrol':
          this.fuelType = 'petrol'
          return filteredCars.filter(i => i.fuel_Type.toLowerCase() === 'petrol')

        case 'diesel':
          this.fuelType = 'diesel'
          return filteredCars.filter(i => i.fuel_Type.toLowerCase() === 'diesel')

        default:
          console.error('invalid fuel type selected')
          return filteredCars
      }
    },
    searchByCarGroup (query, filteredCars) {
      return filteredCars.filter(i => i.name.toLowerCase().includes(query.toLowerCase()) || i.car_Type.toLowerCase().includes(query.toLowerCase()))
    },
    showFilteredModule () {
      this.showMwebFilteredModule = true
      this.showMwebResultModule = false
    },
    closeMwebFilteredModule () {
      this.showMwebFilteredModule = false
      this.showMwebResultModule = true
    },
    clearAllFilter () {
      this.type = ''
      this.order = ''
      this.transmission = ''
      this.fuelType = ''
      this.searchCarGroup = ''
    },
    handleCargroupSelection (type) {
      if (this.types.includes(type)) {
        this.types = this.types.filter(t => t !== type)
      } else {
        this.types.push(type)
      }
    }
  },
  mounted () {
    this.location = this.$route.query.location
    this.startDate = this.$route.query.startDate
    this.init()
  }
}
