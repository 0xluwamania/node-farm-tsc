import fs, { WriteStream } from 'fs';
import path from 'path'
import http, { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'dgram';
import url from 'url'
import { Iproduct } from './interface';

const replaceTemplate = (temp: string, product: Iproduct): string => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENT%}/g, product.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id.toString());
    output = output.replace(/{%QUANTITY%}/g, product.quantity)

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}
const tempOverview: string = fs.readFileSync(path.resolve(__dirname, './templates/template-overview.html'), 'utf-8')
const tempCard: string = fs.readFileSync(path.resolve(__dirname, './templates/template-card.html'), 'utf-8')
const tempProduct: string = fs.readFileSync(path.resolve(__dirname, './templates/template-product.html'), 'utf-8')
const data = fs.readFileSync(path.resolve(__dirname, './dev-data/data.json'), 'utf8')
const dataObj = JSON.parse(data)

const server = http.createServer((req: IncomingMessage, res: ServerResponse)=>{
    // const pathName = req.url;
   
    // console.log(url.parse(<string>req.url, true).query.id)

    let {query, pathname} = url.parse(<string>req.url, true)
    
    //OVERVIEW PAGE
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml: string = dataObj.map((el: Iproduct) => replaceTemplate(tempCard, el)).join('')
        const output: string = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(output)
    }

    //PRODUCT PAGE
    else if(pathname === '/product'){
        // console.log(query)
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[Number(query.id)]
        const output = replaceTemplate(tempProduct, product)
        res.end(output);
    }

    //API
    else if(pathname === '/api'){
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data)
        
        
    }
    //ERROR HANDLING PAGE
    else {
        res.writeHead(400, {'Content-type': 'text/html'})
        res.end('<h1>Fuck Off </h1>')
    }
})







// fs.readFile(path.resolve(__dirname, './dev-data/data.json'), 'utf8',(err,data)=>{
        //     if(err){
        //         res.writeHead(400, {'Content-type': 'text/html'})
        //         res.end('<h1>Fuck Off </h1>')
        //     }
    //         else if(data){
    //             res.writeHead(200, {'Content-type': 'application/json'})
    //             const productData = JSON.parse(data);
    //             console.log(productData)
    //             res.end(data);
    //         }
    //     })




// const writer = fs.createWriteStream(path.resolve(__dirname, './txt/req.txt'));

// const server = http.createServer((req: IncomingMessage, res: ServerResponse) =>{
//     if (req.method === "GET"){
//         let params = {...req}
//         let h = <string>req.connection.remoteAddress;
//         console.log(h)
//         // req.pipe(writer)

//         fs.writeFile(path.resolve(__dirname, './txt/req.json'), h,  err =>{
//             console.log(`Error Message`)
//             res.end('Lets Go!!!')
//         })
//     }
   
// })
server.listen(3100);



/////////////////FILE////////

// let curDir: string = path.resolve(__dirname, './txt/input.txt')
// let outDir: string = path.resolve(__dirname, './txt/output.txt')
// //Blocking Synchronous way
// const textIn: string = fs.readFileSync(curDir, 'utf-8')
// const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${new Date().toISOString()}`
// fs.writeFileSync(outDir, textOut);

// console.log('file written');

// //Non Blocking Asynchronous Way
// fs.readFile(path.resolve(__dirname, './txt/start.txt'), 'utf-8', (err, data1) =>{
//     fs.readFile(path.resolve(__dirname, `./txt/${data1}.txt`), 'utf-8', (err, data2) =>{
//         console.log(data2);
//         fs.readFile(path.resolve(__dirname, './txt/append.txt'), 'utf-8', (err,data3)=>{
//             console.log(data3);
//             fs.writeFile(path.resolve(__dirname, './txt/final.txt'), `${data2}\n${data3}`, 'utf-8', err=>{
//                 console.log('successful');
//             })
//         })
//     })
// })