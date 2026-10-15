// Build metadata captured when Eleventy loads this data file, i.e. at build
// time. `formatted` is precomputed in UTC to match the previous Gatsby footer
// output ("YYYY-MM-DD at HH:MM UTC"); Eleventy v3 does not register a `date`
// filter for Nunjucks, so the footer renders the preformatted string directly.
export default (() => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  const formatted = `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} at ${p(d.getUTCHours())}:${p(d.getUTCMinutes())} UTC`;
  return { date: d, formatted };
})();
