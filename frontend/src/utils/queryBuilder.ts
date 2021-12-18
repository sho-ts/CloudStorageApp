/** オブジェクトからクエリパラメータを生成します */
const queryBuilder = (obj: { [key: string]: string | number }) => (
  Object.entries(obj)
    .map(([key, val]) => `${key}=${val}`)
    .reduce((acc, cur) => `${acc}&${cur}`)
);

export default queryBuilder;