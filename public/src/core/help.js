import { SETTING_FCP_TYPE, SETTING_HTTP_TYPE } from '../config';

// 尝试修复编辑器的值
export const fixAceEditorVal = val => val.replace(/\'/g, '"');

/**
 * 将用户在ace编辑器中输入的值和 置面板设置的值 合并成一个有序的对象
 * @param {boolean} isFcp 是否是 fcp
 * @param {array} settings  设置面板表单中的值
 * @param {string | json} editorVal aec编辑器中的值
 * @return {object}
 */
export const setInitMockData = (isFcp, settings, editorVal) => {
  let _mockData = _.merge({}, isFcp ? SETTING_FCP_TYPE : SETTING_HTTP_TYPE);
  const { errCodeKey, errMsgKey, errCode, errMsg } = settings;
  const editorData = JSON.parse(fixAceEditorVal(editorVal));
  const getSetProp = prop => (isFcp ? `Value.${prop}` : `${prop}`);
  const data = _.merge(
    {},
    editorData.data || {},
    editorData.Value ? editorData.Value.data : {},
  );

  errCodeKey && _.set(_mockData, getSetProp(errCodeKey), errCode);
  errMsgKey && _.set(_mockData, getSetProp(errMsgKey), errMsg);
  _.set(_mockData, getSetProp('data'), data);
  return _mockData;
};

/**
 * 从Url里获取参数值
 * @param {String} name
 * @return {String}
 */
export const getUrlParam = function(name) {
  var search = window.location.search.substr(1);
  if (!search) return null;

  //构造一个含有目标参数的正则表达式对象
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var matches = search.match(reg);
  return matches != null ? decodeURIComponent(matches[2]) : null;
};
