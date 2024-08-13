export type Metal = {
    code: string
    title: string
    finenessList: FinenessList[]
}

export type FinenessList = {
    id: number
    value: number
    cash: number
    checkingAccount: number
}

export type Payment = {
    code: string
    title: string
}