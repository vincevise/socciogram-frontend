export function camelize(text) {
    const a = text.toLowerCase()
        .replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
    return a.substring(0, 1).toUpperCase() + a.substring(1);
}