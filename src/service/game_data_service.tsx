import { WeaponCacheService } from "./weapon_cache_service"
import { GameDataVersion } from "../models/raw/game_data_version"
import { ResponseWrapper } from "../utils/response_wrapper"
import { CharacterCacheService } from "./character_cache_service"
import { TraitCacheService } from "./trait_cache_service"
import { RawCharacter } from '../models/raw/raw_character'
import { Weapon } from '../models/raw/weapon'
import { Trait } from '../models/raw/trait'
import { CharacterModel } from "../models/optimized/character_model"
import { PaginationResult } from "../models/pagination_result"

export class GameDataService {
    private static instance: GameDataService

    private baseUrl: string = "http://localhost:8080"

    private weapon_service: WeaponCacheService
    private character_service: CharacterCacheService
    private trait_service: TraitCacheService

    private appDataVersionRequest: ResponseWrapper | null = null;


    public static getInstance() {
        if (!GameDataService.instance) {
            GameDataService.instance = new GameDataService()
        }
        return GameDataService.instance
    }

    private async get_latest_app_version() {
        if (this.appDataVersionRequest === null || !this.appDataVersionRequest.isPending()) {
            // create new request as there isn't already one.
            this.appDataVersionRequest = new ResponseWrapper(fetch(this.baseUrl + "/version"))
        }

        let request = await this.appDataVersionRequest.getResult()


        if (request.status !== 200) {
            console.log("Error: " + request.text)
            // TODO handle error better.
            return
        }

        let versionData = await request.json() as GameDataVersion;

        return versionData.id
    }

    private async resolve_app_data_version_or_get_latest(app_version_id: number): Promise<number> {
        if (app_version_id === null) {
            return await this.get_latest_app_version()
        } else {
            return app_version_id
        }
    }

    public constructor() {
        this.weapon_service = new WeaponCacheService()
        this.character_service = new CharacterCacheService()
        this.trait_service = new TraitCacheService()
    }

    public async getWeapons(weapon_ids: Array<number>, app_version_id: null | number = null): Promise<Array<Weapon>> {
        let selected_app_version_id = await this.resolve_app_data_version_or_get_latest(app_version_id)
        let weapon = await this.weapon_service.get(selected_app_version_id, weapon_ids)
        return weapon
    }

    public async getCharactersByPage(app_version_id: null | number = null, page: number = 1): Promise<PaginationResult<CharacterModel>> {
        let selected_app_version_id = await this.resolve_app_data_version_or_get_latest(app_version_id)
        let characters = await this.character_service.getPage(selected_app_version_id, page)
        return characters
    }

    public async getCharacters(app_version_id: null | number = null, ids: Array<number>): Promise<PaginationResult<CharacterModel>> {
        // TODO
        /*
        let selected_app_version_id = await this.resolve_app_data_version_or_get_latest(app_version_id)
        let characters = await this.character_service.getPage(selected_app_version_id, page)
        return characters
        */
        return null
    }

    public async getTraits(trait_ids: Array<number>, app_version_id: null | number = null): Promise<Array<Trait>> {
        let selected_app_version_id = await this.resolve_app_data_version_or_get_latest(app_version_id)
        let trait = await this.trait_service.get(selected_app_version_id, trait_ids)
        return trait
    }
}