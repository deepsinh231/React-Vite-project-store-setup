import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNotificationContext } from "../createContextStore/NotificationContext";
import { updateState } from "../Store/Reducers/TBSlice";

/**
 * Custom hook to handle notifications based on Redux state
 * @param {Object} tbState - TB reducer state
 */
const useNotifications = (tbState) => {
  const dispatch = useDispatch();
  const { openNotification } = useNotificationContext();

  // Handle error notifications
  useEffect(() => {
    const { isError, errorMessage } = tbState;

    if (isError) {
      openNotification(
        "error",
        "Error",
        errorMessage || "Something went wrong",
        true
      );

      // Reset error states
      dispatch(updateState({ isError: false, errorMessage: "" }));
    }
  }, [tbState.isError, tbState.errorMessage, dispatch, openNotification]);

  // Handle success notifications
  useEffect(() => {
    const { isSuccess, successMessage } = tbState;

    // Handle success notification
    if (isSuccess) {
      openNotification(
        "success",
        "Success",
        successMessage || "Success",
        true,
        true
      );
      dispatch(updateState({ isSuccess: false, successMessage: "" }));
    }
  }, [tbState.isSuccess, tbState.successMessage, dispatch, openNotification]);
};

export default useNotifications;
