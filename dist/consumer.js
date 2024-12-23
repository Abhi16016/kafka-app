"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const group = process.argv[2] || "user-1";
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = client_1.kafka.consumer({ groupId: group });
        console.log("Consumer connecting...");
        yield consumer.connect();
        console.log("Consumer connected");
        yield consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });
        yield consumer.run({
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                if (!message.value)
                    return;
                console.log(`GROUP:${group}
        TOPIC:[${topic}]
        PARTITION:${partition}
        MESSAGE:${message.value}`);
            }),
        });
    });
}
init().catch(console.error);
