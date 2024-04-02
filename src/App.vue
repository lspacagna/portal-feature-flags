<script setup>
import Card from './components/Card.vue'
import Settings from './components/Settings.vue'

// import * as bootstrap from "./assets/bootstrap.min.js";
// import * as bootstrapDrawer from "./assets/bootstrap-drawer.min.js";
// import * as argon from "./assets/argon.min.js";


// LD Setup
// import { useLDFlag, useLDReady } from 'launchdarkly-vue-client-sdk'

// const ldReady = useLDReady()
// const flagValue = useLDFlag('rejected-files', false)


</script>

<script>

export default {
  data() {
    return {
      state: {},
      defaults: {
        title: 'Document Upload Portal',
        bgColor: '#ffffff',
        pageBgColor: '#f7fafc',
        pageBgImage: 'none',
        backgroundType: 'color',
        backgroundImage: '../img/background/bg.jpg',
        textColor: '#32325d',
        btnTextColor: 'white',
        buttonColor: '#23579E',
        logo: '../img/logo/logo-instabase.png',
        simulated: true,
        stepTimeout: 5000,
        profileName: 'default',
        errorFiles: [
          {
            filename: '10.jpg',
            message: 'Classification error: unknown document type'
          },
          {
            filename: '9.jpg',
            message: 'Classification error: unknown document type'
          }
        ]
      },
      profile: null
    }
  },
  watch: {
    // // Listen for state changes
    // state: {
    //   handler(newValue, oldValue) {
    //     console.log('State changed, saving to Local Storage...')
    //     localStorage.default = JSON.stringify(newValue);
    //   },
    //   deep: true
    // }
    // Listen for state changes
    // profile: {
    //   handler(newValue, oldValue) {
    //     console.log('Profile changed to ' + this.profile)
    //   },
    //   deep: true
    // }
  },
  mounted() {
    // Entry point
    console.log('Loading configs...')

    console.log('Setting up LD')


    if (localStorage.profile) {
      // Get profile name
      let profile = JSON.parse(localStorage.profile);
      this.profile = profile.profile;
      this.state = JSON.parse(localStorage[this.profile]);
      console.log('Profile config found - setting ' + profile.profile)
    }
    else {
      // Profile not found, reset to defaults
      console.warn('Stored Profiles not found. Setting defaults...')
      localStorage.default = JSON.stringify(this.defaults);
      localStorage.profile = JSON.stringify({
        'profile': 'default'
      });
      this.state = JSON.parse(localStorage.default);
    }

    this.checkAccess()
  },
  methods: {
    setProfile(newProfile) {
      let currentProfile = JSON.parse(localStorage.profile);
      currentProfile.profile = newProfile
      localStorage.profile = JSON.stringify(currentProfile);
      this.state = JSON.parse(localStorage[newProfile]);
    },
    checkAccess(){
      console.log(window.location.hostname)
      console.log(Window.sessionStorage)
    }
  }
}
</script>

<template>
  
  <div id="page"
    :style="[state.backgroundType == 'image' ? { 'backgroundImage': 'url(' + state.backgroundImage + ')' } : { 'backgroundColor': state.pageBgColor }]">
    
    <Card :state="state"></Card>
    <Settings :state="state" @setProfile="setProfile"></Settings>
  </div>

</template>

<style>
@import './assets/base.css';
@import './assets/argon.css';
@import './assets/bootstrap-drawer.min.css';

ib-demo-upload/src/assets/ body {
  font-family: 'Open Sans';
}

[v-cloak] {
  display: none;
}

#app {
  min-height: 100vh;
  padding: 0;
  font-weight: normal;
}

#page {
  min-height: 100vh;
  padding: 0;
  background: red;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(255, 255, 255, 0.25);
  background-blend-mode: lighten;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

.btn:hover:disabled {
  transform: translateY(0px);
  box-shadow: none;
  cursor: auto;
}

.drawer {
  width: 420px;
}

.drawer-content {
  border-radius: 8px;
  margin: 10px;
  box-shadow: 0 50px 100px rgb(50 50 93 / 10%), 0 15px 35px rgb(50 50 93 / 15%), 0 5px 15px rgb(0 0 0 / 10%);
}

.drawer-backdrop.show {
  opacity: 0;
}

.drawer.drawer-left {
  border: none;
}



/* @media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
} */
</style>
