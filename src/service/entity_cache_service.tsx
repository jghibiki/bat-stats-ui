
import { pipeToNodeWritable } from "solid-js/web";
import { Weapon } from "../models/raw/weapon"
import { GameDataEntity } from "../models/game_data_entity";
import { ResponseWrapper } from "../utils/response_wrapper";
import hash from "object-hash";
import { PaginationResult } from "../models/pagination_result";

export abstract class EntityCacheService<A extends GameDataEntity> {
    entityUrl: string

    private baseUrl: string = "http://localhost:8080"
    private entityCache: Map<Number, Array<A>> = new Map();
    private requests: Map<String, ResponseWrapper> = new Map(); // TODO need to figure out how to clean this out.

    public async get(
        app_data_version: Number,
        entity_ids: Array<Number>,
    ): Promise<Array<A>> {
        if (this.entityCache.has(app_data_version)) {
            // we already have the data cached, just return it.
            console.log("Using cached reference for '" + this.entityUrl + "': " + entity_ids.toString())
            let entities = this.entityCache.get(app_data_version)
            let filteredEntities = entities.filter(el => entity_ids.includes(el.app_id))
            console.log("Filtered entities resolved:" + filteredEntities.toString())
            return filteredEntities
        }
        else {
            // we need to fetch and cache the data.
            return (await this.loadAll(app_data_version)).filter(el => entity_ids.includes(el.app_id))
        }
    }

    public async getPage(
        app_data_version: number,
        page: number
    ): Promise<PaginationResult<A>> {
        let response = await fetch(`${this.baseUrl}/${this.entityUrl}?app_version=${app_data_version}&page=${page}`)

        if (response.status != 200) {
            let text = await response.text()
            throw new Error(`Failed to fetch ${this.entityUrl} entity data. Full error: ${text}`)
        }

        return await response.json() as PaginationResult<A>
    }

    private async loadAll(app_data_version: Number): Promise<Array<A>> {
        return await this.load(app_data_version, null)
    }

    private async load(app_data_version: Number, entity_ids: Array<Number> | null): Promise<Array<A>> {

        let wrappedResponse: ResponseWrapper;
        let requestHash = hash({ app_data_version: app_data_version, entity_ids: entity_ids })
        if (!this.requests.has(requestHash) || !this.requests.get(requestHash).isPending()) {
            wrappedResponse = new ResponseWrapper(
                fetch(`${this.baseUrl}/${this.entityUrl}?app_version=${app_data_version}`)
            )
            this.requests.set(requestHash, wrappedResponse)
        }
        else {
            wrappedResponse = this.requests.get(requestHash)
        }

        let response = await wrappedResponse.getResult()


        if (response.status != 200) {
            let text = await response.text()
            throw new Error(`Failed to fetch ${this.entityUrl} entity data. Full error: ${text}`)
        }

        let data = await response.json() as Array<A>
        this.entityCache.set(app_data_version, data)
        return data
    }
}