import { Schema, createConnection, Types } from 'mongoose';
import { Project as ProjectType } from './types';
import { config } from 'dotenv';

if(process.env.NODE_ENV != 'production') config();

const conn = createConnection(process.env.MONGO_URI);

const ProjectSchema = new Schema<ProjectType>({
    name: String,
    members: Array,
    owner: String, // will be googleid of user
    description: String,
    roles: Array,
    id: Types.ObjectId
});

const Project = conn.model('User', ProjectSchema, 'users');
export { Project }