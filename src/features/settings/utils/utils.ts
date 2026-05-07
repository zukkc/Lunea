import { OptionType } from '@/src/shared/settings/model/types';

export const convertToOptionType = <T,>( 
  value: T,
): OptionType<T> => {
  return { label: String(value), value: value };
};
