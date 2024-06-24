import axios from '../components/axiosSetup';

export const getLessons = (courseId) => {
  return axios.get(`/api/courses/${courseId}/lessons/`);
};

export const getMaterials = (courseId) => {
  return axios.get(`/api/courses/${courseId}/materials/`);
};