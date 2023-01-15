const mongoose = require("mongoose")

const validator = require("validator")

mongoose.set("strictQuery", false)
mongoose.connect("mongodb://localhost:27017/validation", {
    useNewurlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("db Connected ")
}).catch((err) => console.log(err))

const mongoosePlaylist = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 2,
            maxlength: 30

        },
        ctype: {
            type: String,
            required: true,
            lowercase: true,
            enum: ["frontend", "backend", "database"]
        },
        active: Boolean,
        videos: {
            type: Number,
            validate(value) {
                if (value < 0) {
                    throw new Error("count should be positive")
                }
            }
        },
        author:String,
        email:{
            type:String,
            required:true,
            unique:true,
            validate(value){ 
                if(!validator.isEmail(value)){
                    throw new Error("email is invalid")
                }
            }
        }
    })

const playlist = new mongoose.model("Playlist", mongoosePlaylist)

const createplaylist = async () => {
    try {
        const mongoose1 = new playlist({
            name: "mongoose",
            ctype: "database",
            active: true,
            videos: 90,
            author:"Tazmeen",
            email:"tazmeenilsa@12gmail.com"

        })

        const result = await playlist.insertMany([mongoose1])
        console.log(result)
    }
    catch (err) {
        console.log(err)
    }
}
createplaylist()