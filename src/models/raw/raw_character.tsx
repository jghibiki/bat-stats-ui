import { GameDataEntity } from "../game_data_entity";
import { CharacterAffiliation } from "./character_affiliation";



export interface CharacterTrait {
    trait_id: Number;
    alternate_name: string;
}

export interface RawCharacter extends GameDataEntity {
    id: Number;
    name: String;
    alias: String;
    affiliations: Array<CharacterAffiliation>;
    rank_ids: Array<Number>;
    weapon_ids: Array<Number>;
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

    traits: Array<CharacterTrait>;
    linked_to_characters: Array<Number>;
    linked_characters: Array<Number>;
    shares_profile_in_game: Boolean;
    shares_equipment: Boolean;
    ignores_costs: Boolean;
    can_be_taken_individually: Boolean;
    adds_to_model_count: Boolean;
    adds_to_rank_count: Boolean;
    upgrade_ids: Array<Number>;
}