<script setup>
import { ref } from 'vue';

const toolbarItems = ref([
    {
        label: 'Save',
        icon: 'pi pi-check'
    },
    {
        label: 'Update',
        icon: 'pi pi-upload'
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash'
    },
    {
        label: 'Home Page',
        icon: 'pi pi-home'
    }
]);
const cardMenu = ref([
    { label: 'Save', icon: 'pi pi-fw pi-check' },
    { label: 'Update', icon: 'pi pi-fw pi-refresh' },
    { label: 'Delete', icon: 'pi pi-fw pi-trash' }
]);
const menuRef = ref(null);

const toggle = () => {
    menuRef.value.toggle(event);
};
</script>

<template>
    <div class="grid">
        <div class="col-12 md:col-6">
            <div class="card">
                <Panel header="Kundhavaidvi Balamurugan" :toggleable="false">
                    <p class="line-height-3 m-0">Chatham University Student, Intern 2023</p>
                </Panel>
            </div>
        </div>
    </div>
</template>
