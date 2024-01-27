import { PromiseWrapper } from "./promise_wrapper"


export class ResponseWrapper extends PromiseWrapper<Response>{
    public override async getResult(): Promise<Response> {
        return (await this.responsePromise).clone()
    }
}