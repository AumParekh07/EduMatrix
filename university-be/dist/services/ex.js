"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// creating a schema for strings
const mySchema = zod_1.z.string();
// parsing
mySchema.parse("tuna"); // => "tuna"
mySchema.parse(12);
