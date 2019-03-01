const Diff = require('diff');

const products = [
    {
        child_id: 4540057,
        sku: '8705078131091',
        name: 'Điện Thoại iPhone XS 64GB - Hàng Chính Hãng (Silver)',
        price: 26990000,
        thumbnail_url:
            'https://salt.tikicdn.com/cache/280x280/ts/product/7d/9d/9e/e095f8fcd9549c380583877be2021993.jpg',
        selected: false,
        inventory_status: 'available',
        id: 4540059,
        option1: 'Silver'
    },
    {
        child_id: 4540053,
        sku: '5434649978904',
        name: 'Điện Thoại iPhone XS 64GB - Hàng Chính Hãng (Space Grey)',
        price: 26990000,
        thumbnail_url:
            'https://salt.tikicdn.com/cache/280x280/ts/product/f8/ef/2c/ba792be3026c705a84dd00e9a7180af4.jpg',
        selected: true,
        inventory_status: 'available',
        id: 4540055,
        option1: 'Space Grey'
    },
    {
        child_id: 4533179,
        sku: '8622152036793',
        name: 'Điện Thoại iPhone XS 64GB - Hàng Chính Hãng (Gold)',
        price: 29990000,
        thumbnail_url:
            'https://salt.tikicdn.com/cache/280x280/ts/product/a1/f0/64/c73c402d793711e287a71df88cfcf937.jpg',
        selected: false,
        inventory_status: 'available',
        id: 4533181,
        option1: 'Gold'
    }
];

const diff = Diff.diffJson(products[0], products[2]);

diff.forEach(function(part) {
    // console.log(part)
    part.value
        .split('\n')
        .filter(function(line) {
            return !!line;
        })
        .forEach(function(line) {
            console.log(line);
        });
});

console.log();
