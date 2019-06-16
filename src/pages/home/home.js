import SearchWidget from '../../components/search-widget'

export default {
  name: 'HomePage',
  components: {
    SearchWidget
  },
  data () {
    return {
    }
  },
  computed: {
    allNewItems () {
      const {Home} = this.$store.state
      return Home.allNewCategory
    }
  },
  created () {
    this.getAllNewItems()
  },
  methods: {
    getAllNewItems () {
      const {Home} = this.$store.state
      Home.getFeaturedProducts().then(res => {
        let data = res.json()
        return Promise.resolve(data)
      })
      .then(data => {
        if (data) {
          Home.allNewCategory = data
        }
      })
    }
  }
}
