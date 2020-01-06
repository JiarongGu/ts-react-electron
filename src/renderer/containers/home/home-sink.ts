import { effect, sink, state, trigger } from 'redux-sink';
import { ActiveRoute } from '@renderer/models';

@sink('home')
export class HomeSink {
  @state public value = 0;
  @state public base = 1;

  @effect
  public reset() {
    this.value = 0;
    this.base = 1;
  }

  // reset counter on route enter
  @trigger('navigation/activeRoute')
  public triggerActiveRoute(activeRoute: ActiveRoute) {
    if (activeRoute.keys.some((key) => key === 'home')) {
      this.reset();
    }
  }
}