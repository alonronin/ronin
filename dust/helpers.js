var dust = require('dustjs-helpers'),
    models = require('../models');

dust.helpers['cloudinary'] = function (chunk, context, bodies, params) {
    context = params && params.path ? context.get(params.path) : context.current();

    if(!(context && context.public_id)) return chunk;

    params.format = params.format || context.format;

    return chunk.write(
        require('cloudinary').url(
            context.public_id, params
        )
    )
};

dust.helpers['banners'] = function(chunk, context, bodies) {
    return chunk.map(function(chunk) {
        models
            .banners
            .where('show', 1)
            .sort({order: 1})
            .exec(function(err, banners){
                banners.forEach(function(banner){
                    context = context.push(banner);
                    chunk.render(bodies.block, context)
                });
                chunk.end();
            })
    })
};

dust.helpers['tabs'] = function(chunk, context, bodies) {
    return chunk.map(function(chunk) {
        models
            .homepage_tabs
            .where('show', 1)
            .sort({order: 1})
            .exec(function(err, banners){
                banners.forEach(function(banner){
                    context = context.push(banner);
                    chunk.render(bodies.block, context)
                });
                chunk.end();
            })
    })
};

dust.helpers['social'] = function(chunk, context, bodies) {
    return chunk.map(function(chunk) {
        models
            .social
            .where('show', 1)
            .sort({order: 1})
            .exec(function(err, socials){
                context = context.push({links: socials});
                chunk.render(bodies.block, context);

                chunk.end();
            })
    })
};

dust.helpers['clients'] = function(chunk, context, bodies) {
    return chunk.map(function(chunk) {
        models
            .clients
            .where('show', 1)
            .sort({order: 1})
            .exec(function(err, clients){
                clients = clients.inGroupsOf(6);

                clients.forEach(function(items){
                    context = context.push({items: items.compact()});
                    chunk.render(bodies.block, context)
                });
                chunk.end();
            })
    })
};


dust.helpers['services'] = function(chunk, context, bodies) {
    return chunk.map(function(chunk) {
        models
            .services
            .where('show', 1)
            .sort({order: 1})
            .exec(function(err, services){
                services.forEach(function(service){
                    context = context.push(service);
                    chunk.render(bodies.block, context)
                });
                chunk.end();
            })
    })
};

dust.helpers['highlights'] = function(chunk, context, bodies) {
    return chunk.map(function(chunk) {
        models
            .highlights
            .where('show', 1)
            .sort({order: 1})
            .limit(7)
            .exec(function(err, highlights){
                highlights.forEach(function(highlight, i){
                    highlight.first = (i == 0);
                    highlight.last = (i == highlights.length - 1);

                    context = context.push(highlight);
                    context.stack['index'] = i + 1;
                    chunk.render(bodies.block, context)
                });
                chunk.end();

            })
    })
};

dust.helpers['footer'] = function(chunk, context, bodies) {
    return chunk.map(function(chunk) {
        models
            .footer
            .where('show', 1)
            .sort({order: 1})
            .exec(function(err, footers){
                footers.forEach(function(footer){
                    context = context.push(footer);
                    chunk.render(bodies.block, context)
                });
                chunk.end();
            })
    })
};

dust.helpers['main_title'] = function(chunk, context, bodies) {
    return chunk.map(function(chunk) {
        models
            .main_title
            .where('show', 1)
            .count(function(err, count){
                models
                    .main_title
                    .where('show', 1)
                    .limit(-1)
                    .skip(Number.random(count - 1))
                    .exec(function(err, titles){
                        titles.forEach(function(title){
                            context = context.push(title);
                            chunk.render(bodies.block, context)
                        });
                        chunk.end();
                    })
            });
    })
};

dust.helpers['menu'] = function(chunk, context, bodies) {
    var page = context.get('page'),
        crumbs = context.get('crumbs');

    return chunk.map(function(chunk) {
        models
            .navigation
            .where('show', true)
            .where('menu', true)
            .sort({order: 1})
            .exec(function(err, menu){
                menu.forEach(function(item){
                    item = item.toObject();
                    item.dock = (crumbs[0]._id.toString() === item._id.toString());
                    context = context.push(item);
                    chunk.render(bodies.block, context)
                });

                chunk.end();
            })
    })
};

dust.helpers['content'] = function(chunk, context, bodies, params) {
    params || (params = {});

    var config = context.get('config'),
        page = context.get('page'),
        items = [];

    return chunk.map(function(chunk) {
        var query = models
                .content
                    .where('show', true)
                    .where('navigation', page._id)
                    .sort({order: 1})
                    .populate('url');

        models.content.paginate(query, page.query.page, params.records, function(err, content, count, pages){
            params.records || (params.records = count);

            content.forEach(function(item){
                //rendering custom context from config
                if(item.text) {
                    dust.loadSource(dust.compile(item.text, "content_template"));
                    dust.render('content_template', config, function(err, text){
                        item.text = text;
                        items.push(item);
                    });
                }else{
                    items.push(item);
                }
            });

            context = context.push({pages: pages || 0, count: count, items: items, records: params.records});
            chunk.render(bodies.block, context);

            chunk.end();

        });
    })
};

dust.helpers.truncate = function(chunk, context, bodies, params) {
    var options = {
        length: 20,
        split: true,
        from: 'right',
        ellipsis: '...'
    };
    Object.merge(options, params);

    options.split = (options.split != 'false');

    return chunk.tap(function(data) {
        return data.truncate(options.length, options.split, options.from, options.ellipsis);
    }).render(bodies.block, context).untap();
};

// TODO: it's ugly now
dust.helpers.paging = function(chunk, context, bodies, params){
    params || (params = {});
    var page = context.get('page');

    var count = params.count;
    var display = params.display || 5;
    var records = params.records;
    var current = page.query.page && page.query.page.toNumber().abs() || 1;
    var start, end, pages;
    var old_display = (display % 2 == 0) ? 1 : 0, i, half;
    var result = {
        prelink : params.link || '?page=',
        current : current,
        previous : null,
        next : null,
        first : null,
        last : null,
        range : [],
        from : null,
        to : null,
        total : count,
        pages : null
    };
    /* zero division; negative */
    if(records <= 0) {
        return chunk.render(bodies.block, context.push(result));
    }
    pages = (count / records).ceil();
    result.pages = pages;
    if(pages < 2) {
        result.from = 1;
        result.to = count;
        return chunk.render(bodies.block, context.push(result));
    }

    if(current > pages) {
        current = pages;
        result.current = current;
    }
    half = (display / 2).floor();
    start = current - half;
    end = current + half - old_display;

    if(start < 1) {
        start = 1;
        end = start + display;
        if(end > pages) {
            end = pages;
        }
    }

    if(end > pages) {
        end = pages;
        start = end - display + 1;
        if(start < 1) {
            start = 1;
        }
    }

    for( i = start; i <= end; i++) {
        result.range.push(i);
    }

    if(current > 1) {
        result.first = 1;
        result.previous = current - 1;
    }

    if(current < pages) {
        result.last = pages;
        result.next = current + 1;
    }

    result.from = (current - 1) * records + 1;
    if(current == pages) {
        result.to = count;
    } else {
        result.to = result.from + records - 1;
    }

    return chunk.render(bodies.block, context.push(result));
};


