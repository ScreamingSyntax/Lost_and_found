const pool = require("../../config/database")

module.exports = {

    viewProduct: callBack => {
        pool.query("Select item_id, item_name, item_image,found_location,found_by,found_date from items",
        (err,result,field)=>{
            // console.log("dadadadad")
            if(err){
                return callBack(err,null);
            }
            else{
                return callBack(null,result);
            }
        }
        )
    },
    addItem: (data,filePath, callBack) => {
        const imageName = filePath;
        const initialPath = "upload/images";
        console.log(`This is final path `+imageName);
        console.log(data)
        pool.query("INSERT INTO items(item_name,item_image,found_location,found_by,found_date) VALUES (?,?,?,?,?)",
            [data.item_name,
            imageName,
            data.found_location,
            data.found_by,
            data.found_date
            ],
            (err, result, fields) => {
                console.log(err)
                if (err) {
                    return callBack(err, null);
                } else {
                    return callBack(null, result);
                }
            }
        );
    },   
    removeItem:(data,callBack)=>{
        
        pool.query("Delete from items where item_image = ?",
        [data.item_image],
        (err, result, fields)=>{
            if(err){
                return callBack(err,null);
            }
            else{
                return callBack(null,result);
            }
        }
        )
    } ,
    updateItemName:(data,imagePath,callBack)=>{
        // console.log(data)
        pool.query("UPDATE items SET item_name = ?, item_image = ?, found_location = ?, found_by = ?, found_date = ? where item_id = ?",
        [data.item_name,
        imagePath,
        data.found_location,
        data.found_by,
        data.found_date, 
        data.item_id   
    ],
        (err,result,fields)=>{
            
            if(err){
                return callBack(err,null);
            }
            else{
                return callBack(null,result);
            }
        }
        )
    }
}

