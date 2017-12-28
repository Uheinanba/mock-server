export const getValsByNames = ($el, names) => {
  let tmp = {};
  names.forEach(name => {
    const attr = `[name='${name}']`;
    if ($el.find(`input${attr}`).length > 0) {
      tmp[name] = $el.find(`input${attr}`).val();
    } else {
      tmp[name] = $el.find(attr).html();
    }
  });
  return tmp;
};

export const setValsByNames = ($el, names, values) => {
  names.forEach(name => {
    $el.find(`[name='${name}']`).val(values[name]);
  });
};
