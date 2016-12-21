var levels = ['../blocks', 'common.blocks', 'desktop.blocks'],
    techs = {
        dev: require('../../lib/index').techs,
        bem: require('enb-bem-techs'),
        enb: {
            provideFile: require('enb/techs/file-provider'),
            browserJs: require('enb-js/techs/browser-js'),
            css: require('enb-css/techs/css')
        },
        xjst: {
            bemjsonToHtml: require('enb-bemxjst/techs/bemjson-to-html'),
            bemhtml: require('enb-bemxjst/techs/bemhtml')
        }
    },
    transporterPlugins = require('../../lib/index').transporterPlugins;


module.exports = function(config) {

    // todo@dima117a вынести логику фильтров в отдельный модуль
    const targetLevels = ['desktop.blocks'];
    const targetBlock = 'b1';
    const rootPath = config.getRootPath();

    config.nodes('*.bundles/*', function(nodeConfig) {

        nodeConfig.addTechs([
            [techs.dev.devDeclaration, { entities: ['dev-page', 'dev-page_type_test', 'b1', 'input__el1', 'select_theme_islands'] }],
            [techs.dev.devPageBemjson, { type: 'test', js: '?.js', devJs: '?.test.js', css: '?.css' }],
            [techs.dev.sandbox],
            [techs.dev.jsTest, { targetLevels: targetLevels, targetBlock: targetBlock }],

            [techs.dev.phantomTesting],

            //[techs.enb.provideFile, { target: '?.bemdecl.js' }],
            [techs.bem.levels, { levels: levels }],
            [techs.bem.depsOld],
            [techs.bem.files],
            [techs.xjst.bemhtml],
            //[techs.enb.browserJs, { target: '?.js' }],
            [techs.dev.transporter('js'), {
                target: '?.js',
                apply: [
                    transporterPlugins.wrap(),
                    transporterPlugins.bemFilter(
                        targetLevels,
                        targetBlock,
                        rootPath,
                        transporterPlugins.wrap({ before: '\n// <<<\n', after: '\n// >>>\n' })
                    )
                ]
            }],
            [techs.enb.css],

            [techs.xjst.bemjsonToHtml, { target: '?.sandbox.html',  bemjsonFile: '?.sandbox.bemjson.js' }],
            [techs.xjst.bemjsonToHtml, { target: '?.html',  bemjsonFile: '?.bemjson.js' }]
        ]);

        //nodeConfig.addTargets(['?.sandbox.html', '?.test.html', '?.js', '?.css', '?.sandbox.js', '?.test.js']);
        nodeConfig.addTargets(['?.phantomjs']);
    });
};
