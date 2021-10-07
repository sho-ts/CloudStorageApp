import { useDispatch as useDispatchOrigin } from 'react-redux';
import { AppDispatch } from '@/stores';

const useDispatch = () => useDispatchOrigin<AppDispatch>();

export default useDispatch;