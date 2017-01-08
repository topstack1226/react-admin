import yaml from 'js-yaml';
import _ from 'underscore';
import slug from 'slug';

/**
 * Converts the object into YAML string.
 * @param {Object} object
 * @return {String} yaml
 */
export const toYAML = (obj) => (!_.isEmpty(obj)) ? yaml.safeDump(obj, {indent:2}) : '';

/**
 * Converts the YAML string into JS object.
 * @param {String} string
 * @return {Object} obj
 */
export const toJSON = (yamlString) => (yamlString ? yaml.load(yamlString) : {});

/**
 * Capitalize the given string.
 * @param {String} string
 * @return {String} string
 */
export const capitalize = (string) => {
  if(!string) return '';
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
};

/**
 * Convert the given string into title case format.
 * @param {String} string
 * @return {String} string
 */
export const toTitleCase = (string) => {
  if(!string) return '';
  return string.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * Slugify the given string
 * @param {String} string
 * @return {String} string
 */
export const slugify = (string) => {
  if (!string) return '';
  return slug(string,{lower:true}).replace(/^-+|-+$/g, '');
};

/**
 * Returns filename from the given path
 * @param {String} path
 * @return {String} filename
 */
export const getFilenameFromPath = (path) => {
  if (!path) return '';
  return path.substring(path.lastIndexOf('/') + 1);
};

/**
 * returns the uploaded static files that are being overwritten
 * @param {Array} uploadedFiles
 * @param {Array} currentFiles
 * @return {Array} filenames
 */
export const existingUploadedFilenames = (uploadedFiles, currentFiles) => {
  if ((uploadedFiles && !uploadedFiles.length) || (currentFiles && !currentFiles.length)){
    return [];
  }
  const currentFilenames = _.map(currentFiles, cf => getFilenameFromPath(cf.path));
  return _.chain(uploadedFiles)
    .filter(file => currentFilenames.indexOf(file.name) > -1)
    .map(file => file.name)
    .value();
};
