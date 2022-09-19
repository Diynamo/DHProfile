import axios from 'axios';
import {
  SELECTED_LINKS,
  UPDATE_LINK,
  DELETE_LINK,
  ADD_LINK,
  FETCH_LINKS_SUCCESS,
} from '../constants';

export const fetchLinks = () => (dispatch) => {
  axios
    .get('/api/data/links/LinksData')
    .then((response) => {
      dispatch({
        type: FETCH_LINKS_SUCCESS,
        links: response.data,
      });
    })
    .catch((err) => err);
};

export const openLink = (id) => ({
  type: SELECTED_LINKS,
  id,
});

export const deleteLink = (id) => ({
  type: DELETE_LINK,
  id,
});
export const updateLink = (id, url) => ({
  type: UPDATE_LINK,
  id: id,
  url: url,
});

export const addLink = (id, label, url) => ({
  type: ADD_LINK,
  id: id,
  label: label,
  url: url,
  deleted: false,
});
