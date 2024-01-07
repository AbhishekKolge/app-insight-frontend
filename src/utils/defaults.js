const DROPZONE_IMAGE_FORMAT = {
  'image/jpeg': [],
  'image/jpg': [],
  'image/png': [],
};

const IMAGE_EXTENSIONS = ['jpeg', 'jpg', 'png'];

const MAX_FILE_SIZE = 1024 * 1024;

const UNITS = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

const PAGE_SIZE = 10;

const DEBOUNCE_TIME = 1000;

const THROTTLE_TIME = 5000;

const DEFAULT_PAGE = 1;

export {
  DROPZONE_IMAGE_FORMAT,
  IMAGE_EXTENSIONS,
  MAX_FILE_SIZE,
  UNITS,
  PAGE_SIZE,
  DEBOUNCE_TIME,
  THROTTLE_TIME,
  DEFAULT_PAGE,
};
