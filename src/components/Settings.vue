<script setup>
import SettingsProfileList from '../components/settings/SettingsProfileList.vue';
import SettingsProfileAdd from '../components/settings/SettingsProfileAdd.vue';

// LD Setup
import { useLDFlag } from 'launchdarkly-vue-client-sdk'
const flagValue = useLDFlag('rejected-files', false)
const defaultTimeout = useLDFlag('default-timeout', 30)

</script>

<script>
export default {
    props: ['state'],
    data() {
        return {
            title: 'Profiles',
            view: 'profiles'
        }
    },
    emits: ["setProfile"],
    methods: {
        setTextColor() {
            console.log('Background color changed - resetting text color')
            this.state.textColor = this.getContrast(this.state.bgColor, 'text')
        },
        setBtnTextColor() {
            console.log('Button color changed - resetting text color')
            this.state.btnTextColor = this.getContrast(this.state.buttonColor, 'button')
        },
        getContrast(hexcolor, type) {
            // If a leading # is provided, remove it
            if (hexcolor.slice(0, 1) === '#') {
                hexcolor = hexcolor.slice(1);
            }
            // If a three-character hexcode, make six-character
            if (hexcolor.length === 3) {
                hexcolor = hexcolor.split('').map(function (hex) {
                    return hex + hex;
                }).join('');
            }

            // Convert to RGB value
            var r = parseInt(hexcolor.substr(0, 2), 16);
            var g = parseInt(hexcolor.substr(2, 2), 16);
            var b = parseInt(hexcolor.substr(4, 2), 16);

            // Get YIQ ratio
            var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

            // Check contrast
            if (type == 'text') {
                return (yiq >= 128) ? '#32325d' : '#F8FAFC';
            }
            else {
                return (yiq >= 128) ? 'black' : 'white';
            }
        },
        addClicked() {
            this.title = 'Add Profile'
            this.view = 'add'
        },
        saveClicked(trigger) {
            if (this.state.profileNameNew == '') {
                console.log('No profile name')
                this.$refs.settingsProfileAdd.setErrorState();
            }
            else {
                console.log('Saving new profile...')
                this.state.profileName = this.state.profileNameNew
                this.state.profileNameNew = ''

                localStorage[this.state.profileName] = JSON.stringify(this.state);
                localStorage.profile = JSON.stringify({
                    'profile': this.state.profileName
                });
                this.title = 'Profiles';
                this.view = 'profiles';
            }

            if(trigger == 'modal'){
                $('#unsavedModal').modal('hide')
                $('#drawer-1').drawer('hide')
            }
        },
        setProfile(newProfile) {
            this.title = 'Profiles';
            this.view = 'profiles';
            this.$emit("setProfile", newProfile);
        },
        editProfile(profile) {
            this.title = 'Edit ' + profile;
            this.view = 'edit';
            this.$emit("setProfile", profile);
        },
        backClicked() {
            this.title = 'Profiles';
            this.view = 'profiles';
            this.$emit("setProfile", this.state.profileName);
        },
        discardEdits() {
            this.title = 'Profiles';
            this.view = 'profiles';
            this.$emit("setProfile", this.state.profileName);
            $('#drawer-1').drawer('hide')
        },
        exitSaveClicked(){
          if(this.view == 'add'){
            this.saveClicked('modal')
          }
          else{
            this.saveEditClicked('modal')
          }


          
        },
        saveEditClicked(trigger) {
            console.log('save edit');
            let newName = this.state.profileName;
            let oldName = JSON.parse(localStorage.profile).profile;

            // Update configs
            localStorage[this.state.profileName] = JSON.stringify(this.state);

            if (newName != oldName) {
                // Updated profile name
                console.log('Profile name updated')
                localStorage.profile = JSON.stringify({
                    'profile': this.state.profileName
                });
                localStorage.removeItem(oldName)

            }
            this.title = 'Profiles';
            this.view = 'profiles';

            if(trigger == 'modal'){
                $('#unsavedModal').modal('hide')
                $('#drawer-1').drawer('hide')
            }
        },
    },
    mounted() {
        let vm = this;

        vm.$nextTick(function () {
            $('#drawer-1').on('hide.bs.drawer', function (e) {
                console.log('Attempting to hide')

                let currentState = JSON.stringify(vm.state)
                let newState = localStorage[vm.state.profileName]

                if (currentState != newState) {
                    e.preventDefault()
                    $('#unsavedModal').modal('show')
                }
            })
        });



    }
    // components: { SettingsProfileAdd, SettingsProfileList }
}


