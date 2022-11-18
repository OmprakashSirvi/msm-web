/** @format */

import MyAccount from '../components/Account/MyAccount/MyAccount';
import ManageAccount from '../components/Account/ManageAccount/ManageAccount';
// import MyAccount from "../../UI/Account/MyAccount/MyAccount";
// import ManageAccount from "../../UI/Account/ManageAccount/ManageAccount";
import { TabTitle } from '../../../utils/General';

export const Profile = () => {
   TabTitle('My Account - msm-web');

   return <MyAccount />;
};

export const AccountManager = () => {
   TabTitle('My Account - msm-web');

   return <ManageAccount />;
};
