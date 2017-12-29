1. 创建mock数据
  1.1: 返回错误码／错误信息/描述 等是否正确
  1.2: url 前面输入'/'和不输入'/'应该返回值是一样的
  1.3: 测试fcp/http切换时候状态结构改变，但是之前填写的data数据没有变化
  1.4: 测试 接口耗时是否有效
    ```
      $('.j-test___timer').on('click', () => {
        $.ajax({
          headers: {
            pid: 1,
          },
          url: '/t3',
          type: 'GET',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
        });
      }); 
    ```
  1.5: 测试预览效果
  1.6: 测试提交数据并且能够正确的在列表页面显示
  1.7: 测试使用mockjs 的数据能够争取的预览并且能够正确的提交
    ```
      'name': {
        'first': '@FIRST',
        'middle': '@FIRST',
        'last': '@LAST',
        'full': '@first @middle @last'
      }
    ```