const url = window.location.href;

if (url.indexOf('details') > -1 || url.indexOf('payout') > -1) {

    var monkeyList = new List('paginated-list', {
        page: 9,
        pagination: true
    });
};