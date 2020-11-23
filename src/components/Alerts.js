import React from 'react';
import { useStore } from '../custom-store/store';

const Alerts = () => {
  const globalState = useStore()[0];
  const { alerts } = globalState;
  return (
    <>
      {alerts !== undefined &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <span className="span-error text-danger alert" key={alert.id}>
            {alert.msg}
          </span>
        ))}
    </>
  );
};

const MemoizedAlert = React.memo(Alerts);
export default MemoizedAlert;
