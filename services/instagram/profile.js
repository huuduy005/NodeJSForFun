const cheerio = require('cheerio');
const request = require('request');
const vm = require('vm');

function getRawInstagram(id) {
    return new Promise((resole, reject) => {
        request(`https://www.instagram.com/${id}`, (err, response, body) => {
            if (err) return reject(err);
            resole(body);
        });
    })
}

async function getDataFromInstagram(id) {
    let html = await getRawInstagram(id);
    let $ = cheerio.load(html);

    let scripts = $('body > script');

    const sandbox = {window: {}};
    const context = new vm.createContext(sandbox);

    scripts.each(function (index) {
        let text = $(this).html();
        if (text) {
            try {
                let script = new vm.Script(text);
                script.runInContext(context);
            } catch (e) {
                // console.log('Loi - ', index);
                // console.error(e)
            }
        }
    });

    return sandbox;
}

module.exports = async (id) => {
    let data = await getDataFromInstagram(id);
    let edge = data.window._sharedData.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges;
    // console.log(edge[0]);
    return edge;
};
