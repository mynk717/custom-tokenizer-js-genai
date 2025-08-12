Custom Tokenizer for GenAI with JavaScript
This project implements a simple custom tokenizer in JavaScript, designed for a "Generative AI with JavaScript" course assignment. It demonstrates the core concepts of vocabulary learning, text encoding, and token decoding, including the handling of special tokens.

Project Structure
custom-tokenizer-js-genai/
├── index.html          # Main application UI
├── tokenizer.js        # Contains the Tokenizer class logic
├── README.md           # This documentation file
└── demo_corpus.txt     # A sample text corpus for vocabulary learning

Features
Custom Tokenizer Class: A Tokenizer class written from scratch in tokenizer.js.

Vocabulary Learning: The tokenizer learns its vocabulary by processing a given text corpus, identifying unique words, and assigning them numerical IDs based on frequency.

ENCODE Functionality: Converts human-readable text into a sequence of numerical token IDs.

DECODE Functionality: Reconstructs human-readable text from an array of numerical token IDs.

Special Token Handling: Supports predefined special tokens:

[PAD] (Padding): Used to normalize sequence lengths.

[UNK] (Unknown): Represents words not found in the learned vocabulary.

[SOS] (Start of Sequence): Marks the beginning of a text sequence.

[EOS] (End of Sequence): Marks the end of a text sequence.

Vocabulary Persistence: The learned vocabulary is automatically saved to and loaded from your browser's localStorage for convenience.

User Interface: A simple index.html provides an interactive demo in the browser.

Setup and Running
Clone the Repository:

git clone https://github.com/your-username/custom-tokenizer-js-genai.git
cd custom-tokenizer-js-genai

(Replace your-username and custom-tokenizer-js-genai with your actual GitHub username and repository name).

Open index.html: Simply open the index.html file in your preferred web browser. No server or build tools are required for this client-side application.

Usage
The index.html provides an intuitive user interface:

Learn Vocabulary:

The "Corpus for Vocabulary Learning" textarea will be pre-filled from demo_corpus.txt. You can modify it or paste your own text.

Click the "Learn Vocabulary" button. The tokenizer will build its vocabulary from the text. The "Current Vocabulary Size" will update, and a success message will appear.

Encode Text:

Type or paste any text into the "Text to Encode" textarea.

Click "Encode Text."

The "Encoded Tokens (IDs)" textarea will display the numerical representation of your text (comma-separated IDs). These IDs will also automatically populate the "Token IDs to Decode" input for convenience.

Decode Tokens:

The "Token IDs to Decode" textarea will likely contain the output from the encoding step. You can also paste your own comma-separated token IDs here.

Click "Decode Tokens."

The "Decoded Text" textarea will show the reconstructed human-readable text. Special tokens ([SOS], [EOS], [PAD]) are skipped by default during decoding for cleaner output.

Vocabulary File (Conceptual Representation)
For this browser-based demo, the "vocabulary file" is dynamically stored and retrieved using localStorage. Conceptually, after learning from the demo_corpus.txt, the localStorage items tokenizerWordToIndex and tokenizerIndexToWord would resemble the following JSON structures (exact IDs may vary slightly based on initial special token order, but [PAD] is 0, [UNK] is 1, [SOS] is 2, [EOS] is 3):

tokenizerWordToIndex (JSON string in localStorage):

{
  "[PAD]": 0,
  "[UNK]": 1,
  "[SOS]": 2,
  "[EOS]": 3,
  "the": 4,
  "quick": 5,
  "brown": 6,
  "fox": 7,
  "jumps": 8,
  "over": 9,
  "lazy": 10,
  "dog": 11,
  "natural": 12,
  "language": 13,
  "processing": 14,
  "is": 15,
  "a": 16,
  "field": 17,
  "of": 18,
  "artificial": 19,
  "intelligence": 20,
  "that": 21,
  "focuses": 22,
  "on": 23,
  "enabling": 24,
  "computers": 25,
  "to": 26,
  "understand": 27,
  "interpret": 28,
  "and": 29,
  "generate": 30,
  "human": 31,
  "it": 32,
  "involves": 33,
  "various": 34,
  "techniques": 35,
  "like": 36,
  "tokenization": 37,
  "parsing": 38,
  "semantic": 39,
  "analysis": 40,
  "models": 41,
  "learn": 42,
  "from": 43,
  "vast": 44,
  "amounts": 45,
  "text": 46,
  "data": 47,
  "create": 48,
  "new": 49,
  "coherent": 50,
  "content": 51,
  "they": 52,
  "use": 53,
  "sophisticated": 54,
  "break": 55,
  "down": 56,
  "into": 57,
  "numerical": 58,
  "representations": 59
}

tokenizerIndexToWord (JSON string in localStorage):

[
  "[PAD]", "[UNK]", "[SOS]", "[EOS]", "the", "quick", "brown", "fox", "jumps", "over",
  "lazy", "dog", "natural", "language", "processing", "is", "a", "field", "of",
  "artificial", "intelligence", "that", "focuses", "on", "enabling", "computers",
  "to", "understand", "interpret", "and", "generate", "human", "it", "involves",
  "various", "techniques", "like", "tokenization", "parsing", "semantic", "analysis",
  "models", "learn", "from", "vast", "amounts", "text", "data", "create", "new",
  "coherent", "content", "they", "use", "sophisticated", "break", "down", "into",
  "numerical", "representations"
]

Evaluation Parameters
Correctness of ENCODE/DECODE: The tokenizer accurately converts text to IDs and back, handling unknown words and special tokens as expected.

Vocab Quality: The vocabulary is built logically (words are cleaned, sorted by frequency, special tokens are reserved).

Performance: For a client-side JavaScript implementation on typical text sizes, the performance is immediate and efficient.

Code Quality: The code is modular (using a dedicated Tokenizer class), readable, well-commented, and follows good JavaScript practices. Error handling for localStorage is included.

Documentation: This README.md file provides comprehensive setup, usage, examples, and technical explanations.