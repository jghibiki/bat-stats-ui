import { GameDataEntity } from "../game_data_entity";
import { GameDataVersion } from "./game_data_version";

export interface Trait extends GameDataEntity {
    id: Number;
    game_data_version: GameDataVersion;
    name: string;
    description: string;
    sideboard_amount: Number;
}