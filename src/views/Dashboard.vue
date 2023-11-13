<script setup>
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import ReferralsService from '@/service/ReferralsService';

const filters1 = ref(null);
const loading1 = ref(null);
const referrals = ref(null);
const categories = ref(null);
const referralsService = new ReferralsService();
const selectedRecord = ref(null);
const recordDialog = ref(false);
const dt = ref(null);

const viewRecord = (record) => {
    selectedRecord.value = { ...record };
    console.log(selectedRecord);
    recordDialog.value = true;
};

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        category: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        address1: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        address2: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        city: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        zip: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
    };
};
const clearFilter1 = () => {
    initFilters1();
};
const referralsTotal = (category) => {
    let total = 0;
    console.log(category);
    if (referrals.value) {
        for (let referral of referrals.value) {
            // console.log(rec);
            if (referral.category === category) {
                total++;
            }
        }
    }
    return total;
};
const { isDarkTheme } = useLayout();

const lineOptions = ref(null);
onBeforeMount(() => {
    initFilters1();
});
onMounted(() => {
    loading1.value = false;

    referralsService.getReferralDataFetch().then((data) => {
        referrals.value = data;
        let set1 = new Set();
        let arr1 = [];
        data.forEach((rec) => {
            set1.add(rec.category);
        });
        set1.forEach((rec) => {
            let obj = {};
            obj.category = rec;
            arr1.push(obj);
        });
        categories.value = arr1;
        console.log(arr1);
    });
    initFilters1();
});
const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};

const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};

watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Filter Menu New</h5>
                <DataTable
                    ref="dt"
                    :value="referrals"
                    v-model:selection="selectedRecord"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
                    :loading="loading1"
                    :filters="filters1"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                    responsiveLayout="scroll"                    
                >
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2" @click="clearFilter1()" />
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%" />
                            </span>
                        </div>
                    </template>
                    <template #empty> No customers found. </template>
                    <template #loading> Loading customers data. Please wait. </template>
                    <Column headerStyle="min-width:2rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-eye" class="p-button-rounded p-button-success mr-2" @click="viewRecord(slotProps.data)" />
                        </template>
                    </Column>
                    <Column field="category" header="Category" :sortable="true" style="min-width: 14rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.category }}</span>
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                    </Column>
                    <Column header="Address" filterField="country.name" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.address1 }} {{ data.address2 }} {{ data.city }} {{ data.state }} {{ data.zip }}</span>
                        </template>
                    </Column>
                    <template #expansion="slotProps">

                    </template>
                </DataTable>
                <Dialog v-model:visible="recordDialog" :style="{ width: '600px' }" header="Referrals Details" :modal="true" class="p-fluid">
                    <div class="flex align-items-center justify-content-center">
                        <div class="p-3">
                            <h5>{{ selectedRecord.name }}</h5>
                            <div>
                                <span v-if="selectedRecord.business !== null && selectedRecord.business.length > 0">{{ selectedRecord.business }} <br /></span>
                                <span v-if="selectedRecord.address1 !== null && selectedRecord.address1.length > 0">{{ selectedRecord.address1 }} <br /></span>
                                <span v-if="selectedRecord.suite !== null && selectedRecord.suite.length > 0">{{ selectedRecord.suite }} <br /></span>
                                <span v-if="selectedRecord.address2 !== null && selectedRecord.address2.length > 0">{{ selectedRecord.address2 }} <br /></span>
                                <span v-if="selectedRecord.city !== null">{{ selectedRecord.city }} </span> <span v-if="selectedRecord.state !== null">{{ selectedRecord.state }}</span> <span v-if="selectedRecord.zip !== null">{{ selectedRecord.zip }} <br /><br /></span>
                                <span v-if="selectedRecord.tel1 !== null && selectedRecord.tel1.length > 0"
                                    >Phone: <a :href="'tel:' + selectedRecord.tel1">{{ selectedRecord.phone }}</a> <br
                                /></span>
                                <span v-if="selectedRecord.tel2 !== null && selectedRecord.tel2.length > 0">Phone: {{ selectedRecord.tel2 }} <br /></span>
                                <span v-if="selectedRecord.fax !== null && selectedRecord.fax.length > 0">Fax: {{ selectedRecord.fax }} <br /></span>
                                <span v-if="selectedRecord.email !== null && selectedRecord.email.length > 0"
                                    >Email: <a :href="'mailto:' + selectedRecord.email">{{ selectedRecord.email }}</a> <br
                                /></span>
                                <span v-if="selectedRecord.ins1 !== null && selectedRecord.ins1.length > 0"
                                    >Website: <a :href="selectedRecord.ins1"> {{ selectedRecord.ins1 }} </a> <br
                                /></span>
                                <span v-if="selectedRecord.ins2 !== null && selectedRecord.ins2.length > 0">Insurance: {{ selectedRecord.ins2 }} <br /></span>
                                <span v-if="selectedRecord.ins3 !== null && selectedRecord.ins3.length > 0">Hours: {{ selectedRecord.ins3 }} <br /></span>
                                <span v-if="selectedRecord.note1 !== null && selectedRecord.note1.length > 0"><br /><b>Notes:</b><br />{{ selectedRecord.note1 }} <br /></span>
                                <span v-if="selectedRecord.note2 !== null && selectedRecord.note2.length > 0">{{ selectedRecord.note2 }} <br /></span>
                                <span v-if="selectedRecord.note3 !== null && selectedRecord.note3.length > 0">{{ selectedRecord.note3 }} <br /></span>
                                <span v-if="selectedRecord.note4 !== null && selectedRecord.note4.length > 0"
                                    ><br /><b>{{ selectedRecord.note4 }} </b><br
                                /></span>
                                <span v-if="selectedRecord.note5 !== null && selectedRecord.note5.length > 0"
                                    ><br /><b>{{ selectedRecord.note5 }} </b><br
                                /></span>
                            </div>
                        </div>
                    </div>
                    <template #footer>
                        <Button label="Close" icon="pi pi-times" class="p-button-text" @click="recordDialog = false" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>
