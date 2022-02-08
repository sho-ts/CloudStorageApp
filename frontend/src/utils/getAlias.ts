import { JP_ALIAS } from '@/utils/const';

const getAlias = (key: string) => JP_ALIAS[key.toLowerCase()] ?? '';

export default getAlias;