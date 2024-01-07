import { useReducer, useCallback } from 'react';
import _ from 'lodash';

import { DEBOUNCE_TIME, DEFAULT_PAGE } from '@/utils/defaults';

const initialFilterState = {
  page: DEFAULT_PAGE,
  sortKey: null,
  sortMethod: null,
  nullishSort: false,
  sortType: null,
  search: null,
  genreId: [],
  contentRatingId: [],
  categoryId: [],
  type: [],
  rating: null,
  ratingOperator: null,
  review: null,
  reviewOperator: null,
  size: null,
  sizeOperator: null,
  installCount: null,
  installCountOperator: null,
  price: null,
  priceOperator: null,
};

const initialHelperState = {
  search: '',
};

const queryFilterReducer = (state, action) => {
  if (action.type === 'CHANGE_PAGE') {
    return {
      ...state,
      page: action.page,
    };
  }
  if (action.type === 'SET_FILTERS') {
    return {
      ...state,
      ...action.filters,
    };
  }
  if (action.type === 'SET_SORT') {
    return {
      ...state,
      sortKey: action.sortKey,
      sortMethod: action.sortMethod,
      sortType: action.sortType,
      nullishSort: action.nullishSort,
    };
  }
  if (action.type === 'SEARCH') {
    return {
      ...state,
      page: initialFilterState.page,
      search: action.search,
    };
  }
  if (action.type === 'CLEAR_TYPE') {
    return {
      ...state,
      page: initialFilterState.page,
      type: [],
    };
  }
  if (action.type === 'SET_TYPE') {
    return {
      ...state,
      page: initialFilterState.page,
      type: [...state.type, action.value],
    };
  }
  if (action.type === 'REMOVE_TYPE') {
    const updated = state.type.filter((id) => id !== action.value);
    return {
      ...state,
      page: initialFilterState.page,
      type: updated,
    };
  }
  if (action.type === 'CLEAR_CATEGORY') {
    return {
      ...state,
      page: initialFilterState.page,
      categoryId: [],
    };
  }
  if (action.type === 'CLEAR_GENRE') {
    return {
      ...state,
      page: initialFilterState.page,
      genreId: [],
    };
  }
  if (action.type === 'CLEAR_CONTENT_RATING') {
    return {
      ...state,
      page: initialFilterState.page,
      contentRatingId: [],
    };
  }
  if (action.type === 'ADD_CATEGORY') {
    return {
      ...state,
      page: initialFilterState.page,
      categoryId: [...state.categoryId, action.value],
    };
  }
  if (action.type === 'ADD_GENRE') {
    return {
      ...state,
      page: initialFilterState.page,
      genreId: [...state.genreId, action.value],
    };
  }
  if (action.type === 'ADD_CONTENT_RATING') {
    return {
      ...state,
      page: initialFilterState.page,
      contentRatingId: [...state.contentRatingId, action.value],
    };
  }
  if (action.type === 'REMOVE_CATEGORY') {
    const updated = state.categoryId.filter((id) => id !== action.value);
    return {
      ...state,
      page: initialFilterState.page,
      categoryId: updated,
    };
  }
  if (action.type === 'REMOVE_GENRE') {
    const updated = state.genreId.filter((id) => id !== action.value);
    return {
      ...state,
      page: initialFilterState.page,
      genreId: updated,
    };
  }
  if (action.type === 'REMOVE_CONTENT_RATING') {
    const updated = state.contentRatingId.filter((id) => id !== action.value);
    return {
      ...state,
      page: initialFilterState.page,
      contentRatingId: updated,
    };
  }
  if (action.type === 'CLEAR_ALL_FILTER') {
    return {
      ...state,
      search: null,
      page: initialFilterState.page,
      genreId: [],
      contentRatingId: [],
      categoryId: [],
      type: [],
      rating: null,
      ratingOperator: null,
      review: null,
      reviewOperator: null,
      size: null,
      sizeOperator: null,
      installCount: null,
      installCountOperator: null,
      price: null,
      priceOperator: null,
    };
  }
  if (action.type === 'ADD_RATING') {
    return {
      ...state,
      page: initialFilterState.page,
      rating: action.value,
      ratingOperator: action.operator,
    };
  }
  if (action.type === 'REMOVE_RATING') {
    return {
      ...state,
      page: initialFilterState.page,
      rating: null,
      ratingOperator: null,
    };
  }
  if (action.type === 'ADD_INSTALL_COUNT') {
    return {
      ...state,
      page: initialFilterState.page,
      installCount: action.value,
      installCountOperator: action.operator,
    };
  }
  if (action.type === 'REMOVE_INSTALL_COUNT') {
    return {
      ...state,
      page: initialFilterState.page,
      installCount: null,
      installCountOperator: null,
    };
  }
  return initialFilterState;
};

