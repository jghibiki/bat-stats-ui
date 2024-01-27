import { Trait } from "../models/raw/trait";
import { EntityCacheService } from "./entity_cache_service";


export class TraitCacheService extends EntityCacheService<Trait>{
    override entityUrl: string = "trait"
}