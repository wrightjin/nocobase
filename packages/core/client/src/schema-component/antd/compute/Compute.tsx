import { onFormValuesChange } from '@formily/core';
import { connect, mapReadPretty, useFieldSchema, useFormEffects } from '@formily/react';
import { InputNumber } from 'antd';
import React, { useState } from 'react';
import * as math from 'mathjs';
import _ from 'lodash';
import { ReadPretty } from '../input-number/ReadPretty';
import { useCollection, useCollectionField } from '../../../collection-manager/hooks';

const AntdCompute = (props) => {
  const { value, onChange, step } = props;
  // const { expression } = useCollectionField();
  const { getField } = useCollection();
  const fieldSchema = useFieldSchema();
  const options = getField(fieldSchema.name);
  const { expression } = options;
  const [computeValue, setComputeValue] = useState(value);

  useFormEffects(() => {
    onFormValuesChange((form) => {
      const scope = _.cloneDeep(form.values);
      let result;
      try {
        result = math.evaluate(expression, scope);
        result = math.round(result, 9);
      } catch {}
      if (result) {
        setComputeValue(result);
        if (onChange) {
          onChange(result);
        }
      }
    })
  })
  
  return (
    <InputNumber readOnly value={computeValue} stringMode={true} step={step} />
  );
}

export const Compute = connect(
  AntdCompute,
  mapReadPretty(ReadPretty)
);

export default Compute;