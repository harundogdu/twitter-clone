import { Fragment, useEffect } from "react";

import { formatDistanceToNowStrict } from "date-fns";
import { BsTwitter } from "react-icons/bs";

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";

const NotificationFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: notifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  return (
    <>
      {Array.isArray(notifications) &&
        notifications.map((notification: Record<string, any>) => {
          return (
            <Fragment key={notification.id}>
              <div
                key={notification.id}
                className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <BsTwitter className="w-6 h-6 mr-4 text-blue-500" />
                <div className="flex flex-col flex-1">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-gray-600 dark:text-gray-300">
                      {notification.body}
                    </span>
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNowStrict(
                      new Date(notification.createdAt)
                    )}
                  </span>
                </div>
              </div>
              {Array.isArray(notifications) && notification.length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <span className="text-3xl">No notifications</span>
                </div>
              )}
            </Fragment>
          );
        })}
    </>
  );
};

export default NotificationFeed;
