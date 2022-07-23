import { Schema, createConnection, Types } from "mongoose"
import { config } from "dotenv"

if (process.env.NODE_ENV != "production") config()

const conn = createConnection(process.env.MONGO_URI)

interface UserType {
    id: string
    displayName: string
    language: string
    email: string
    emails: string[]
    picture: string
    projects: Types.ObjectId[]
}

const UserSchema = new Schema<UserType>({
    id: String,
    displayName: String,
    language: String,
    email: String,
    emails: Array,
    picture: String,
    projects: Array,
})

const UserModel = conn.model("User", UserSchema, "users")

export { UserType, UserSchema, UserModel }
