export const getValsByNames = ($el, names) => {
  let tmp = {};
  names.forEach(name => {
    tmp[name] = $el.find(`[name='${name}']`).val();
  });
  return tmp;
};

export const setValsByNames = ($el, names, values) => {
  names.forEach(name => {
    $el.find(`[name='${name}']`).val(values[name]);
  });
};
