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
        <div class="col-6 md:col-3">
            <div class="card">
                <h5>Panel</h5>
            </div>
            <div class="card">
                <h5>Panel</h5>
            </div>
            <div class="card">
                <h5>Panel</h5>
            </div>
            <div class="card">
                <h5>Panel</h5>
            </div>
        </div>
    </div>
</template>
