module.exports = {
    now: getFormattedDate(),
    env: process.env.ELEVENTY_ENV,
};

function getFormattedDate() {
    const date = new Date();
    const isoString = date.toISOString();
    const [formattedDate, timeString] = isoString.split('T');
    const [formattedTime, _] = timeString.split('.');
    return {dateString: formattedDate, timeString: formattedTime };
}
