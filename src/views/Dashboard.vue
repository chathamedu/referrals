<script setup>
import { onMounted, ref, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import ReferralsService from '@/service/ReferralsService';

const filters1 = ref(null);
const loading1 = ref(null);
const referrals = ref(null);
const expandedRows = ref([]);

const referralsService = new ReferralsService();

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        category: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        address1: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
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
onMounted(() => {
    loading1.value = false;

    referralsService.getReferralDataFetch().then((data) => {
        referrals.value = data;
        //   console.log(data);
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
                <h5>Chatham University Referrals</h5>
                <DataTable
                    :value="referrals"
                    v-model:expandedRows="expandedRows"
                    rowGroupMode="subheader"
                    groupRowsBy="category"
                    sortMode="single"
                    sortField="category"
                    :sortOrder="1"
                    scrollable
                    scrollHeight="600px"
                    v-model:filters="filters1"
                    filterDisplay="menu"
                    :filters="filters1"
                    responsiveLayout="scroll"
                    :globalFilterFields="['category', 'name']"
                >
                    <!--template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2" @click="clearFilter1()" />
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%" />
                            </span>
                        </div>
                    </template-->
                    <template #empty> No referrals found. </template>
                    <template #loading> Loading referrals data. Please wait. </template>

                    <Column :expander="true" headerStyle="min-width: 3rem" />
                    <Column field="name" header="Name" style="min-width: 200px"></Column>
                    <Column header="Address" style="min-width: 300px">
                        <template #body="slotProps">{{ slotProps.data.address1 }} {{ slotProps.data.address2 }}{{ slotProps.data.city }} {{ slotProps.data.state }} {{ slotProps.data.zip }}</template>
                    </Column>
                    <template #expansion="slotProps">
                        <div class="p-3">
                            <h5>{{ slotProps.data.name }}</h5>
                            <div>
                                <span v-if="slotProps.data.business !== null && slotProps.data.business.length > 0">{{ slotProps.data.business }} <br /></span>
                                <span v-if="slotProps.data.address1 !== null && slotProps.data.address1.length > 0">{{ slotProps.data.address1 }} <br /></span>
                                <span v-if="slotProps.data.suite !== null && slotProps.data.suite.length > 0">{{ slotProps.data.suite }} <br /></span>
                                <span v-if="slotProps.data.address2 !== null && slotProps.data.address2.length > 0">{{ slotProps.data.address2 }} <br /></span>
                                <span v-if="slotProps.data.city !== null">{{ slotProps.data.city }} </span> <span v-if="slotProps.data.state !== null">{{ slotProps.data.state }}</span> <span v-if="slotProps.data.zip !== null">{{ slotProps.data.zip }} <br /><br /></span>
                                <span v-if="slotProps.data.phone !== null && slotProps.data.phone.length > 0">Phone: {{ slotProps.data.phone }} <br /></span>
                                <span v-if="slotProps.data.fax !== null && slotProps.data.fax.length > 0">Fax: {{ slotProps.data.fax }} <br /></span>
                                <span v-if="slotProps.data.email !== null && slotProps.data.email.length > 0">Email: {{ slotProps.data.email }} <br /></span>
                                <span v-if="slotProps.data.ins1 !== null && slotProps.data.ins1.length > 0">Website: {{ slotProps.data.ins1 }} <br /></span>
                                <span v-if="slotProps.data.ins2 !== null && slotProps.data.ins2.length > 0">Insurance: {{ slotProps.data.ins2 }} <br /></span>
                                <span v-if="slotProps.data.ins3 !== null && slotProps.data.ins3.length > 0">Hours: {{ slotProps.data.ins3 }} <br /></span>
                                <span v-if="slotProps.data.note1 !== null && slotProps.data.note1.length > 0"><br /><b>Notes:</b><br />{{ slotProps.data.note1 }} <br /></span>
                                <span v-if="slotProps.data.note2 !== null && slotProps.data.note2.length > 0">{{ slotProps.data.note2 }} <br /></span>
                                <span v-if="slotProps.data.note3 !== null && slotProps.data.note3.length > 0">{{ slotProps.data.note3 }} <br /></span>
                                <span v-if="slotProps.data.note4 !== null && slotProps.data.note4.length > 0"><br /><b>{{ slotProps.data.note4 }} </b><br /></span>
                                <span v-if="slotProps.data.note5 !== null && slotProps.data.note5.length > 0"><br /><b>{{ slotProps.data.note5 }} </b><br /></span>
                            </div>
                        </div>
                    </template>
                    <template #groupheader="slotProps">
                        <span class="image-text font-bold ml-2">{{ slotProps.data.category }}</span>
                    </template>
                    <template #groupfooter="slotProps">
                        <td style="text-align: right" class="text-bold pr-6">Total Referrals: {{ referralsTotal(slotProps.data.category) }}</td>
                    </template>
                </DataTable>
            </div>
        </div>
    </div>
</template>
