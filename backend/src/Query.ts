type QueryInstanceType = {
  [key: string]: any
}

abstract class Query {
  createColmunsQuery = () => {
    return Object.keys(this).filter((key) => {
      if (key !== 'id' && (this as QueryInstanceType)[key] && typeof (this as QueryInstanceType)[key] !== 'function') {
        return key;
      }
    }).join(',')
  }

  createValuesQuery = () => {
    return Object.keys(this).map((key) => {
      if (key !== 'id' && (this as QueryInstanceType)[key] && typeof (this as QueryInstanceType)[key] !== 'function') {
        if (typeof (this as QueryInstanceType)[key] === 'string') {
          return `'${(this as QueryInstanceType)[key]}'`
        }

        return (this as QueryInstanceType)[key]
      }
    }).filter(key => key ? true : false).join(',');
  }

  getColumnsAndValuesQuery = () => ({
    columns: this.createColmunsQuery(),
    values: this.createValuesQuery(),
  });
}

export default Query;