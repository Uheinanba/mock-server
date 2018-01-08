const isFormEl = ($el, attr) => {
  return (
    $el.find(`input${attr}`).length > 0 || $el.find(`select${attr}`).length > 0
  );
};

export const getValsByNames = ($el, names) => {
  let tmp = {};
  names.forEach(name => {
    let attr = `[name='${name}']`;
    let $myEl = $el.find(attr);
    tmp[name] = isFormEl($el, attr) ? $myEl.val() : $myEl.html();
    tmp[name] = typeof tmp[name] === 'string' ? tmp[name].trim() : tmp[name];
    $myEl = null;
    attr = null;
  });
  return tmp;
};

export const setValsByNames = ($el, names, values) => {
  names.forEach(name => {
    let attr = `[name='${name}']`;
    let $myEl = $el.find(attr);
    isFormEl($el, attr) ? $myEl.val(values[name]) : $myEl.html(values[name]);
    $myEl = null;
    attr = null;
  });
};
