export class EventDispatcher<T> {
    private _callbacks: Array<(d: T) => void>;

    constructor() {
        this._callbacks = new Array<(d: T) => void>();
    }

    listen(f: (d: T) => void): VoidFunction {
        this._callbacks.push(f);

        return () => this.remove(f);
    }

    remove(f: (d: T) => void): void {
        let i = this._callbacks.indexOf(f);
        if (i > -1) {
            this._callbacks.splice(i, 1);
        }
    }

    fire(arg: T): void {
        let list = this._callbacks.concat();
        list.forEach(f => {
            f(arg);
        });
    }
}