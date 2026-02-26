// 快捷键	含义
// rfc	函数组件（默认导出）
// rfce	函数组件 + export
// rafc	箭头函数组件
// rafce	箭头函数 + export
// rcc	class 组件
// useState	自动生成 hook
import React from 'react';

function Message({ message, setMessage }) {
  return (
    <div className='alert alert-warning alert-dismissible fade show'
      role='alert'
    >
      {message}
      <button type='button' className='btn-close' aria-label='Close'
        onClick={() => setMessage('')}
      ></button>
    </div>
  );
}

export default Message;