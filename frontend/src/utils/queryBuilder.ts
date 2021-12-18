/** オブジェクトからクエリパラメータを生成します */
const queryBuilder = (obj: { [key: string]: string | number | null | undefined }) => (
  Object.entries(obj)
    .filter(([key, val]) => val)
    .map(([key, val]) => `${key}=${val}`)
    .reduce((acc, cur) => `${acc}&${cur}`)
);

export default queryBuilder;