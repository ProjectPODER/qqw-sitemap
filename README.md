# qqw-sitemap

Generates sitemaps in XML for QuienEsQuien.wiki

![Mapping the maps!](https://media.giphy.com/media/U4YEoSRgz5JtebnYqH/giphy.gif)

## Installation

From the Linux command line, run the following commands:

    sudo apt install git nodejs npm
    git clone ssh://git@gitlab.rindecuentas.org:2203/equipo-qqw/qqw-sitemap.git
    cd qqw-sitemap
    npm install

## Usage

First, generate all the sitemaps:

    node qqw-sitemap/index.js -d DATABASE

Then, update the assets repo using the provided script:

    ./push.sh

## Options

    --database   -d  Name of the database containing collections for persons, organizations, and countries

## Output

A file is created in the root directory for each of the following sitemaps:

* sitemap.xml (sitemaps index file)
* sitemap_static.xml (map of static or top level pages)
* sitemap_empresas_N.xml (N sitemap files of 50,000 companies each)
* sitemap_instituciones-publicas_N.xml (N sitemap files of 50,000 public institutions each)
* sitemap_personas_N.xml (N sitemap files of 50,000 persons each)

Files are generated according to the protocol found in [sitemaps.org](https://www.sitemaps.org/protocol.html) and the rules for [Google sitemaps](https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190).
