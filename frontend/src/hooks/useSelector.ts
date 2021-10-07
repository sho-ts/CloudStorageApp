import { useSelector as useSelectorOrigin, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../stores';

const useSelector: TypedUseSelectorHook<RootState> = useSelectorOrigin;

export default useSelector;