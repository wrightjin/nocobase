import { defaultProps, operators } from './properties';
import { IField } from './types';

export const formula: IField = {
  name: 'formula',
  type: 'object',
  group: 'basic',
  order: 9,
  title: '{{t("Formula")}}',
  sortable: true,
  default: {
    type: 'float',
    // name,
    uiSchema: {
      type: 'number',
      // title,
      "x-disabled": true,
      'x-component': 'Compute',
      'x-component-props': {
        stringMode: true,
        step: '1',
      },
    },
  },
  properties: {
    ...defaultProps,
    'uiSchema.x-component-props.expression': {
      type: 'string',
      title: '{{t("Expression")}}',
      required: true,
      description: '{{t("Input +、-、*、/、( ) to calculate, input @ to open field variables.")}}',
      'x-component': 'FormulaInput',
      'x-decorator': 'FormItem',
    },
    'uiSchema.x-component-props.precision': {
      type: 'string',
      title: '{{t("Precision")}}',
      'x-component': 'Select',
      'x-decorator': 'FormItem',
      required: true,
      default: '0',
      enum: [
        { value: '0', label: '1' },
        { value: '0.1', label: '1.0' },
        { value: '0.01', label: '1.00' },
        { value: '0.001', label: '1.000' },
        { value: '0.0001', label: '1.0000' },
        { value: '0.00001', label: '1.00000' },
      ],
    },
  },
  filterable: {
    operators: operators.number,
  },
};