/**
 * Custom Tokenizer Class
 * This class provides functionality to learn a vocabulary from text,
 * encode text into numerical tokens, and decode tokens back into text.
 * It handles special tokens like [UNK], [PAD], [SOS], [EOS].
 * Vocabulary is persisted using localStorage for this demo.
 */
class Tokenizer {
    // Define special tokens and their initial IDs
    static SPECIAL_TOKENS = {
        PAD: '[PAD]', // Padding token
        UNK: '[UNK]', // Unknown token
        SOS: '[SOS]', // Start of sequence token
        EOS: '[EOS]'  // End of sequence token
    };

    constructor() {
        this.wordToIndex = {}; // Maps words to their unique integer IDs
        this.indexToWord = []; // Maps integer IDs back to words
        this.vocabSize = 0;

        // Initialize with special tokens
        this._initializeSpecialTokens();
        this.loadVocab(); // Attempt to load existing vocab from localStorage
    }

    /**
     * Initializes the tokenizer with predefined special tokens.
     * These tokens are always at the beginning of the vocabulary.
     */
    _initializeSpecialTokens() {
        // Clear existing maps for re-initialization or fresh start
        this.wordToIndex = {};
        this.indexToWord = [];
        this.vocabSize = 0;

        const specialTokenNames = Object.keys(Tokenizer.SPECIAL_TOKENS);
        for (let i = 0; i < specialTokenNames.length; i++) {
            const token = Tokenizer.SPECIAL_TOKENS[specialTokenNames[i]];
            this.wordToIndex[token] = i;
            this.indexToWord[i] = token;
            this.vocabSize++;
        }
    }

    /**
     * Cleans the input text by:
     * 1. Converting to lowercase.
     * 2. Removing punctuation (keeping spaces).
     * @param {string} text - The input text to clean.
     * @returns {string} - The cleaned text.
     */
    _cleanText(text) {
        // Convert to lowercase
        let cleaned = text.toLowerCase();
        // Remove punctuation and extra spaces, but keep hyphens if they are part of words
        cleaned = cleaned.replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’‘“”„•]/g, '').replace(/\s+/g, ' ').trim();
        return cleaned;
    }

    /**
     * Learns the vocabulary from a given text corpus.
     * Counts word frequencies and assigns unique IDs.
     * @param {string} corpus - The text corpus to learn from.
     */
    learnVocab(corpus) {
        this._initializeSpecialTokens(); // Reset vocab before learning new one
        const cleanedCorpus = this._cleanText(corpus);
        const words = cleanedCorpus.split(' ').filter(word => word.length > 0); // Split by space and remove empty strings

        const wordCounts = {};
        for (const word of words) {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        }

        // Sort words by frequency (descending) then alphabetically (ascending)
        // This helps in giving more frequent words lower IDs (after special tokens)
        const sortedWords = Object.keys(wordCounts).sort((a, b) => {
            if (wordCounts[a] !== wordCounts[b]) {
                return wordCounts[b] - wordCounts[a]; // Sort by frequency (descending)
            }
            return a.localeCompare(b); // Then alphabetically (ascending)
        });

        // Assign IDs to new words, starting after special tokens
        for (const word of sortedWords) {
            if (!(word in this.wordToIndex)) {
                this.wordToIndex[word] = this.vocabSize;
                this.indexToWord[this.vocabSize] = word;
                this.vocabSize++;
            }
        }
        this.saveVocab(); // Save the learned vocabulary
    }

    /**
     * Encodes a given text into an array of token IDs.
     * Unknown words are mapped to the [UNK] token ID.
     * @param {string} text - The text to encode.
     * @param {boolean} addSpecialTokens - Whether to add [SOS] and [EOS] tokens.
     * @returns {number[]} - An array of token IDs.
     */
    encode(text, addSpecialTokens = true) {
        const cleanedText = this._cleanText(text);
        const words = cleanedText.split(' ').filter(word => word.length > 0);
        const encodedTokens = [];

        if (addSpecialTokens) {
            encodedTokens.push(this.wordToIndex[Tokenizer.SPECIAL_TOKENS.SOS]);
        }

        for (const word of words) {
            const tokenId = this.wordToIndex[word];
            if (tokenId !== undefined) {
                encodedTokens.push(tokenId);
            } else {
                // Use the UNK token ID for unknown words
                encodedTokens.push(this.wordToIndex[Tokenizer.SPECIAL_TOKENS.UNK]);
            }
        }

        if (addSpecialTokens) {
            encodedTokens.push(this.wordToIndex[Tokenizer.SPECIAL_TOKENS.EOS]);
        }

        return encodedTokens;
    }

    /**
     * Decodes an array of token IDs back into a human-readable string.
     * @param {number[]} tokenIds - An array of token IDs.
     * @param {boolean} skipSpecialTokens - Whether to skip special tokens during decoding.
     * @returns {string} - The decoded text.
     */
    decode(tokenIds, skipSpecialTokens = true) {
        const decodedWords = [];
        for (const id of tokenIds) {
            const word = this.indexToWord[id];
            if (word !== undefined) {
                if (skipSpecialTokens && Object.values(Tokenizer.SPECIAL_TOKENS).includes(word)) {
                    // Skip special tokens if requested
                    continue;
                }
                decodedWords.push(word);
            } else {
                // This case should ideally not happen if IDs are valid, but as a fallback
                decodedWords.push(Tokenizer.SPECIAL_TOKENS.UNK);
            }
        }
        // Join words, making sure to handle cases where there might be no words after skipping specials
        return decodedWords.length > 0 ? decodedWords.join(' ') : '';
    }

    /**
     * Saves the current vocabulary to localStorage.
     */
    saveVocab() {
        try {
            localStorage.setItem('tokenizerWordToIndex', JSON.stringify(this.wordToIndex));
            localStorage.setItem('tokenizerIndexToWord', JSON.stringify(this.indexToWord));
            localStorage.setItem('tokenizerVocabSize', this.vocabSize.toString());
            console.log('Vocabulary saved to localStorage.');
        } catch (e) {
            console.error('Failed to save vocabulary to localStorage:', e);
            // In a real app, you'd show a UI message, but for this demo, console.error is sufficient.
        }
    }

    /**
     * Loads the vocabulary from localStorage.
     */
    loadVocab() {
        try {
            const storedWordToIndex = localStorage.getItem('tokenizerWordToIndex');
            const storedIndexToWord = localStorage.getItem('tokenizerIndexToWord');
            const storedVocabSize = localStorage.getItem('tokenizerVocabSize');

            if (storedWordToIndex && storedIndexToWord && storedVocabSize) {
                this.wordToIndex = JSON.parse(storedWordToIndex);
                this.indexToWord = JSON.parse(storedIndexToWord);
                this.vocabSize = parseInt(storedVocabSize, 10);
                console.log('Vocabulary loaded from localStorage.');
                return true;
            }
        } catch (e) {
            console.error('Failed to load vocabulary from localStorage:', e);
            // In a real app, you'd show a UI message, but for this demo, console.error is sufficient.
        }
        return false;
    }

    /**
     * Returns the current size of the vocabulary.
     * @returns {number} - The number of unique tokens in the vocabulary.
     */
    getVocabSize() {
        return this.vocabSize;
    }
}
