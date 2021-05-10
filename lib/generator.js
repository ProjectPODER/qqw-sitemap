const baseURL = 'https://www.quienesquien.wiki/sitemap/';
const qqwURL = 'https://www.quienesquien.wiki/es/';

function buildSitemaps(results) {
    let files = [];
    files.push(...buildSubSitemap('personas', results[0]));
    files.push(...buildSubSitemap('empresas', results[1]));
    files.push(...buildSubSitemap('instituciones-publicas', results[2]));
    files.push(...buildSubSitemap('regiones', results[3]));
    files.push(...buildSubSitemap('productos', results[4]));
    files.push(buildStaticSitemap());
    files.push(buildSitemapIndex(files));

    return files;
}

function buildSitemapIndex(files) {
    let lines = [];
    let today = new Date().toISOString().slice(0, 10);

    lines.push('<?xml version="1.0" encoding="UTF-8"?>');
    lines.push('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    files.map(file => {
        lines.push('<sitemap><loc>' + baseURL + file.filename + '</loc><lastmod>' + today + '</lastmod></sitemap>');
    });

    lines.push('</sitemapindex>');

    return { filename: 'sitemap.xml', text: lines.join("\n") }
}

function buildSubSitemap(slug, items) {
    let xmls = [];
    let x = 0;
    xmls[x] = [];

    items.map( (item, i) => {
        let url = '<loc>' + qqwURL + slug + '/' + encodeURIComponent(item.id) + '</loc>';
        let lastmod = '';
        if(item.date) lastmod = '<lastmod>' + item.date.split('T')[0] + '</lastmod>';
        xmls[x].push('<url>' + url + lastmod + '</url>');

        if(xmls[x].length == 50000) { // Sitemaps can only have 50,000 entries per file
            x++;
            xmls[x] = [];
        }
    });

    let files = [];
    xmls.map( (xml, i) => {
        let filename = 'sitemap_' + slug + '_' + (i+1) + '.xml';
        let text = '<?xml version="1.0" encoding="UTF-8"?>\n';
        text += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        text += xml.join("\n");
        text += '\n</urlset>';
        files.push( { filename: filename, text: text } );
    });

    return files;
}

function buildStaticSitemap() {
    let xml = [];

    xml.push('<?xml version="1.0" encoding="UTF-8"?>');
    xml.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    xml.push('<url><loc>https://www.quienesquien.wiki/</loc><changefreq>weekly</changefreq></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/inicio</loc><changefreq>weekly</changefreq></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/buscador/</loc><changefreq>weekly</changefreq></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/buscador/?collection=contracts</loc><changefreq>weekly</changefreq></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/buscador/?collection=persons</loc><changefreq>weekly</changefreq></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/buscador/?collection=companies</loc><changefreq>weekly</changefreq></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/buscador/?collection=institutions</loc><changefreq>weekly</changefreq></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/buscador/?collection=areas</loc><changefreq>weekly</changefreq></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/buscador/?collection=products</loc><changefreq>weekly</changefreq></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/sobre-qqw</loc></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/entidades-y-fuentes</loc></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/herramientas</loc></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/investigaciones</loc></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/manual</loc></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/aliados</loc></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/privacidad</loc></url>');
    xml.push('<url><loc>https://www.quienesquien.wiki/es/contacto</loc></url>');
    xml.push('</urlset>');

    return { filename: 'sitemap_static.xml', text: xml.join("\n") }
}

module.exports = { buildSitemaps };
