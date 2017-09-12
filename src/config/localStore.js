/**
 * Created by rain on 2017/9/12.
 */

// 将值存储在localStorage
export const setStore = (name, content) => {
  if(!name) return;
  if(typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

// 从localStorage 中获取值
export const getStore = name => {
  if (!name) return;
  const content = window.localStorage.getItem(name);
  return JSON.parse(content);
};
