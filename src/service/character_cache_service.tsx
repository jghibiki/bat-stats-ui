import { CharacterModel } from "../models/optimized/character_model";
import { RawCharacter } from "../models/raw/raw_character";
import { EntityCacheService } from "./entity_cache_service";


export class CharacterCacheService extends EntityCacheService<CharacterModel>{
    override entityUrl: string = "optimized/character"
}