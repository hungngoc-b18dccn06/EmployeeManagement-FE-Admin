
import PAGE_ROUTE from "./pageRoute";

export default [
    {
        items: [
            {
                label: "Dasboad",
                icon: "pi pi-home",
                to: PAGE_ROUTE.HOME,
                public:false,
            },
        ],
    },
    {
        items: [
            {
                label: "List Employee",
                icon: "pi pi-users",
                to: PAGE_ROUTE.EMPLOYEE_LIST,
                public:false,
            },
        ],
    },
    
    {
        items: [
            {
                label: "eCommerce",
                icon: "pi pi-shopping-cart",
                to: PAGE_ROUTE.ORDER_COFFEE,
                public:false,
            },
        ],
    },
 
    
];
