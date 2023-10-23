/* eslint-disable */
export const getItemByType = (
  item: any,
  type: string,
  key: string,
) => typeof item !== type ? item[key] : item;
