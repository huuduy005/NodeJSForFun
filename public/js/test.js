document.addEventListener('DOMContentLoaded', function () {
    console.log(location.search)
    document.getElementById('text').innerHTML = location.search
});