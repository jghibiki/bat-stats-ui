import { Weapon } from "../models/raw/weapon";
import { EntityCacheService } from "./entity_cache_service";


export class WeaponCacheService extends EntityCacheService<Weapon>{
    override entityUrl: string = "weapon"
}