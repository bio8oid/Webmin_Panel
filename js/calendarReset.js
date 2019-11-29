// Reset General Statistic Calendar \\

const url = window.location.href;

if (url.indexOf('pages') > -1 === false || url.indexOf('details') > -1 || url.indexOf('payout') > -1) {
    document.getElementById("general-calendar-reset").addEventListener('click', () => {
        document.getElementById("general-calendar-form").reset();
    });
};