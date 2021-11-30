import { getCurrentUser } from '../helpers/Utils';
import { adminRoot } from './defaultValues';

const data =getCurrentUser() && getCurrentUser().roles === 3? [
  {
    id: 'Dashboard',
    icon: 'iconsminds-air-balloon-1',
    label: 'Dashboard',
    to: `${adminRoot}/Dashboard`,
    /* subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.start',
        to: `${adminRoot}/gogo/start`,
      },
    ], */
  },
  {
    id: 'Profiles',
    icon: 'iconsminds-administrator',
    label: 'Profiles',
    to: `${adminRoot}/Profile`,
  },
  
  // {
  //   id: 'Roles',
  //   icon: 'iconsminds-notepad',
  //   label: 'Manage Roles',
  //   to: `${adminRoot}/Role`,
  // },
  {
    id: 'Documents',
    icon: 'iconsminds-add-file',
    label: 'Documents',
    to: `${adminRoot}/Documents`,
  },
  {
    id: 'Trips',
    icon: 'iconsminds-palm-tree',
    label: 'Trips',
    to: `${adminRoot}/Trips`,
    // roles: [UserRole.Admin, UserRole.Editor],
    /* subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.second',
        to: `${adminRoot}/second-menu/second`,
      },
    ], */
  },

  {
    id: 'Requests',
    icon: 'iconsminds-check',
    label: 'Request',
    to: `${adminRoot}/Request`,
  },
  
  // {
  //   id: 'Expenses',
  //   icon: 'iconsminds-cash-register-2',
  //   label: 'Expenses',
  //   to: `${adminRoot}/Expenses`,
  // },
  // {
  //   id: 'Contact us',
  //   icon: 'simple-icon-phone',
  //   label: 'Contact us',
  //   to: `${adminRoot}/Contactus`,
  // },
]:
[
{
  id: 'Dashboard',
  icon: 'iconsminds-air-balloon-1',
  label: 'Dashboard',
  to: `${adminRoot}/Dashboard`,
  /* subs: [
    {
      icon: 'simple-icon-paper-plane',
      label: 'menu.start',
      to: `${adminRoot}/gogo/start`,
    },
  ], */
},
{
  id: 'Roles',
  icon: 'iconsminds-notepad',
  label: 'Manage Roles',
  to: `${adminRoot}/Role`,
},
{
  id: 'Profiles',
  icon: 'iconsminds-administrator',
  label: 'Profiles',
  to: `${adminRoot}/Profile`,
},
{
  id: 'Trips',
  icon: 'iconsminds-palm-tree',
  label: 'Trips',
  to: `${adminRoot}/Trips`,
  // roles: [UserRole.Admin, UserRole.Editor],
  /* subs: [
    {
      icon: 'simple-icon-paper-plane',
      label: 'menu.second',
      to: `${adminRoot}/second-menu/second`,
    },
  ], */
},
{
  id: 'Documents',
  icon: 'iconsminds-add-file',
  label: 'Documents',
  to: `${adminRoot}/Documents`,
},


{
  id: 'Requests',
  icon: 'iconsminds-check',
  label: 'Request',
  to: `${adminRoot}/Request`,
},

// {
//   id: 'Expenses',
//   icon: 'iconsminds-cash-register-2',
//   label: 'Expenses',
//   to: `${adminRoot}/Expenses`,
// },
// {
//   id: 'Contact us',
//   icon: 'simple-icon-phone',
//   label: 'Contact us',
//   to: `${adminRoot}/Contactus`,
// },
];
export default data;
