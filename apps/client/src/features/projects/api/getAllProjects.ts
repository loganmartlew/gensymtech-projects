import { GetAllProjects } from '@gensymtech-projects/api-interfaces';
import { useQuery } from 'react-query';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';

export const allProjectsKey = ['projects'];

export const getAllProjects = () => {
  return fetchFromApi<GetAllProjects>(axios.get('/projects'));
};

export const useAllProjects = () => {
  return useQuery(allProjectsKey, getAllProjects);
};
