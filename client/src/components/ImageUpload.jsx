import { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from '../request/axios';//不能导入原生的axios,应该是自己封装后的axios.js
import { isEmpty } from 'lodash'; //object, array可以用lodash来检查是否为空

const ImageUpload = () => {
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [file, setFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});
  const onChange = (e) => {
    console.log('e', e.target.files);
    if (e.target.files.length)
      setFile(e.target.files[0]);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    console.log('formdata: ', formData);

    try {
      const res = await axios.post('/upload', formData, {
        onUploadProgress: (ProgressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            )
          );
        },
      });
      //clear percentage
      const { fileName, filePath } = res.data;
      setTimeout(() => {
        setUploadPercentage(0);
        setUploadedFile({ fileName, filePath });
      }, 5000);
    }
    catch (error) {
      if (error.response) {
        const [status, data] = error.response;
        if (status === 400) { setMessage(`BAD request: ${data.error}`); }
        else if (status === 500) { setMessage(`SERVER error: ${data.error} `); }
        else { setMessage(data.error) }
      }
      else { setMessage('AN unexpected error occurred'); }

      setUploadPercentage(0);//无论上传是否成功，都重置为0
    }
  };

  return (  //Fragment 包裹多个元素但不生成额外 DOM
    <Fragment>
      {message &&    //短路运算（logical AND）实现条件渲染 //if (message) return <Message />
        <Message message={message} setMessage={setMessage} />
      }
      <form onSubmit={onSubmit}>
        <div className="input-group mb-3">
          <input type="file" className="form-control" onChange={onChange} />
        </div>
        <Progress percentage={uploadPercentage} />
        <input
          type="submit" value='Upload'
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {!isEmpty(uploadedFile) && (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              src={uploadedFile.filePath}
              alt="uploaded file"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )

      }
    </Fragment>
  )
}

export default ImageUpload;