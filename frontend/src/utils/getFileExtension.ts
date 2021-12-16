/** ファイルの拡張子のみを抜き出す */
const getFileExtension = (filePath: string) => filePath.split('.').slice(-1)[0];

export default getFileExtension;