// Content Constants for Operation Empty Plate Microsite

export interface BookChapter {
  id: number;
  title: string;
  description: string;
  lesson: string;
  character: string;
  imageIndex: number;
}

export const BOOK_CHAPTERS: BookChapter[] = [
  {
    id: 1,
    title: "Dinner at Cherry's!",
    description: "Bailey and Chongo help Cherry find her restaurant. To say thank you, Cherry serves them a massive feast! But there's a small problem... Chongo is too big for the door, so he has to shrink ('shoooommm...') to fit inside!",
    lesson: "Helping others brings joy and friendship, but sometimes hosts show love by serving too much food!",
    character: "Cherry & Chongo",
    imageIndex: 1
  },
  {
    id: 2,
    title: "Too Much Food!",
    description: "Even though Bailey and Chongo are completely full, Cherry keeps ordering the waiters to bring out more and more. A giant seafood platter arrives, and they don't know how to say no!",
    lesson: "It is okay to politely say 'No, thank you' when you are already full.",
    character: "Bailey",
    imageIndex: 2
  },
  {
    id: 3,
    title: "Operation Takeaway!",
    description: "Instead of throwing the extra food away, Bailey and Chongo bring out their reusable takeaway boxes. But Cherry says: 'No, no, no! Leftovers won't taste right. Throw them away!'",
    lesson: "Never throw away good food! Always pack leftovers in reusable containers to enjoy later.",
    character: "Chongo & Bailey",
    imageIndex: 3
  },
  {
    id: 4,
    title: "Sharing is Caring!",
    description: "Bailey whistles for help, and Ruffle the duck arrives with his seagull flock! Together, they pack and deliver the delicious leftovers to others who need it—like hungry baby chicks, a friendly otter, and a happy neighborhood cat.",
    lesson: "Sharing excess food with friends, neighbors, or animals ensures nothing goes to waste.",
    character: "Ruffle & the Flock",
    imageIndex: 4
  },
  {
    id: 5,
    title: "Appreciating the Effort",
    description: "Chongo and Bailey also share food with the hard-working mouse waiters and kitchen staff. They remind everyone that a lot of hard work goes into preparing our meals, and we should respect that effort.",
    lesson: "Respect the farmers, chefs, and servers by not wasting the food they worked hard to prepare.",
    character: "Mouse Waiters",
    imageIndex: 5
  },
  {
    id: 6,
    title: "The Big Lesson",
    description: "Singapore generates 784 million kg of food waste a year—that's heavier than 50,000 double-decker buses! Cherry finally learns her lesson: only prepare and order what we can finish. No wasting, just wonderful sharing!",
    lesson: "Let's practice 'Operation Empty Plate' every day to keep our Earth clean and green!",
    character: "All Heroes",
    imageIndex: 6
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  character: 'chongo' | 'bailey' | 'cherry';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What should you do if you are full but there is still food left on your plate at a restaurant?",
    options: [
      "Force yourself to eat it until your tummy hurts.",
      "Ask to pack it in a takeaway box to eat later.",
      "Sweep it onto the floor so nobody sees it.",
      "Leave it to be thrown in the trash bin."
    ],
    correctAnswer: 1,
    explanation: "Packing leftovers in a takeaway box is the best way! You can eat it for lunch or dinner the next day, saving delicious food from the trash.",
    character: "bailey"
  },
  {
    id: 2,
    question: "How much food waste does Singapore generate in a single year?",
    options: [
      "About 50 double-decker buses.",
      "Around 5,000 double-decker buses.",
      "More than 50,000 double-decker buses (784 million kg)!",
      "Zero! Singapore wastes no food."
    ],
    correctAnswer: 2,
    explanation: "Yes! It's a huge amount—784 million kg, which weighs more than 50,000 double-decker buses. That's why Operation Empty Plate is so important!",
    character: "chongo"
  },
  {
    id: 3,
    question: "Cherry the squirrel wants to show love by ordering a giant seafood platter even though everyone is full. What is a better way to show hospitality?",
    options: [
      "Order even more food just in case.",
      "Ask guests what they like and only order what they can finish.",
      "Throw away the food and cook a completely new meal.",
      "Lock the doors so guests cannot leave."
    ],
    correctAnswer: 1,
    explanation: "A great host respects their guests' appetites! Ordering only what can be finished is kind to both your guests and the planet.",
    character: "cherry"
  },
  {
    id: 4,
    question: "Why should we avoid wasting food?",
    options: [
      "Because food waste creates trash and pollution.",
      "Because a lot of hard work goes into growing and preparing food.",
      "To help keep our Earth clean and healthy.",
      "All of the above!"
    ],
    correctAnswer: 3,
    explanation: "Absolutely! Avoiding food waste respects the farmers and chefs, reduces pollution, and keeps our planet green and happy.",
    character: "bailey"
  },
  {
    id: 5,
    question: "What is the best way to manage food inside your home refrigerator?",
    options: [
      "Keep buying new food and let the old food rot in the back.",
      "Check expiry dates and eat older food first before it goes bad.",
      "Unplug the fridge to save electricity, even if food spoils.",
      "Hide food from your family members."
    ],
    correctAnswer: 1,
    explanation: "Checking expiry dates and eating older food first (First-In, First-Out) is a super eco-hero habit! It keeps food fresh and out of the bin.",
    character: "chongo"
  }
];

export const FUN_FACTS = [
  {
    title: "Double-Decker Weight!",
    fact: "Singapore's annual food waste (784,000 tonnes) is equivalent to the weight of over 50,000 double-decker buses. If we lined up these buses bumper-to-bumper, they would stretch all the way from Singapore to Kuala Lumpur and back!",
    icon: "🚌"
  },
  {
    title: "Water Savers!",
    fact: "Wasting a single hamburger wastes the same amount of water as taking a 90-minute shower! That's because a lot of water is needed to grow feed for cows, process the meat, and make the bun.",
    icon: "💧"
  },
  {
    title: "Landfill Space!",
    fact: "Singapore's only landfill, Semakau Landfill, is filling up fast. If we don't reduce our waste (including food waste), it could run out of space by 2035!",
    icon: "🏝️"
  },
  {
    title: "The Power of Sharing!",
    fact: "Sharing food that we cannot finish with neighbors, food banks, or community fridges not only reduces waste but also helps families who might not have enough to eat.",
    icon: "🤝"
  }
];
