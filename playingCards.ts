export type CardFace =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

export type CardSuit = "clubs" | "diamonds" | "hearts" | "spades";

export interface Card {
  face: CardFace;
  suit: CardSuit;
}

type CompareResult = 'greater' | 'equal' | 'less';

const faceRank: Record<CardFace, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const suitRank: Record<CardSuit, number> = {
  clubs: 1,
  diamonds: 2,
  hearts: 3,
  spades: 4,
};

export function compareCards(card1: Card, card2: Card): CompareResult {
  const faceDiff = faceRank[card1.face] - faceRank[card2.face];
  if (faceDiff > 0) return 'greater';
  if (faceDiff < 0) return 'less';

  const suitDiff = suitRank[card1.suit] - suitRank[card2.suit];
  if (suitDiff > 0) return 'greater';
  if (suitDiff < 0) return 'less';

  return 'equal';
}


console.log(compareCards(
  {face: 'K', suit: 'diamonds'},
  {face: 'Q', suit: 'spades'}));
// greater (K > Q )
console.log(compareCards(
  {face: 'K', suit: 'hearts'}, 
  {face: 'K', suit: 'hearts'}));
// equal (K == K )
console.log(compareCards(
  {face: '8', suit: 'clubs'}, 
  {face: 'K', suit: 'spades'}));
// less (8 < K 