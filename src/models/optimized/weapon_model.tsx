import { GameDataEntity } from "../game_data_entity"
import { DamageModel } from "./damage_model"
import { GameDataVersionModel } from "./game_data_version_model"

export interface WeaponModel extends GameDataEntity {
    id: Number
    game_data_version: GameDataVersionModel
    name: string
    rate_of_fire: number
    ammunition: number
    damage: Array<DamageModel>
    traits: Array<WeaponTraitModel>
}