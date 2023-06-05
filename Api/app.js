const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./config/database")
const fs = require('fs')


app.use(cors({
    origin:'*'
}))
const adminRouter = require('./api/admin/admin.router');
const { resolve } = require("path");
const { rejects } = require("assert");
app.use(express.json());
app.use("/api/admin/",adminRouter);
app.use("/item_image", express.static('upload/images'))
// app.use("/register", express.static('upload/images'))
const port = 8000;

app.listen(port,()=>{
    console.log("Server running on port ",port);
});



const dataBaseImages = []
const pathImages = []
async function ls(path){
    const dir = await fs.promises.opendir(path)
    for await(const fuiles of dir){
       pathImages.push(fuiles.name)
    }
}

async function cleaning() {
    return new Promise((resolve, reject) => {
      pool.query("SELECT item_image FROM items", [], (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          results.forEach((e) => {
            dataBaseImages.push(e.item_image);
          });
          resolve();
        }
      });
    });
  }

async function deletion(){
    console
    dataBaseImages.forEach((e)=>{
        if(!e in pathImages ){
            console.log("true")
        }
        else{
            console.log("false")
        }
    })
}

ls('./upload/images/').then(()=>cleaning()).then(()=>deletion())


