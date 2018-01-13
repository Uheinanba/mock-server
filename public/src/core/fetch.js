/**
 * @param: successMsg 成功信息
 */
export default options => {
  return new Promise((resolve, reject) => {
    $.ajax(
      _.extend(
        {
          type: 'POST',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
        },
        options,
        {
          data: JSON.stringify(options.data),
        },
      ),
    )
      .done(res => {
        if (res.errCode !== 0)
          return toastr.error(res.errMsg, '错误'), reject();
        options.successMsg &&
          toastr.success(options.successMsg, '成功') &&
          resolve();
      })
      .fail(() => {
        reject();
        toastr.error(
          `${options.url.replace(/.*(\/.*)/, '$1')}接口调用失败`,
          '错误',
        );
      });
  });
};
