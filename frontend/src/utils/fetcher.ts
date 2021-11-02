const fetcher = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  return new Promise((resolve, reject) => {
    fetch(input, init)
      .then(res => {
        if (!res.ok) reject();

        res.json()
          .then(json => resolve(json))
          .catch(err => reject(err));
      })
      .catch(err => {
        reject(err);
      });
  })
}

export default fetcher;