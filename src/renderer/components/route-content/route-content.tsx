import * as React from 'react';
import { Route } from 'react-router';

import { RouteModel } from '@renderer/models';

export interface RouteContentProps {
  routes: Array<RouteModel>;
}

export const RouteContent: React.FunctionComponent<RouteContentProps> = ({ routes }) => {
  return <>{routes && routes.map((route, index) => <Route key={index} {...route.config} />)}</>;
};
