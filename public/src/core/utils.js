export const getValsByNames = ($el, names) => {
  let tmp = {};
  names.forEach(name => {
    tmp[name] = $el.find(`[name='${name}']`).val();
  });
  return tmp;
  tmp = null;
};
