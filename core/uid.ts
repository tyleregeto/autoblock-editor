
export default function newUid(): string {
    // TODO this not unique enough
    return Date.now().toString() + '.' + Math.random().toString().replace('0.', '');
}