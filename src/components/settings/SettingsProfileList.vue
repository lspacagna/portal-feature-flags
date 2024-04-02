<script>
export default {
    props: ['state'],
    data() {
        return {
            profiles: []
        }
    },
    watch: {
        state: {
            handler(newValue, oldValue) {
                this.loadProfiles();
            },
            deep: true
        }
    },
    emits: ["editProfile", "setProfile"],
    methods: {
        loadProfiles() {
            this.profiles = [];
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                let value = localStorage.getItem(key);

                if (key !== 'profile') {
                    this.profiles.push({
                        "name": key,
                        "config": JSON.parse(value)
                    })
                }
            }
        },
        setProfile(newProfile) {
            this.$emit("setProfile", newProfile)
        },
        editProfile(profile){
            console.log('edit profile')
            this.$emit("editProfile", profile)
        }
    },
    emits: ["setProfile"],
    mounted() {
        console.log('Loading profiles...')
        this.loadProfiles();
    }
}
</script>

<template>
    <div class="form-group">
        <div class="table-responsive">
            <div>
                <table class="table">
                    <tbody class="list">
                        <tr v-for="profile in this.profiles" :key="profile.name" :class="{ activeProfile: profile.name == this.state.profileName }">
                            <th scope="row" class="align-middle text-left file-col">
                                <span class="name mb-0 pl-2 text-sm"> {{ profile.name }}</span>
                            </th>
                            <td class="text-right">
                                <button class="btn btn-icon btn-primary btn-sm" type="button"
                                    v-if="profile.name != this.state.profileName" @click="setProfile(profile.name)">
                                    <span class="btn-inner--icon">
                                        <font-awesome-icon icon="hand-pointer" />
                                    </span>

                                    <span class="btn-inner--text">Use</span>
                                </button>
                                <button type="button" class="btn btn-success btn-sm" disabled
                                    v-if="profile.name == this.state.profileName">
                                    <span class="btn-inner--icon">
                                        <font-awesome-icon icon="check" />
                                    </span>
                                    Selected</button>
                                <button class="btn btn-icon btn-outline-primary btn-sm" type="button"
                                    v-if="profile.name != 'default'" @click="editProfile(profile.name)">
                                    <span class="btn-inner--icon">
                                        <font-awesome-icon icon="pen" />
                                    </span>
                                </button>
                                <button class="btn btn-icon btn-outline-primary btn-sm" type="button"
                                    v-if="profile.name == 'default'" disabled>
                                    <span class="btn-inner--icon">
                                        <font-awesome-icon icon="pen" />
                                    </span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style>
.table th,
.table td {
    border-top: 1px solid #e9ecef;
    border-bottom: 1px solid #e9ecef;
}


</style>

<style scoped>
    .activeProfile{
        margin-top: 5px;
    }
    
    /* .activeProfile td, .activeProfile th{
        background-color: #2cce8a80;
    }

    .activeProfile th{
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    .activeProfile td{
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    } */
</style>