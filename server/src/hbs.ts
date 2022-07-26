import * as hbs from "hbs"
// import { HydratedDocument } from "mongoose"
// import { ProjectModel, ProjectType } from "./models/Project"
import { userHasPermission } from "./utils/userHasPermission"

hbs.registerHelper("ifeq", function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this)
})

hbs.registerHelper("ifem", function (arg1, options) {
    return arg1 == [] || arg1 == undefined || arg1 == null || arg1 == 0
        ? options.fn(this)
        : options.inverse(this)
})

hbs.registerHelper("hasperm", function (arg1, arg2, arg3, options) {
    return userHasPermission(arg1, arg2, arg3)
        ? options.fn(this)
        : options.inverse(this)
})

// hbs.registerAsyncHelper("project", async function(arg1, fn) {
//     // console.log(arg1, options);
//     // ProjectModel.findById(arg1, (err, project: HydratedDocument<ProjectType>) => {
//     //     if(err) {
//     //         options.fn({project: null})
//     //         console.error(err)
//     //     } else if(!project) options.fn({project: null})
//     //     else options.fn({project})
//     // })
//     // console.log(arg1);
//     try {
//         // console.log(arg1, typeof arg1);
//         const project = await ProjectModel.findById(arg1).exec();
//         // console.log(this, project, options)
//         return fn({project})
//     } catch(err) {
//         console.error(err);
//         return fn(this)
//     }
// })

hbs.registerHelper("log", function (content) {
    console.log(content.fn(this))
    return ""
})
