const _ = require('lodash');
const request = require("request");

const swig = require('swig');
const {resolve} = require('path');

// Compile a file and store it, rendering it later
const threads_template = swig.compileFile(resolve(__dirname, './threads.html'));

const Token = require('./token');

function requestPromise(options) {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) return reject(error);
            resolve(body);
        });
    })
}

function getThreads(token) {
    let options = {
        method: 'GET',
        url: 'https://tinhte.vn/appforo/index.php?threads/promoted&fields_include=list_item,user_is_ignored,content.thread_id,content.thread_title,content.first_post.post_body_plain_text,content.first_post.post_id,content.first_post.attachments,content.first_post.post_is_liked,content.first_post.post_like_count,content.first_post.poster_rank,content.first_post.poster_has_verified_badge,content.thread_image.link,content.thread_thumbnail.link,content.links.permalink,content.thread_create_date,content.creator_username,content.links.first_poster_avatar,content.thread_post_count,content.thread_view_count,content.forum.forum_id,content.forum.forum_title,content.forum.links.permalink,content.latest_posts,content.thread_tags&limit=17&page=1&oauth_token=' + token,
        headers: {
            'cache-control': 'no-cache',
            Connection: 'keep-alive',
            // Cookie: '__cfduid=ddce3798bc33d038828545182b8f5b3191544434241; _ga=GA1.2.319203248.1544434243; _gid=GA1.2.2078694660.1544434243; xf_vim|mudim-settings=26; G_ENABLED_IDPS=google; tt_session=bcba43e79ab64c0234e69a6dc793685e; _gat=1; _ceg.s=pjnxtn; _ceg.u=pjnxtn',
            Referer: 'https://tinhte.vn/',
            Accept: '*/*',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36',
            'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
            // 'Accept-Encoding': 'gzip, deflate, br'
        },
        json: true
    };

    return requestPromise(options);
}

async function getLastThreads() {
    let token = await Token();
    // console.log(token);
    let data = await getThreads(token);
    let {threads} = data;
    let _threads = _.take(threads, 5);

    let text = threads_template({threads: _threads});
    // console.log(text);
    return text;
}

module.exports = {
    getLastThreads
};
