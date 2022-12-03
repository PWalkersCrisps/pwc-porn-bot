declare module 'ascii-table';
declare module 'weighted-random';

interface Card {
    suit: string,
    label: string,
    value: number,
    emoji: string
}
interface player {
    cards: Card[],
    value: number[],
}
interface dealer {
    cards: Card[],
    value: number[],
}