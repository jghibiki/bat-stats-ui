
import { GameDataVersion } from "./game_data_version";
import { GameDataEntity } from "../game_data_entity";
import { Damage } from "./damage";
import { WeaponTrait } from "./weapon_trait";

export interface Weapon extends GameDataEntity {
    id: Number;
    game_data_version: GameDataVersion;
    name: string;
    rate_of_fire: null | Number;
    ammunition: null | Number;
    damage: null | Damage;
    traits: null | Array<WeaponTrait>
}