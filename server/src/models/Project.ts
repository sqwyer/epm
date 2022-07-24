import { Schema, createConnection, Types } from "mongoose"

if (process.env.NODE_ENV != "production") require("dotenv").config()

const conn = createConnection(process.env.MONGO_URI)

type Permission =
    | "*"
    | "manage_roles"
    | "manage_tasks"
    | "manage_events"
    | "manage_members"
    | "manage_settings"

type ProjectMember = {
    id: string
    role: Types.ObjectId
}

type ProjectRole = {
    label: string
    id: Types.ObjectId
    permissions: Permission[]
}

type ProjectTask = {
    label: string
    id: Types.ObjectId
    assigned: string[]
    due: string
}

interface ProjectType {
    name: string
    members: ProjectMember[]
    pending_members: ProjectMember[]
    owner: string // will be googleid of user
    description: string
    roles: ProjectRole[]
    tasks: ProjectTask[]
}

const ProjectSchema = new Schema<ProjectType>({
    name: String,
    members: Array,
    pending_members: Array,
    owner: String, // will be googleid of user
    description: String,
    roles: Array,
    tasks: Array,
})

const ProjectModel = conn.model("Project", ProjectSchema, "projects")
export {
    ProjectSchema,
    ProjectType,
    ProjectModel,
    Permission,
    ProjectRole,
    ProjectTask,
    ProjectMember,
}
