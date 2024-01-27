

export class PromiseWrapper<T>{
    private status: String = "pending"
    protected responsePromise: Promise<T>

    public constructor(promise: Promise<T>) {
        this.responsePromise = promise.then((result) => {
            this.status = "complete"
            return result
        }, (thrown) => {
            this.status = "failed"
            return thrown
        })
    }

    public isPending() {
        return this.status === "pending"
    }

    public isComplete() {
        return this.status === "complete"
    }

    public isFailed() {
        return this.status === "failed"
    }

    public async getResult(): Promise<T> {
        return await this.responsePromise
    }
}