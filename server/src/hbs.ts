import * as hbs from "hbs"
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
