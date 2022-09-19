import {
  SELECTED_LINKS,
  UPDATE_LINK,
  DELETE_LINK,
  ADD_LINK,
  FETCH_LINKS_SUCCESS,
} from '../constants';

const INIT_STATE = {
  links: [],
};

const LinksReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_LINKS_SUCCESS:
      return {
        ...state,
        links: action.links,
      };

    case SELECTED_LINKS:
      return {
        ...state,
        linksContent: action.id,
      };

    case UPDATE_LINK:
      return {
        ...state,
        links: state.links.map((link) =>
          link.id === action.id ? { ...link, url: action.url } : link,
        ),
      };
    case DELETE_LINK:
      return {
        ...state,
        links: state.links.map((link) =>
          link.id === action.id ? { ...link, deleted: !link.deleted } : link,
        ),
      };
    case ADD_LINK:
      return {
        ...state,
        links: [
          ...state.links,
          {
            // eslint-disable-next-line no-param-reassign
            id: action.id,
            label: action.label,
            url: action.url,
            deleted: false,
          },
        ],
      };

    default:
      return state;
  }
};

export default LinksReducer;
