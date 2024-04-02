<script>

export default {
    props: ['state', 'mode', 'ldFlag', 'timeout'],
    emits: ["setProfile"],
    data() {
        return {
            error: false,
            errorModalFile: '',
            errorModalMessage: '',
        }
    },
    methods: {
        setErrorState() {
            this.error = true;
        },
        setTextColor() {
            console.log('set text color')
            this.state.textColor = this.getContrast(this.state.bgColor, 'text')
        },
        removeErrorState() {
            this.error = false;
        },
        deleteClicked() {
            localStorage.removeItem(this.state.profileName)
            this.$emit("setProfile", 'default');
        },
        addErrorClicked() {
            console.log('Show new error modal')
            $('#newErrorModal').modal('show')
        },
        saveErrorClicked() {
            this.state.errorFiles.push({
                filename: this.errorModalFile,
                message: this.errorModalMessage
            })
            this.errorModalFile = ''
            this.errorModalMessage = ''
            $('#newErrorModal').modal('hide')
        },
        deleteErrorClicked(filename) {
            this.state.errorFiles = this.state.errorFiles.filter(function (obj) {
                return obj.filename !== filename;
            });
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
        }
    }
}
</script>

<template>
    <div class="form-group" :class="{ error: error }" v-if="this.mode == 'edit'">
        <label for="profile-name" class="form-control-label mr-1">Profile Name</label>
        <font-awesome-icon icon="triangle-exclamation" v-if="this.error" />
        <input type="text" class="form-control" id="profile-name" v-model="state.profileName"
            @keydown="removeErrorState">
    </div>
    
    <div class="form-group" :class="{ error: error }" v-if="this.mode == 'add'">
        <label for="profile-name" class="form-control-label mr-1">Profile Name</label>
        <font-awesome-icon icon="triangle-exclamation" v-if="this.error" />
        <input type="text" class="form-control" id="profile-name" v-model="state.profileNameNew"
            @keydown="removeErrorState">
    </div>

    <hr class="mb-1 mt-0">

    <div class="pb-0 pt-3">
        <h6 class="text-sm text-muted mt-0 mb-0">Design Settings</h6>
    </div>

    <div class="form-group pt-3">
        <label for="title" class="form-control-label">Title</label>
        <input type="text" class="form-control" id="title" v-model="state.title">
    </div>

    <div class="form-group ">
        <label for="bg-color" class="form-control-label">Form Background Color</label>
        <input type="color" class="form-control" id="bg-color" v-model="state.bgColor" @change="setTextColor">
    </div>

    <div class="form-group ">
        <label for="button-color" class="form-control-label">Button Color</label>
        <input type="color" class="form-control" id="button-color" v-model="state.buttonColor"
            @change="setBtnTextColor">
    </div>

    <div class="form-group ">
        <label for="logo-url" class="form-control-label">Logo URL</label>
        <input type="text" class="form-control" id="logo-url" v-model="state.logo">
    </div>

    <div class="form-group mb-3">
        <label class="form-control-label">Background Type</label>
        <div class="mt-1">
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="color-radio" class="custom-control-input" v-model="state.backgroundType"
                    value='color'>
                <label class="custom-control-label" for="color-radio">Color</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="image-radio" class="custom-control-input" v-model="state.backgroundType"
                    value='image'>
                <label class="custom-control-label" for="image-radio">Image</label>
            </div>
        </div>
    </div>

    <div class="form-group mb-2" v-if="state.backgroundType == 'image'">
        <label for="background-image" class="form-control-label">Background Image</label>
        <input type="text" class="form-control" id="background-image" v-model="state.backgroundImage">
    </div>

    <div class="form-group mb-2" v-if="state.backgroundType == 'color'">
        <label for="background-color" class="form-control-label">Background Color</label>
        <input type="color" class="form-control" id="background-color" v-model="state.pageBgColor">
    </div>

    <hr class="mb-1">

    <div class="pb-3 pt-2">
        <h6 class="text-sm text-muted mt-0 mb-3">Simulation Configurations</h6>
    </div>

    <!-- <div class="form-group" id="simulation-check">
        <input type="checkbox" class="custom-control-input" id="simulation" v-model="state.simulated">
        <label class="custom-control-label form-control-label" for="simulation">Simulated Processing</label>
    </div> -->

    <div class="form-group">
        <label for="step-timeout" class="form-control-label">Step Timeout (ms)</label>
        <input type="number" class="form-control" id="step-timeout" v-model="timeout">
    </div>

    <div v-if="ldFlag" class="form-group">
        <label for="rejectedFiles" class="form-control-label">Rejected files</label>
        <div class="table-responsive">
            <table class="table align-items-center mb-0">
                <thead>
                    <tr>
                        <th class="text-uppercase text-xxs font-weight-bolder opacity-7">Filename</th>
                        <th class="text-uppercase text-xxs font-weight-bolder opacity-7">Message</th>
                        <th class="text-center">
                            <button class="btn btn-icon btn-primary btn-sm" type="button" @click="addErrorClicked">
                                <span class="btn-inner--icon">
                                    <font-awesome-icon icon="plus" />
                                </span>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="errorFile in this.state.errorFiles">
                        <td>
                            <p class="text-xs font-weight-bold mb-0">{{ errorFile.filename }}</p>
                        </td>
                        <td>
                            <p class="text-xs font-weight-bold mb-0 error-message-col">{{ errorFile.message }}</p>
                        </td>
                        <td class="text-center">
                            <button class="btn btn-icon btn-sm btn-outline-warning" type="button"
                                @click="deleteErrorClicked(errorFile.filename)">
                                <span class="btn-inner--icon">
                                    <font-awesome-icon icon="trash" />
                                </span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <hr class="mb-3 mt-1" v-if="mode == 'edit'">

    <button class="btn btn-outline-warning btn-sm btn-block" v-if="mode == 'edit'" @click="deleteClicked">
        <font-awesome-icon icon="trash" />
        Delete {{ state.profileName }}
    </button>

    <!-- Modal -->
    <div class="modal fade" id="newErrorModal" tabindex="-1" role="dialog" aria-labelledby="newErrorModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="newErrorModalLabel">Add new file to reject</h5>
                    <button class="btn btn-icon btn-primary btn-sm" type="button" data-bs-dismiss="modal"
                        aria-label="Close">
                        <span class="btn-inner--icon">
                            <font-awesome-icon icon="xmark" />
                        </span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group mb-2">
                        <label for="background-image" class="form-control-label">Filename</label>
                        <input type="text" class="form-control" id="error-file" v-model="this.errorModalFile"
                            placeholder="error.jpg">
                    </div>
                    <p><small>Include filename and extension</small></p>
                    <div class="form-group mb-2">
                        <label for="background-image" class="form-control-label">Message</label>
                        <input type="text" class="form-control" id="error-message" v-model="this.errorModalMessage">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-gradient-secondary btn-sm"
                        data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-icon btn-success btn-sm" @click="saveErrorClicked">
                        <span class="btn-inner--icon">
                            <font-awesome-icon icon="floppy-disk" />
                        </span>
                        <span class="btn-inner--text">Save</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.error input,
.error input:focus {
    border: 1px solid red;
}

.error-message-col {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.error svg {
    color: red;
}
</style>

<style>
#simulation-check {
    padding-left: 30px;
}
</style>