const helperReducer = (state, action) => {
  if (action.type === 'DISABLE_FIRST_RENDER') {
    return {
      ...state,
    };
  }
  if (action.type === 'SEARCH') {
    return {
      ...state,
      search: action.search,
    };
  }
  return initialHelperState;
};

const useNonQueryFilter = () => {
  const [queryFilterState, dispatchQueryFilter] = useReducer(
    queryFilterReducer,
    initialFilterState
  );
  const [helperState, dispatchHelper] = useReducer(
    helperReducer,
    initialHelperState
  );

  const buildQueryParamHandler = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);
    return params.toString();
  };

  const nextPageHandler = () => {
    dispatchQueryFilter({
      type: 'CHANGE_PAGE',
      page: queryFilterState.page + 1,
    });
  };

  const prevPageHandler = () => {
    dispatchQueryFilter({
      type: 'CHANGE_PAGE',
      page: queryFilterState.page - 1,
    });
  };

  const sortHandler = ({ sortKey, sortMethod, sortType, nullishSort }) => {
    dispatchQueryFilter({
      type: 'SET_SORT',
      sortKey,
      sortMethod,
      sortType,
      nullishSort,
    });
  };

  const debouncedHandleSearch = useCallback(
    _.debounce((search) => {
      dispatchQueryFilter({ type: 'SEARCH', search });
    }, DEBOUNCE_TIME),
    []
  );

  const searchHandler = (e) => {
    const search = e.target.value;
    dispatchHelper({ type: 'SEARCH', search });
    debouncedHandleSearch(search);
  };

  const setTypeHandler = (value) => {
    if (queryFilterState.type.includes(value)) {
      dispatchQueryFilter({ type: 'REMOVE_TYPE', value });
      return;
    }
    dispatchQueryFilter({ type: 'SET_TYPE', value });
  };

  const clearTypeHandler = () => {
    dispatchQueryFilter({ type: 'CLEAR_TYPE' });
  };

  const clearCategory = () => {
    dispatchQueryFilter({ type: 'CLEAR_CATEGORY' });
  };
  const clearGenre = () => {
    dispatchQueryFilter({ type: 'CLEAR_GENRE' });
  };
  const clearContentRating = () => {
    dispatchQueryFilter({ type: 'CLEAR_CONTENT_RATING' });
  };
  const addCategory = (value) => {
    if (queryFilterState.categoryId.includes(value)) {
      dispatchQueryFilter({ type: 'REMOVE_CATEGORY', value });
      return;
    }
    dispatchQueryFilter({ type: 'ADD_CATEGORY', value });
  };
  const addGenre = (value) => {
    if (queryFilterState.genreId.includes(value)) {
      dispatchQueryFilter({ type: 'REMOVE_GENRE', value });
      return;
    }
    dispatchQueryFilter({ type: 'ADD_GENRE', value });
  };
  const addContentRating = (value) => {
    if (queryFilterState.contentRatingId.includes(value)) {
      dispatchQueryFilter({ type: 'REMOVE_CONTENT_RATING', value });
      return;
    }
    dispatchQueryFilter({ type: 'ADD_CONTENT_RATING', value });
  };

  const clearAllFilters = () => {
    dispatchQueryFilter({ type: 'CLEAR_ALL_FILTER' });
    dispatchHelper({ type: 'SEARCH', search: '' });
  };

  const addRatingHandler = ({ value, operator }) => {
    dispatchQueryFilter({ type: 'ADD_RATING', value, operator });
  };

  const removeRatingHandler = () => {
    dispatchQueryFilter({ type: 'REMOVE_RATING' });
  };
  const addInstallCountHandler = ({ value, operator }) => {
    dispatchQueryFilter({ type: 'ADD_INSTALL_COUNT', value, operator });
  };

  const removeInstallCountHandler = () => {
    dispatchQueryFilter({ type: 'REMOVE_INSTALL_COUNT' });
  };

  return {
    queryFilterState,
    helperState,
    methods: {
      nextPageHandler,
      prevPageHandler,
      sortHandler,
      searchHandler,
      clearCategory,
      clearGenre,
      clearContentRating,
      addCategory,
      addGenre,
      addContentRating,
      clearAllFilters,
      setTypeHandler,
      clearTypeHandler,
      addRatingHandler,
      removeRatingHandler,
      addInstallCountHandler,
      removeInstallCountHandler,
    },
  };
};

export { useNonQueryFilter };
