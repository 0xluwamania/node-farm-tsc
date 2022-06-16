"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let curDir = path_1.default.resolve(__dirname, './txt/input.txt');
let outDir = path_1.default.resolve(__dirname, './txt/output.txt');
const textIn = fs_1.default.readFileSync(curDir, 'utf-8');
const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${new Date().toISOString()}`;
fs_1.default.writeFileSync(outDir, textOut);
console.log('file written');
