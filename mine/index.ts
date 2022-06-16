import fs from 'fs';
import path from 'path'


let curDir: string = path.resolve(__dirname, './txt/input.txt')
let outDir: string = path.resolve(__dirname, './txt/output.txt')
const textIn: string = fs.readFileSync(curDir, 'utf-8')
const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${new Date().toISOString()}`
fs.writeFileSync(outDir, textOut);

console.log('file written');