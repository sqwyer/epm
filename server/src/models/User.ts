import { Schema, createConnection } from "mongoose"
import { config } from "dotenv"
import { User as UserType } from "./types"

if (process.env.NODE_ENV != "production") config()

const conn = createConnection(process.env.MONGO_URI)

const UserSchema = new Schema<UserType>({
    id: String,
    displayName: String,
    language: String,
    email: String,
    emails: Array,
    picture: String,
    projects: Array,
})

const User = conn.model("User", UserSchema, "users")

export { User }
