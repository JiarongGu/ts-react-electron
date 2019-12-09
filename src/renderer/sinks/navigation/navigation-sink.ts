import { createBrowserHistory, History, Location } from 'history';
import { matchPath } from 'react-router';
import { effect, sink, SinkFactory, state, trigger } from 'redux-sink';

import { ActiveRoute } from '@models/navigation/active-route';
import { RouteModel } from '@models/navigation/route-model';

@sink('navigation')
export class NavigationSink {
  @state public history!: History;
  @state public location!: Location;
  @state public activeRoute!: ActiveRoute;

  @state public routes: Array<RouteModel> = [];

  @effect
  public addRoute(route: RouteModel) {
    this.routes.push(route);
    this.routes = this.routes.concat();
  }

  @effect
  public addRoutes(routes: Array<RouteModel>) {
    this.routes = this.routes.concat(routes);
  }

  @trigger('navigation/location')
  public locationTrigger(location: Location) {
    const activeRoute = this.getActiveRoute(this.routes, location);

    if (activeRoute) {
      this.activeRoute = activeRoute;
    }
  }

  private getActiveRoute(routes: Array<RouteModel>, location: Location): ActiveRoute | undefined {
    if (!location) {
      return undefined;
    }

    const activeRoute = this.getMatchedRoute(routes, location);

    if (activeRoute) {
      const searchParams = new URLSearchParams(location.search);
      const queryParams: { [key: string]: string | null } = {};

      searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });
      return { ...activeRoute, queryParams };
    }
  }

  private getMatchedRoute(routes: Array<RouteModel>, location: Location): ActiveRoute | undefined {
    for (const route of routes) {
      const props = Object.assign({}, route.props, { path: route.link });
      const matches = matchPath(location.pathname, props);

      if (matches) {
        const keys = [route.key];
        let params = matches.params;
        let url = matches.url;
        let name = route.name || route.key;

        if (route.routes) {
          const subMatchedRoute = this.getMatchedRoute(route.routes, location);

          if (subMatchedRoute) {
            keys.push(...subMatchedRoute.keys);
            params = Object.assign(params, subMatchedRoute.params);
            url = subMatchedRoute.url;
            name = subMatchedRoute.name;
          }
        }
        return { keys, url, params, name, queryParams: {} };
      }
    }
  }
}

export const createNavigationHistory = (routes?: Array<RouteModel>) => {
  const history = createBrowserHistory();
  const navigation = SinkFactory.getSink(NavigationSink);

  if (routes) {
    navigation.addRoutes(routes);
  }

  history.listen(location => (navigation.location = location));
  navigation.history = history;
  navigation.location = history.location;

  return history;
};
