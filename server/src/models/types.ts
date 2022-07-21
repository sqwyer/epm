import { Types } from 'mongoose';

type Permission =
    'manager'
    |'manage_roles'
    |'manage_tasks'
    |'manage_events'
    |'manage_members'
    |'manage_settings';

type ProjectMember = {
    id: string,
    role: Types.ObjectId
}

type ProjectRole = {
    label: string,
    id: Types.ObjectId,
    permissions: Permission[]
}

type Project = {
    name: string,
    members: ProjectMember[],
    owner: string, // will be googleid of user
    description: string,
    roles: ProjectRole[],
    id: Types.ObjectId
}

type User = {
    id: string,
    displayName: string,
    language: string,
    email: string,
    emails: string[],
    picture: string,
    projects: string[]
}

export { Project, ProjectMember, ProjectRole, Permission, User }