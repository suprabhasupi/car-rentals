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
      type: '',
      order: '',
      transmission: '',
      fuelType: '',
      searchCarGroup: ''
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
      if (this.type) {
        filteredCars = this.sortByCarGroup(this.type, filteredCars)
      }
      if (this.searchCarGroup) {
        filteredCars = this.searchByCarGroup(this.searchCarGroup, filteredCars)
      }
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
        this.carAtLocation = Home.allNewCategory
      } else {
        Home.getFeaturedProducts().then(res => {
          let data = res.json()
          return Promise.resolve(data)
        })
        .then(data => {
          if (data) {
            Home.allNewCategory = data
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
    sortByCarGroup (type, filteredCars) {
      switch (type) {
        case 'hatchback':
          this.type = 'hatchback'
          return filteredCars.filter(i => i.car_Type.toLowerCase() === 'hatchback')

        case 'sedan':
          this.type = 'sedan'
          return filteredCars.filter(i => i.car_Type.toLowerCase() === 'sedan')

        case 'mini suv':
          this.type = 'mini suv'
          return filteredCars.filter(i => i.car_Type.toLowerCase() === 'mini suv')

        case 'suv':
          this.type = 'suv'
          return filteredCars.filter(i => i.car_Type.toLowerCase() === 'suv')

        default:
          console.error('invalid car type selected')
          return filteredCars
      }
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
    }
  },
  mounted () {
    this.location = this.$route.query.location
    this.startDate = this.$route.query.startDate
    this.init()
  }
}
