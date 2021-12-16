import { getFileExtension } from "./";

export const checkFileType = (filePath: string, fileTypes: string[]) => fileTypes.filter(type => getFileExtension(filePath) === type).length > 0

export const isImage = (filePath: string) => checkFileType(filePath, ['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg']);

export const isMovie = (filePath: string) => checkFileType(filePath, ['mp4', 'flv', 'mov', 'wmv', 'avi', 'mpg', 'mkv']);

export const isCompressed = (filePath: string) => checkFileType(filePath, ['zip', 'rar', '7z', 'gz', 'bzip', 'bzip2', 'lzh', 'cab.']);

export const isCode = (filePath: string) => checkFileType(filePath, [
  'html', 'js', 'css', 'scss', 'php', 'rb', 'py', 'ts', 'jsx', 'tsx', 'rb', 'ejs', 'pug', 'jade',
  'dart', 'abp', 'as', 'c', 'cpp', 'cobol', 'coffee', 'cs', 'go', 'htm', 'sql', 'rs', 'scala', 'sh', 'vbs'
]);
