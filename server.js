//npm init
//npm i cors express express-fileupload uuid
//npm i nodemon concurrently -D
const express = require('express');
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } =require('uuid');
const cors = require('cors');
const path = require('path');

const app = express();//create web server
app.use(cors());
app.use(fileUpload());

app.post("/upload", (req, res)=>{
  if( ! req.files || !req.files.file) {
    return res.status(400).json({
      error:"NO file uploaded",
    });
  }
  const file = req.files.file;
  const maxSize = 10* 1024* 1024;
  if(file.size > maxSize) {
    return res.status(400).json({
      error: "File size is exceed 10M",
    });
  }

  const fileName = uuidv4() + path.extname(file.name);
  const upload_dir = `${__dirname}/client/public/uploads`;

  file.mv(`${upload_dir}/${fileName}`, (err)=>{
    if(err){ 
      return res.status(500).send(err);
    }
    res.json({
      fileName: fileName,
      filePath: `/uploads/${fileName}`,
    });
  });
});

app.listen(80, ()=>console.log('server is running on http://localhost:80'));
