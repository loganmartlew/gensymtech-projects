import { GetProject } from '@gensymtech-projects/api-interfaces';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';

export const projectKey = ['projects'];

export const getProject = (id: string) => {
  return fetchFromApi<GetProject>(axios.get(`/projects/${id}`));
};

export const useProject = (id: string) => {
  return useQuery([...projectKey, id], () => getProject(id));
};
