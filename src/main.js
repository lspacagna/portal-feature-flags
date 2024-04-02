import { createApp } from 'vue'
import App from './App.vue'
import BootstrapVue3 from 'bootstrap-vue-3'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear, faArrowUp, faMagicWandSparkles, faFile, faMagnifyingGlass, faEye, faArrowsSplitUpAndLeft, faBrain, faCheck, faCode, faCircle, faSpinner, faFilePdf, faFileImage, faPen, faBoltLightning, faPlus, faFloppyDisk, faHandPointer, faChevronLeft, faTriangleExclamation, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { LDPlugin } from 'launchdarkly-vue-client-sdk'

library.add(faGear, faArrowUp, faMagicWandSparkles, faFile, faMagnifyingGlass, faEye, faArrowsSplitUpAndLeft, faBrain, faCheck, faCode, faCircle, faSpinner, faFilePdf, faFileImage, faPen, faBoltLightning, faPlus, faFloppyDisk, faHandPointer, faChevronLeft, faTriangleExclamation, faTrash, faXmark) 

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(BootstrapVue3).use(LDPlugin, {
    clientSideID: '65fd88afd911060f0a42b53f',
    context: { kind: 'user', key: 'example-user' },
  }).mount('#app')