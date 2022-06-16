import fs from 'fs';
import path from 'path'

let curDir: string = path.resolve(__dirname, './txt/input.txt')
let outDir: string = path.resolve(__dirname, './txt/output.txt')
//Blocking Synchronous way
const textIn: string = fs.readFileSync(curDir, 'utf-8')
const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${new Date().toISOString()}`
fs.writeFileSync(outDir, textOut);

console.log('file written');

//Non Blocking Asynchronous Way
fs.readFile(path.resolve(__dirname, './txt/start.txt'), 'utf-8', (err, data1) =>{
    fs.readFile(path.resolve(__dirname, `./txt/${data1}.txt`), 'utf-8', (err, data2) =>{
        console.log(data2);
        fs.readFile(path.resolve(__dirname, './txt/append.txt'), 'utf-8', (err,data3)=>{
            console.log(data3);
            fs.writeFile(path.resolve(__dirname, './txt/final.txt'), `${data2}\n${data3}`, 'utf-8', err=>{
                console.log('successful');
            })
        })
    })
})