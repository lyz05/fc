import { IProperties } from './interface/interface';
import { TriggerConfig } from './interface/fc/trigger';
import Table from 'tty-table';
import _ from 'lodash';

export function isAutoConfig(config: any): boolean {
  return config === 'auto' || config === 'Auto';
}

export function genServiceStateID(accountID, region, serviceName): string {
  return `${accountID}-${region}-${serviceName}`;
}

export function getFcNames(argsParse, inputsProps) {
  if (argsParse?.region) {
    return {
      region: argsParse.region,
      serviceName: argsParse['service-name'],
      functionName: argsParse['function-name'],
    };
  }

  return {
    region: inputsProps?.region,
    serviceName: inputsProps?.service?.name,
    functionName: inputsProps?.function?.name,
  };
}

export function isHttpFunction(props: IProperties): boolean {
  const triggers: TriggerConfig[] = props?.triggers;
  if (_.isEmpty(triggers)) { return false; }
  for (const trigger of triggers) {
    if (trigger.type === 'http') { return true; }
  }
  return false;
}

export const tableShow = (data, showKey) => {
  const options = {
    borderStyle: 'solid',
    borderColor: 'blue',
    headerAlign: 'center',
    align: 'left',
    color: 'cyan',
    width: '100%',
  };
  const header_option = {
    headerColor: 'cyan',
    color: 'cyan',
    align: 'left',
    width: 'auto',
    formatter: (value) => value,
  };
  const header = showKey.map((value) => (_.isString(value) ? ({
    ...header_option,
    value,
  }) : ({ ...header_option, ...value })));

  console.log(Table(header, data, options).render());
};

