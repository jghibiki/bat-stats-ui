import { GameDataEntity } from "../game_data_entity";
import { GameDataVersion } from "../raw/game_data_version";

export interface TraitModel extends GameDataEntity {
    id: number
    game_data_version: GameDataVersion
    name: string
    description: string
    sidenboard_amount: number
}