export const quiz = {
    totalQuestions: 10,
    questions: [
        {
            id: 1,
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Rome"],
            correctAnswer: 0 // Correct, as "Paris" is at index 0
        },
        {
            id: 2,
            question: "Who painted the Mona Lisa?",
            options: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Michelangelo"], // Moved "Leonardo da Vinci" to index 1
            correctAnswer: 1
        },
        {
            id: 3,
            question: "What is the largest planet in our solar system?",
            options: ["Saturn", "Mars", "Jupiter", "Earth"], // Moved "Jupiter" to index 2
            correctAnswer: 2
        },
        {
            id: 4,
            question: "What is the chemical symbol for gold?",
            options: ["Ag", "Fe", "Au", "Cu"], // Moved "Au" to index 2
            correctAnswer: 2
        },
        {
            id: 5,
            question: "Who wrote the play Romeo and Juliet?",
            options: ["Jane Austen", "Charles Dickens", "William Shakespeare", "Mark Twain"], // Moved "William Shakespeare" to index 2
            correctAnswer: 2
        },
        {
            id: 6,
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], // Moved "Pacific Ocean" to index 3
            correctAnswer: 3
        },
        {
            id: 7,
            question: "What is the symbol for the element hydrogen?",
            options: ["He", "O", "N", "H"], // Moved "H" to index 3
            correctAnswer: 3
        },
        {
            id: 8,
            question: "Who is the author of the Harry Potter book series?",
            options: ["Stephen King", "George R.R. Martin", "Dan Brown", "J.K. Rowling"], // Moved "J.K. Rowling" to index 3
            correctAnswer: 3
        },
        {
            id: 9,
            question: "What is the tallest mountain in the world?",
            options: ["K2", "Kangchenjunga", "Makalu", "Mount Everest"], // Moved "Mount Everest" to index 3
            correctAnswer: 3
        },
        {
            id: 10,
            question: "What is the largest continent?",
            options: ["Africa", "North America", "South America", "Asia"], // Moved "Asia" to index 3
            correctAnswer: 3
        }
    ]   
};
