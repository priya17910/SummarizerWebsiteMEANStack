const natural = require('natural');
const sw = require('stopword');

function summarizeText(text, summaryLength) {
    try {
        const tokenizer = new natural.WordTokenizer();
        const words = tokenizer.tokenize(text);

        const stemmer = natural.PorterStemmer;
        const stemWords = words.map(word => stemmer.stem(word));
        const uniqueStemWords = Array.from(new Set(stemWords));
        const key = sw.removeStopwords(uniqueStemWords);
        const sentenceTokenizer = new natural.SentenceTokenizer();
        const sentences = sentenceTokenizer.tokenize(text);
        const rankedSentences = sentences.map((sentence, index) => ({
            sentence,
            index,
            rank: rankSentence(sentence, key)
        }));

        rankedSentences.sort((a, b) => b.rank - a.rank);
        const summarySentences = rankedSentences.slice(0, Math.min(summaryLength, rankedSentences.length));

        summarySentences.sort((a, b) => a.index - b.index);
        const summary = summarySentences.map(s => s.sentence).join(' ');

        return summary;
    } catch (error) {
        console.error('Error occurred during text summarization:', error);
        throw error;
    }
}

function rankSentence(sentence, keywords) {
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(sentence);

    const stemmer = natural.PorterStemmer;
    const stemmedWords = words.map(word => stemmer.stem(word));

    const keywordCount = stemmedWords.reduce((count, word) => {
        if (keywords.includes(word)) {
            return count + 1;
        }
        return count;
    }, 0);

    return keywordCount;
}

module.exports = { summarizeText };