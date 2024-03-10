import { Fragment, useContext } from 'react';
import { usePathname } from "next/navigation";

import Notification from '@/components/ui/notification';
import NotificationContext from '@/store/notification-context';

import MainHeader from "./main-header";
import FilterHeader from "./filter-header";

function Layout(props) {
  const currentPath = usePathname();
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      {currentPath ==='/'?<FilterHeader />:null}
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
