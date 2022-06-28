import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path){
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HomePage',
            meta: {title: 'HomePage'},
            component: importComponent('HomePage'),
        },

        {
            path: '/login',
            name: 'LoginPage',
            meta: {title: 'Login'},
            component: importComponent('LoginPage'),
        },

        {
            path: '/register',
            name: 'RegisterPage',
            meta: {title: 'Register'},
            component: importComponent('RegisterPage'),
        },

        {
            path: '/dashboard',
            name: 'DashboardAdmin',
            meta: {title: 'Dashboard'},
            component: importComponent('Administrator/DashboardAdmin'),
            children: [
                // Profil
                {
                    path: '/dashboard/datacustomer',
                    name: 'DataCustomer',
                    meta: {title: 'Data Customer'},
                    component: importComponent('Administrator/DataCustomer')
                },

                {
                    path: '/dashboard/datadriver',
                    name: 'DataDriver',
                    meta: {title: 'Data Driver'},
                    component: importComponent('Administrator/DataDriver')
                },

                {
                    path: '/dashboard/datapemilikkendaraan',
                    name: 'DataPemilikKendaraan',
                    meta: {title: 'Data Pemilik Mobil'},
                    component: importComponent('Administrator/DataPemilikKendaraan')
                },

                {
                    path: '/dashboard/datamobil',
                    name: 'DataKendaraan',
                    meta: {title: 'Data Kendaraan'},
                    component: importComponent('Administrator/DataMobil')
                },

                {
                    path: '/dashboard/datapegawai',
                    name: 'DataPegawai',
                    meta: {title: 'Data Pegawai'},
                    component: importComponent('Administrator/DataPegawai')
                },
                {
                    path: '/dashboard/profil/admin',
                    name: 'ProfilAdmin',
                    meta: {title: 'Profil Admin'},
                    component: importComponent('Administrator/ProfilAdmin')
                },
            ]
        },

        {
            path: '/dashboard',
            name: 'DashboardManager',
            meta: {title: 'Dashboard'},
            component: importComponent('Manager/DashboardManager'),
            children: [
                // Profil
                {
                    path: '/dashboard/datapromo',
                    name: 'DataPromo',
                    meta: {title: 'Data Promo'},
                    component: importComponent('Manager/DataPromo')
                },

                {
                    path: '/dashboard/datajadwal',
                    name: 'DataJadwal',
                    meta: {title: 'Data Jadwal'},
                    component: importComponent('Manager/DataJadwal')
                },
                {
                    path: '/dashboard/profil/manager',
                    name: 'ProfilManager',
                    meta: {title: 'Profil Manager'},
                    component: importComponent('Manager/ProfilManager')
                },
            ]
        },

        {
            path: '/dashboard',
            name: 'DashboardCS',
            meta: {title: 'Dashboard'},
            component: importComponent('CustomerService/DashboardCS'),
            children: [
                // Profil
                {
                    path: '/dashboard/transaksi',
                    name: 'DataTransaksi',
                    meta: {title: 'Transaksi'},
                    component: importComponent('CustomerService/DataTransaksi')
                },
                {
                    path: '/dashboard/profil/cs',
                    name: 'ProfilCS',
                    meta: {title: 'Profil Customer Service'},
                    component: importComponent('CustomerService/ProfilCS')
                },
               
                
            ]
        },
        {
            path: '/test',
            name: 'UserPage',
            meta: {title: 'Home User'},
            component: importComponent('User/UserPage'),
        },

        {
            path: '/user',
            name: 'AccountPage',
            meta: {title: 'Home User'},
            component: importComponent('User/AccountPage'),
        },

        {
            path: '/order',
            name: 'OrderPage',
            meta: {title: 'Home User'},
            component: importComponent('User/OrderPage'),
        },
        {
            path: '/pegawai',
            name: 'LoginPegawai',
            meta: {title: 'Login '},
            component: importComponent('LoginPegawai'),
        },
    ],
});

// Set Judul 
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});
export default router;