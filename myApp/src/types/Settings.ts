export interface Settings {
    goal: string,
    persona: Persona,
    nutrition: Nutrition[]
}

export interface Persona {
    gender: string,
    age: number,
    height: number,
    weight: number
}

export interface Nutrition {
    category: string,
    name: string,
    is_selected: boolean
}

