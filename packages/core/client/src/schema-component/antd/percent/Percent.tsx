import { connect, mapReadPretty } from '@formily/react';
import { InputNumber } from 'antd';
import React from 'react';
import { ReadPretty } from '../input-number/ReadPretty';

export const Percent = connect(
  (props) => {
    const { value, onChange } = props;

    return (
      <InputNumber 
        {...props}
        addonAfter="%" 
        value={value * 100}
        onChange={(v: any) => {
          if (onChange) {
            onChange(v / 100);
          }
        }}
      />
    );
  },
  mapReadPretty((props) => {
    return (<ReadPretty {...props} value={props.value ? props.value * 100 : null} />);
  }),
);
