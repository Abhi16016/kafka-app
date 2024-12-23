"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const readline = __importStar(require("readline"));
// Import Kafka client
const client_1 = require("./client");
// Initialize readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = client_1.kafka.producer();
        try {
            console.log("Connecting Producer...");
            yield producer.connect();
            console.log("Producer Connected Successfully");
            rl.setPrompt("> ");
            rl.prompt();
            rl.on("line", (line) => __awaiter(this, void 0, void 0, function* () {
                const [riderName, location] = line.split(" ");
                if (!riderName || !location) {
                    console.log("Invalid input. Please provide input in the format: <riderName> <location>");
                    rl.prompt();
                    return;
                }
                try {
                    yield producer.send({
                        topic: "rider-updates",
                        messages: [
                            {
                                partition: location.toLowerCase() === "north" ? 0 : 1,
                                key: "location-update",
                                value: JSON.stringify({ name: riderName, location }),
                            },
                        ],
                    });
                    console.log(`Message sent for rider "${riderName}" with location "${location}".`);
                }
                catch (error) {
                    console.error("Error sending message:", error);
                }
                rl.prompt();
            }));
            rl.on("close", () => __awaiter(this, void 0, void 0, function* () {
                console.log("Disconnecting Producer...");
                yield producer.disconnect();
                console.log("Producer Disconnected. Goodbye!");
                process.exit(0);
            }));
        }
        catch (error) {
            console.error("Error initializing producer:", error);
            process.exit(1);
        }
    });
}
init();
