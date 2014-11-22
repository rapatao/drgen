drgen
=====

Plugin jQuery que baseado em um json preenche as informações em um template HTML.

Utilização:

<script src="drgen.jquery.js"></script>

$(document).ready(function () {

    $.get('data/template.html', function (template) {
        var component = $('#drg-content').html(template);
        $.get('data/data.json', function (data) {
            var config = {
                'data': data,
                prefix: 'drg-tpl', /* not required */
                separator: '-' /* not required */
            };
            component.drgen(config);
        });
    });

});

