
const fs=require("fs");
let arguments=process.argv.slice(2); 

let flags= [];
let filenames= [];
let secondaryarg=[];
for(let i of arguments){
    if(i[0]=="-"){
       flags.push(i);
    }
    else if(i[0]=="%"){
        secondaryarg.push(i.slice(1)); 
    }
    else{
       filenames.push(i);
    }
}
//flag mainly involving write operations
for(flag of flags){
    let fileData="";
    if(flag=="-cat"){
        //appending all the files data to the last file in the files
        fileData += fs.readFileSync(filenames[filenames.length-1],"utf-8");
        for(let i=0;i<filenames.length-1;i++){
            fileData +=fs.readFileSync(filenames[i],"utf-8");
        }
        fs.writeFileSync(filenames[filenames.length-1],fileData);
    } 
    else if(flag=="-mrg"){
        //in these case last file is not present we are creating file and merging/copying all the
        //files data to that file.. if file is present it's own data is erased
        for(let i=0;i<filenames.length-1;i++){
            fileData +=fs.readFileSync(filenames[i],"utf-8");
            fileData +="\n";
        }
        fs.writeFileSync(filenames[filenames.length-1],fileData);
    }
    else if(flag=="-new"){
        // -new flag is used to create the files with names of all the arguments passed
        for(file of filenames){
            fs.writeFileSync(file,"");
        }
    }
}//but below operations will display the files data 

//operations which involve already created files and operation on each files
for(files of filenames){
    let filedata=fs.readFileSync(files,"utf-8");
    for(let flag of flags){
        if(flag=="-rs"){
            // -rs flag is used to remove the spaces 
           filedata=filedata.split(" ").join("");
        }
        else if(flag=="-rn"){
            // -rn flag is used to remove lines
            filedata=filedata.split("\n").join("");
        }
        else if(flag=="-rsc"){
            //remove special char  given in seconddary arg  &%*#@&1235
         for(let argu of secondaryarg){
             filedata= filedata.split(argu).join("");
         }   
        }
        else if(flag=="-s"){
            // -s flag is uesd to add line no sequentially
            filedata = filedata.split("\n");
            let count = 1;
            let tempd = "";
            for(let i=0;i<filedata.length;i++){
                tempd += count + " " + filedata[i] + "\n";
                count++;
            }
            filedata = tempd;
        }
        else if(flag=="-sn"){
            // -sn flag is used to add line no. sequentially to the non-empty lines
            filedata = filedata.split("\n");
            let count = 1;
            let tempd = "";
            for(let i=0;i<filedata.length;i++){
                if(filedata[i]!=""){
                    tempd += count + " " + filedata[i] + "\n";
                    count++;
                }else{
                    tempd += "\n";
                }
            }
            filedata = tempd;
        }
        else if(flag == "-rel"){
            //-rel flag is used to remove extra line from the file and adding line number to file
            filedata = filedata.split("\n");
            let tempd = "";
            let count = 1;
            for(let i=0;i<filedata.length;i++){
                if(filedata[i-1] =="" && filedata[i] == "" ){
                }
                else{
                    tempd += count + " " + filedata[i] + "\n";
                    count++;
                }
            }
            filedata = tempd;
            //making chages in the file too
            fs.writeFileSync(files,filedata);
        }

    }
    console.log(filedata); 
}



