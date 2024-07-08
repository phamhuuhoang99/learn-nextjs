import { workApi } from '@/api-client';
import { QueryKeys } from '@/constants';
import { getErrorMessage } from '@/utils';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';

export function useAddWork() {
  const { mutate } = useSWRConfig();
  async function addNewWork(payload: FormData) {
    //call api
    try {
      const newWork = await workApi.add(payload);

      mutate((key) => Array.isArray(key) && key.includes(QueryKeys.GET_WORK_LIST), undefined, {
        revalidate: true,
      });

      return newWork;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
    //mutate work list if add successfully
  }

  return { addNewWork };
}
