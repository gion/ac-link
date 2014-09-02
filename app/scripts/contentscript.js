'use strict';

console.log('\'Allo \'Allo! Content script');

(function(global) {
    var $ = global.jQuery;
    var notify = global.notify;
    var iconSrc = '//cdn3.iconfinder.com/data/icons/iconano-web-stuff/512/109-External-128.png';
    var api = {
        name: 'Ac Task Link',
        namespace: 'ac-task-link',
        version: '0.0.1',
        author: 'bogdan.gradinairu@gmail.com',
        detect: function(url) {
            return url.indexOf('projects.xivic.com/public/index.php?path_info=projects') !== -1;
        },
        work: function() {
            $('.objects_list_item').each(function(i, el) {
                var link = $(el).attr('permalink');
                $('<a>')
                    .attr('href', link)
                    .attr('title', 'permalink')
                    .attr('target', '_blank')
                    .html('<img class="gion-link" src="'+ iconSrc +'" style="width: 12px;height:auto;" alt="">')
                    .appendTo(
                        $(el).find('.task_options')
                            .clone()
                            .empty()
                            .addClass('gion-link-container')
                            .insertAfter(
                                $(el).find('.task_options')
                            )
                     )
                    .on('click.' + api.namespace, function(e) {
                        e.stopPropagation();
                    });
            });

            api.notify({
                title: 'haaaa!',
                text: 'oooh, yeah!',
                icon: '//x1.fjcdn.com/thumbnails/comments/How+my+little+brother+enters+my+room+_36c634ef4deea16688e24a51323d1522.jpg'
            });
        },
        main: function() {
            if(this.detect(global.location.toString())) {
                api.work();
            }
        },
        notify: function(o) {
            console.debug('should notify :(');
            return notify.createNotification(o.title, {
                body: o.text,
                icon: o.icon
            });
        }
    };

    global.onload = function() {
        setTimeout(function() {
            console.log('asdasdas');
            api.main();
        }, 1000);
    };

    global.api = api;

    console.log(global);
    console.log(window);

})(this);

