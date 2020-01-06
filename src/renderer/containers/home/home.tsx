import * as React from 'react';
import { Button, InputNumber } from 'antd';
import * as classNames from 'classnames';

import * as styles from './home.scss';
import { HomeSink } from './home-sink';
import { useSink } from 'redux-sink';

export const Home: React.FunctionComponent = () => {
  const sink = useSink(HomeSink);
  return (
    <div className={styles.container}>
      <div className={styles.counter}>
        <div className={styles.row}>
          <strong>
            Base: {sink.base}, Counter Value: {sink.value}
          </strong>
        </div>
        <div className={classNames(styles.row, styles.buttons)}>
          <Button className={styles.button} onClick={() => (sink.value -= sink.base)}>
            -
          </Button>
          <InputNumber value={sink.base} onChange={value => (sink.base = value || 0)} />
          <Button className={styles.button} onClick={() => (sink.value += sink.base)}>
            +
          </Button>
        </div>
        <div className={styles.row}>
          <Button onClick={sink.reset}>Reset</Button>
        </div>
      </div>
    </div>
  );
};