</script>

<template>
    <div class="float-button">
        <a class="nav-link" href="#" role="button" data-toggle="drawer" aria-haspopup="true" aria-expanded="false"
            data-target="#drawer-1">
            <font-awesome-icon icon="gear" />
        </a>
    </div>

    <div class="drawer drawer-left slide " tabindex="-1" role="dialog" aria-labelledby="drawer-1-title"
        aria-hidden="true" id="drawer-1">
        <div class="drawer-content drawer-content-scrollable" role="document">
            <div class="drawer-header">
                <div class="row">
                    <div class="col-sm">
                        <h4 class="drawer-title pt-1" id="drawer-1-title">{{ title }}</h4>
                    </div>
                    <div class="col-sm text-right mr-3">
                        <button class="btn btn-icon btn-primary btn-sm" type="button" @click="addClicked"
                            v-if="view == 'profiles'">
                            <span class="btn-inner--icon">
                                <font-awesome-icon icon="plus" />
                            </span>
                            <span class="btn-inner--text">Add</span>
                        </button>
                        <button class="btn btn-icon btn-primary btn-sm" type="button" @click="backClicked"
                            v-if="view == 'add' || view == 'edit'">
                            <span class="btn-inner--icon">
                                <font-awesome-icon icon="chevron-left" />
                            </span>
                        </button>
                        <button class="btn btn-icon btn-success btn-sm" type="button" @click="saveClicked"
                            v-if="view == 'add'">
                            <span class="btn-inner--icon">
                                <font-awesome-icon icon="floppy-disk" />
                            </span>
                            <span class="btn-inner--text">Save</span>
                        </button>
                        <button class="btn btn-icon btn-success btn-sm" type="button" @click="saveEditClicked('form')"
                            v-if="view == 'edit'">
                            <span class="btn-inner--icon">
                                <font-awesome-icon icon="floppy-disk" />
                            </span>
                            <span class="btn-inner--text">Save</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="drawer-body">
                <SettingsProfileList :state="state" v-if="view == 'profiles'" @setProfile="setProfile"
                    @editProfile="editProfile" ref="settingsProfileList">
                </SettingsProfileList>
                <SettingsProfileAdd v-if="view == 'add' || view == 'edit'" :state="state" :mode="view" :ldFlag=flagValue :timeout=defaultTimeout
                    @setProfile="setProfile" ref="settingsProfileAdd">
                </SettingsProfileAdd>
            </div>
            <!-- <div class="drawer-footer" v-if="view == 'profiles'">
                <button class="btn btn-outline-warning btn-sm btn-block">
                    <font-awesome-icon icon="trash" />
                    Delete {{ state.profileName }}
                </button>
            </div> -->
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="unsavedModal" tabindex="-1" role="dialog" aria-labelledby="unsavedModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="modal-title-notification">Unsaved Edits</h6>
                </div>
                <div class="modal-body">
                    <div class="py-3 text-center">
                        <h1 class="display-1 text-danger"><font-awesome-icon icon="triangle-exclamation"/></h1>
                        
                        <h4 class="text-gradient text-danger mt-4">You have unsaved edits</h4>
                        <p>Are you sure you want discard your changes?</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-gradient-secondary btn-sm"
                        data-bs-dismiss="modal" @click="discardEdits">Discard Changes</button>
                    <button type="button" class="btn btn-icon btn-success btn-sm" @click="exitSaveClicked()">
                        <span class="btn-inner--icon">
                            <font-awesome-icon icon="floppy-disk" />
                        </span>
                        <span class="btn-inner--text">Save Edits</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.float-button {
    margin-left: 10px;
    position: absolute;
    bottom: 10px;
}
</style>