/** オブジェクトからクエリパラメータを生成します */
const queryBuilder = (obj: { [key: string]: string | number | null | undefined }) => {
  const query = Object.entries(obj)
    .filter(([key, val]) => val)
    .map(([key, val]) => `${key}=${val}`);

  return query.length > 0 ? query.reduce((acc, cur) => `${acc}&${cur}`) : '';
}

export default queryBuilder;