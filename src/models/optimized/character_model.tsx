import { GameDataEntity } from "../game_data_entity";
import { CharacterAffiliationModel } from "./character_affiliation_model";
import { CharacterRivalAffiliationModel } from "./character_rival_affiliation_model";
import { CharacterTraitModel } from "./character_trait_model";
import { GameDataVersionModel } from "./game_data_version_model";
import { WeaponModel } from "./weapon_model";

export interface CharacterModel extends GameDataEntity {
    id: Number;
    game_data_version: GameDataVersionModel
    name: String;
    alias: String;
    affiliations: Array<CharacterAffiliationModel>;
    rival_affiliations: Array<CharacterRivalAffiliationModel>
    rank_ids: Array<Number>;
    weapons: Array<WeaponModel>;
    image: String;
    background: String;

    willpower: Number;
    strength: Number;
    movement: String;
    attack: Number;
    derense: Number;
    special: Number;
    endurance: Number;
    reputation: Number;
    funding: Number;
    eternal: Boolean;
    bases_size: String;

    traits: Array<CharacterTraitModel>;
    linked_to_characters: Array<Number>;
    linked_characters: Array<Number>;
    shares_profile_in_game: Boolean;
    shares_equipment: Boolean;
    ignores_costs: Boolean;
    can_be_taken_individually: Boolean;
    adds_to_model_count: Boolean;
    adds_to_rank_count: Boolean;
}