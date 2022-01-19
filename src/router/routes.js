import underLayout from "@/components/underLayout.vue"

export default [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/home.vue"),
    },
    {
        path: "/dashboard",
        component: underLayout,
        redirect: "/dashboard/deadBook",
        children: [
            {
                path: "/dashboard/deadBook",
                name: "userManager",
                component: () => import("@/views/userManager.vue"),
            },
            {
                path: "/dashboard/ecstasyManagement",
                name: "EcstasyManagement",
                component: () => import("@/views/ecstasyManagement.vue"),
            },
            {
                path: "/dashboard/eqManagement",
                name: "EqManagement",
                component: () => import("@/views/eqManagement.vue"),
            },
            {
                path: "/dashboard/reincarnation",
                name: "Reincarnation",
                component: () => import("@/views/reincarnation.vue"),
            },
        ],
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login.vue"),
    },
]
