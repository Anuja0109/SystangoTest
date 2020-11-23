// Custome-Store-Slice for Adding New Alerts & Setting when Required
import { initStore } from '../store';

const configureStore = () => {
  const actions = {
    ADD_ALERT: (currentState, alert) => {
      const isPresent = currentState.alerts.findIndex(
        (al) => al.id === alert.id
      );
      if (isPresent !== -1) return currentState;
      const updatedAlerts = [...currentState.alerts, alert];
      return { alerts: updatedAlerts };
    },
    REMOVE_ALERT: (currentState, alertId) => {
      const updatedAlerts = currentState.alerts.filter(
        (alert) => alert.id !== alertId
      );

      return { alerts: updatedAlerts };
    },
  };
  initStore(actions, {
    alerts: [],
  });
};

export default configureStore;
