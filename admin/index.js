'use strict';
if (!module.parent) console.error('Please don\'t call me directly.I am just the main app\'s minion.') || process.process.exit(1);

var admin_forms = require('formage-admin'),
    models = require('../models');

module.exports = function (app, express, mongoose) {
    admin_forms.serve_static(app, express);

    var admin = admin_forms.createAdmin(app, {root:'admin'}, mongoose);

    admin.setAdminTitle(app.get('site'));
    admin.ensureUserExists(app.get('admin').username, app.get('admin').password);

    for(var name in models){
        var model = models[name];

        var paths = model.schema.paths,
            list = [],
            list_populate = [];

        for(var path in paths){
            if(!paths[path].options.type.name) continue;

            if (~['order', '_id', 'show'].indexOf(path)) continue;

            if(paths[path].options.ref)
                list_populate.push(path);

            if(paths[path].options.type.name == 'File') continue;

            list.push(path);
        }

        list.length = list.length > 3 ? 3 : list.length;

        var options =  {
            list: list,
            list_populate: list_populate,
            cloneable: true,
            disable_forms_css: true,
            disable_forms_js: true
        };

        if (paths.order) {
            options.order_by = ['order'];
            options.sortable = 'order';
        }

        if (model.single)
            admin.registerSingleRowModel(model, name, options);
        else
            admin.registerMongooseModel(name, model, null, options);
    }
};
