export interface Exercise {
    id: number
    name: string
    sets: number
    reps: number
    weight: number
    restTime: number
    position: number
}
// exercise request -> 
export interface Routine {
    id: number
    name: string
    description: string
    createdAt: string
    exercises: Exercise[]
}

export interface AuthResponse {
    token: string
    username: string
    role: string
}

export interface User {
    username: string
    role: string
}