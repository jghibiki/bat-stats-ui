
export interface CharacterAffiliationModel {
    id: Number
    name: string
    can_be_team_boss: boolean
    always_team_boss: boolean
    rank_ids: Array<Number>
}