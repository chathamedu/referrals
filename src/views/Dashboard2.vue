<script setup>
import { onMounted, ref, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import ReferralsService from '@/service/ReferralsService';

const filters1 = ref(null);
const loading2 = ref(null);
const referrals = ref(null);

const referralsService = new ReferralsService();

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };
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
    loading2.value = false;

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
                <DataTable :value="referrals" rowGroupMode="subheader" groupRowsBy="category" sortMode="single" sortField="category" :sortOrder="1" scrollable scrollHeight="400px">
                    <Column field="category" header="Categary"></Column>
                    <Column field="name" header="Name" style="min-width: 200px"></Column>
                    <Column field="state" header="Address" style="min-width: 300px"></Column>
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
