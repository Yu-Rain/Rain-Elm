/**
 * Created by rain on 2017/9/7.
 */

export default async(url='', data={}, type='GET') => {

  type = type.toUpperCase();

  // 路径后面拼接参数
  var dataStr = '';
  var getURL = url;
  Object.keys(data).forEach(key=>{
    dataStr += key + '=' + data[key] + '&';
  });

  // 如果路径参数字符串不为空, 就拼接到路径后面.
  if (dataStr !== '') {
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    getURL = url + '?' + dataStr;
  }



  if (window.fetch) {

    // 配置请求头 Request 对象
    let requestConfig = {

      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors', // 允许跨域请求
      cache: 'force-cache' // 强制缓存.

    };


    switch (type) {
      case 'GET':
        // 如果是GET方式请求数据, 需要在
        url = getURL;
        break;
      case 'POST':
        Object.defineProperty(
          requestConfig, 'body', {
            value: JSON.stringify(data)
          }
        );
        break;
    }



    try {

        const response = await fetch(url, requestConfig);

        // TODO
        const responseJSON = response.json();

        return responseJSON;

      } catch (error) {
        console.log(error);
      }


  } else {

    console.log('不支持fetch');

    return new Promise((resolve, reject) => {

      let requestObj;

      requestObj = new XMLHttpRequest();

      let sendData = '';

      switch (type) {
        case 'GET':
          url = getURL;
          break;
        case 'POST':
          sendData = JSON.stringify(data);
          break;
      }

      // TODO
      requestObj.open(type, url, true);
      requestObj.setRequestHeader(
        'Content-type', 'application/json');
      requestObj.setRequestHeader(
        'Accept', 'application/json');

      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4 && requestObj.status === 200) {

          let obj = requestObj.response;
          if (typeof obj !== 'object') {
            obj = JSON.parse(obj);
          }
        } else {
          reject(requestObj);
        }
      }
    })

  }






}



