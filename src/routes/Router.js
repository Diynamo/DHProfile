import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full-layout/loadable/Loadable';
// Server 
import { getUsers } from "../server/users";
import { getTx } from "../server/tx";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full-layout/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank-layout/BlankLayout')));
/* ***End Layouts**** */

/* ***Dream Hunters**** */
const Connect = Loadable(lazy(() => import('../views/authentication/Connect')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));

/* ****Collections***** */
const DreamIncubator = Loadable(lazy(() => import('../views/collections/DreamIncubator')));

const CristianoCollection = Loadable(lazy(() => import('../views/collections/cristiano')));
const DreamHuntersCollection = Loadable(lazy(() => import('../views/collections/dreamHunters')));
const BlankCristianoCollection = Loadable(lazy(() => import('../views/collections/cristiano/Blank')));
const BlankDreamHuntersCollection = Loadable(lazy(() => import('../views/collections/dreamHunters/Blank')));

/* ****Private Sale Cristiano***** */
const PrivateSale = Loadable(lazy(() => import('../views/private-sale')));
const BlankPrivateSale = Loadable(lazy(() => import('../views/private-sale/Blank')));

/* ****Private Sale Dream Hunters***** 
const PrivateSale = Loadable(lazy(() => import('../views/private-sale')));
const BlankPrivateSale = Loadable(lazy(() => import('../views/private-sale/Blank')));
const Invoice = Loadable(lazy(() => import('../views/private-sale/Invoice')));
const BlankInvoice = Loadable(lazy(() => import('../views/private-sale/BlankInvoice')));
*/

/* ****Private Sale Veecon Pack***** 
const PrivateSale = Loadable(lazy(() => import('../views/private-sale')));
const BlankPrivateSale = Loadable(lazy(() => import('../views/private-sale/Blank')));
const Invoice = Loadable(lazy(() => import('../views/private-sale/Invoice')));
const BlankInvoice = Loadable(lazy(() => import('../views/private-sale/BlankInvoice')));
*/

/* ****Colections***** */
const Tx = Loadable(lazy(() => import('../views/tx')));
const BlankTx = Loadable(lazy(() => import('../views/tx/Blank')));


/* ****App***** */
const CristianoDao = Loadable(lazy(() => import('../views/apps/cristianoDao/CristianoDao')));
const DreamHuntersDao = Loadable(lazy(() => import('../views/apps/dreamHuntersDao/DreamHuntersDao')));

/* ****My User Profile***** */
const MyProfile = Loadable(lazy(() => import('../views/userProfile/MyProfile')));
const EditProfile = Loadable(lazy(() => import('../views/userProfile/editProfile')));

/* ****User Profile***** */
const UserProfile = Loadable(lazy(() => import('../views/userProfile/UsersProfile')));
const BlankProfile = Loadable(lazy(() => import('../views/userProfile/BlankProfile')));
/* ***End Dream Hunters**** */

/* ****Policy Page***** */
const PrivacyPolicy = Loadable(lazy(() => import('../views/policy/Privacy')));
const CookiePolicy = Loadable(lazy(() => import('../views/policy/Cookie')));
const TermsCondition = Loadable(lazy(() => import('../views/policy/TermsCondition')));
const BlankTermsCondition = Loadable(lazy(() => import('../views/policy/BlankTermsCondition')));
const BlankPrivacyPolicy = Loadable(lazy(() => import('../views/policy/BlankPrivacy')));
const BlankCookiePolicy = Loadable(lazy(() => import('../views/policy/BlankCookie')));

const TermsConditionCristiano = Loadable(lazy(() => import('../views/policy/cristiano/TermsCondition')));
const BlankTermsConditionCristiano = Loadable(lazy(() => import('../views/policy/cristiano/BlankTermsCondition')));
/* ***End Policy Page**** */




const Error = Loadable(lazy(() => import('../views/authentication/Error')));

/* ****Routes***** */

const Router = async () => {
  let users = null
  let tx = null

  const route = [
    {
      path: '/',
      element: <FullLayout />,
      children: [
        { path: '/', element: <Dashboard /> },

        { path: '/dream-incubator', element: <DreamIncubator /> },

        { path: '/dream/cristiano', element: <CristianoCollection /> },
        { path: '/dream/dream-hunters', element: <DreamHuntersCollection /> },

        { path: '/presale/cristiano', element: <PrivateSale /> },
        { path: '/presale/dream-hunters', element: <PrivateSale /> },
        { path: '/presale/veecon', element: <PrivateSale /> },

        { path: '/dream/cristiano/terms-and-condition', element: <TermsConditionCristiano /> },

        { path: '/dao/cristiano', element: <CristianoDao /> },
        { path: '/dao/dream-hunters', element: <DreamHuntersDao /> },

        { path: '/profile', element: <MyProfile /> },
        { path: '/edit-profile', element: <EditProfile /> },

        { path: '/privacy-policy', element: <PrivacyPolicy /> },
        { path: '/cookie-policy', element: <CookiePolicy /> },
        { path: '/terms-and-condition', element: <TermsCondition /> },

        { path: '/404', element: <Error /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/',
      element: <BlankLayout />,
      children: [
        { path: '/connect', exact: true, element: <Connect /> },

        { path: '/dream/cristiano', element: <BlankCristianoCollection /> },
        { path: '/dream/dream-hunters', element: <BlankDreamHuntersCollection /> },

        { path: '/dream/presale', element: <BlankPrivateSale /> },

        { path: '/dream/cristiano/terms-and-condition', element: <BlankTermsConditionCristiano /> },

        { path: '/privacy-policy', element: <BlankPrivacyPolicy /> },
        { path: '/cookie-policy', element: <BlankCookiePolicy /> },
        { path: '/terms-and-condition', element: <BlankTermsCondition /> },

        { path: '/404', element: <Error /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
  ];

  try {
    users = await getUsers();
    tx = await getTx();
  } catch (error) {
    console.log(error);
  }

  if (users && users.length) {
    users.forEach(user => {
      if (user.username !== null) {
        route[0].children.push({
          path: `/${user.username.toLowerCase()}`, element: <UserProfile id={user._id} />
        });
        route[1].children.push({
          path: `/${user.username.toLowerCase()}`, element: <BlankProfile id={user._id} />
        });
      }

      route[0].children.push({
        path: `/${user._id}`, element: <UserProfile id={user._id} />
      });
      route[1].children.push({
        path: `/${user._id}`, element: <BlankProfile id={user._id} />
      });
    })
  }

  if (tx && tx.length) {
    tx.forEach(t => {
      route[0].children.push({
        path: `/tx/${t.hash.toLowerCase()}`, element: <Tx tx={t.hash} id={t._id} />
      });
      route[1].children.push({
        path: `/tx/${t.hash.toLowerCase()}`, element: <BlankTx tx={t.hash} id={t._id} />
      });

      route[0].children.push({
        path: `/tx/${t._id}`, element: <Tx id={t._id} tx={0} />
      });
      route[1].children.push({
        path: `/tx/${t._id}`, element: <BlankTx id={t._id} tx={0} />
      });
    })
  }

  return route;
};

export default Router;