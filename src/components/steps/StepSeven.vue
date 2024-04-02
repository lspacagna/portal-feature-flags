<script setup>
</script>

<script>
export default {
    props: ['state', 'files'],
    data() {
        return {
            allFiles: "",
        }
    },
    mounted() {
        this.allFiles = [...this.files]
        // console.log(this.allFiles)
        console.log(this.state.errorFiles)

        this.allFiles.forEach(element => {
            let obj = this.state.errorFiles.find(o => o.filename === element.name);

            if (obj !== undefined) {
                element['rejected'] = true;
                element['rejectedMessage'] = obj.message;
            }
        });

        console.log(this.allFiles)
    }
}
</script>

<template>
    <h1 id="file-icon" class="mb-5" :style="{ color: state.textColor }">
        <font-awesome-icon icon="file" />
    </h1>
    <div id="check-icon">
        <h1 class="display-3">
            <font-awesome-icon icon="check" :style="{ color: state.buttonColor }" />
        </h1>
    </div>

    <div id="complete">
        <div id="complete-table-container">
            <div class="table-responsive">
                <div>
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col" class="text-left">File</th>
                                <th scope="col" colspan="2">Status</th>
                            </tr>
                        </thead>
                        <tbody class="list">
                            <tr v-for="file in allFiles" :key="file.name">
                                <th scope="row" class="align-middle text-left file-col">
                                    <font-awesome-icon icon="file-image" v-if="file.type == 'application/pdf'" />
                                    <font-awesome-icon icon="file-pdf"
                                        v-if="file.type == 'image/jpeg' || file.type == 'image/png'" />
                                    <font-awesome-icon icon="file-pdf"
                                        v-if="file.type != 'image/jpeg' && file.type != 'image/png' && file.type != 'application/pdf'" />
                                    <span class="name mb-0 pl-2 text-sm"> {{ file.name }}</span>
                                </th>
                                <td class="status-icon">
                                    <div v-if="!file.rejected">
                                        <font-awesome-icon icon="check" class="text-success" />
                                    </div>
                                    <div v-if="file.rejected">
                                        <font-awesome-icon icon="triangle-exclamation" class='text-danger' />
                                    </div>
                                </td>
                                <td class="text-center status-icon enable-wrap">
                                    <div v-if="!file.rejected">
                                        complete
                                    </div>
                                    <div v-if="file.rejected">
                                        
                                        <div class="alert alert-danger mb-0" role="alert">
                                            {{ file.rejectedMessage }}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* .table-custom {
    border-collapse: collapse;
    display: table;
    background-color: transparent;
}

.table-custom .thead-light {
    display: table-header-group;
    vertical-align: middle;
    border-color: grey;
    border-top-color: grey;
    border-right-color: grey;
    border-bottom-color: grey;
    border-left-color: grey;
}

.table-custom .thead-light th {
    background-color: white;
    font-size: .65rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-bottom: 1px solid #e9ecef;
    white-space: nowrap;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
}

.table-custom tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}

.table-custom tbody th {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
} */

.enable-wrap {
    white-space: break-spaces;
}

#file-icon {
    font-size: 5em;
}

#check-icon {
    width: 50px;
    position: absolute;
    top: 100px;
    left: 310px;
}

.status-icon {
    vertical-align: middle;
}

.file-col {
    max-width: 375px;
    min-width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.name {
    font-weight: bold;
}

#complete-table-container {
    max-height: 400px;
    overflow: scroll;
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
    background-color: rgba(255, 255, 255, 0.61);
}

.status-icon {
    padding-right: 10px !important;
    padding-left: 0 !important;
}
</style>