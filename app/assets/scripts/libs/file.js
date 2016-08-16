import {initialSetup} from "./setup";

const fs = window.require("fs");
const mkdirp = window.require("mkdirp");

export default class File {

    constructor() {
        this.setupFileName = "requesto.json";
        this.setupFilePath = `/Users/${window.process.env.USER}/.requesto/`;
        this.setupFileURL = `${this.setupFilePath}${this.setupFileName}`
        this.initialSetup = initialSetup;
        this.createSetupFolder = this.createSetupFolder.bind(this);
        this.createSetupFile = this.createSetupFile.bind(this);
        this.loadSetupFile = this.loadSetupFile.bind(this);
    }

    createSetupFolder(callback) {
        mkdirp(this.setupFilePath, (err) => {
            console.log("createSetupFolder: ", "An error ocurred creating the file " + err);
            return callback();
        });
    }

    createSetupFile(callback) {
        this.createSetupFolder(() => {
            fs.writeFile(this.setupFileURL, JSON.stringify(this.initialSetup), (err) => {
                if (err) {
                    console.log("createSetupFile: ", "An error ocurred creating the file " + err);
                    return;
                }
                this.callback(this.initialSetup);
                console.log("createSetupFile: ", "The file has been succesfully saved");
            });
        })
    }

    loadSetupFile(callback) {
        fs.readFile(this.setupFileURL, 'utf-8', (err, data) => {
            if (err) {
                console.log("loadSetupFile: ", err.message);
                // alert("An error ocurred reading the file :" + err.message);
                this.createSetupFile(callback);
                return;
            }
            // Change how to handle the file content
            //data
            console.log("loadSetupFile: ", "The file has been succesfully loaded");
            callback(JSON.parse(data));
        })
    }

    updateSetupFile(content) {
        this.createSetupFolder(() => {
            fs.writeFile(this.setupFileURL, JSON.stringify(content), (err) => {
                if (err) {
                    console.log("updateSetupFile: ", "An error ocurred creating the file " + err);
                    return;
                }
                console.log("updateSetupFile: ", "The file has been succesfully updated");
            });
        })
    }
}
