class Query {
  createColmunsQuery = () => {
    return Object.keys(this).filter((key) => {
      if (key !== 'id' && this[key] && typeof this[key] !== 'function') {
        return key;
      }
    }).join(',')
  }

  createValuesQuery = () => {
    return Object.keys(this).map((key) => {
      if (key !== 'id' && this[key] && typeof this[key] !== 'function') {
        if (typeof this[key] === 'string') {
          return `'${this[key]}'`
        }

        return this[key]
      }
    }).filter(key => key ? true : false).join(',');
  }

  getColumnsAndValuesQuery = () => ({
    columns: this.createColmunsQuery(),
    values: this.createValuesQuery(),
  });
}

module.exports = Query;