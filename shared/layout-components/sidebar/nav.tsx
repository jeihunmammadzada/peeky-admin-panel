export enum Roles{
  SuperAdmin = "SuperAdmin",
  Admin = "Admin"
}

export interface MenuItem {
  path?: string;
  icon?: string;
  type?: string;
  badge?: string;
  Names?:string;
  badgetxt?: string;
  badge1?:boolean;
  background?:string;
  active?: boolean;
  selected?: boolean;
  title?: string;
  menutitle?: string;
  role?: Roles[];
  Items?: (MenuItem | NestedMenuItem)[];
  children? : Array<any>
}

export interface NestedMenuItem extends MenuItem {
  children: (MenuItem | NestedMenuItem)[];
}

export const MENUITEMS: (MenuItem | NestedMenuItem)[] = [
  {
    menutitle: "Əsas səhifə",
    role: [Roles.Admin, Roles.SuperAdmin],
    Items: [
      {
        path: "/dashboard",
        icon: "ti-home",
        type: "link",
        active: false,
        selected: false,
        title: "Analitika",
      },
      {
        path: "/dashboard/timetable",
        icon: "ti ti-calendar-time",
        type: "link",
        active: false,
        selected: false,
        title: "Cədvəllər",
      }
    ],
  },

  {
    menutitle: "Marşrut planlanması",
    role: [Roles.Admin, Roles.SuperAdmin],
    Items: [
      {
        path: "/dashboard/drivers",
        icon: "ti ti-users",
        type: "link",
        active: false,
        selected: false,
        title: "Sürücülər",
      },
      {
        path: "/dashboard/buses",
        icon: "ti ti-bus",
        type: "link",
        active: false,
        selected: false,
        title: "Avtobuslar",
      },

      // {
      //   path: "/dashboard/routes",
      //   icon: "ti ti-route-square-2",
      //   type: "link",
      //   active: false,
      //   selected: false,
      //   title: "Xəttlər",
      // }
    ],
  },
 
  {
    menutitle: "Anketlər",
    role: [Roles.SuperAdmin],
    Items: [
      {
        path: "/dashboard/forms/questions",
        icon: "ti ti-map-question",
        type: "link",
        active: false,
        selected: false,
        title: "Suallar",
      },
      {
        path: "/dashboard/forms/qr",
        icon: "ti ti-qrcode",
        type: "link",
        active: false,
        selected: false,
        title: "QR kod",
      },
    ],
  },

  {
    menutitle: "İstifadəçilər",
    role: [Roles.SuperAdmin],
    Items: [
      {
        path: "/dashboard/users/list",
        icon: "ti ti-user-shield",
        type: "link",
        active: false,
        selected: false,
        title: "İstifadəçilər",
      },
      {
        path: "/dashboard/users/roles",
        icon: "ti ti-brand-auth0",
        type: "link",
        active: false,
        selected: false,
        title: "İstifadəçi rolları",
      },
     
    ],
  },
  
];