const { summarizeText } = require('../utils/utils');
const SummarizedText = require('../model/summarizeModel');

exports.getSummarizedTextByUserId = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
        const summarizedTexts = await SummarizedText.find({user: userId});
        res.json({ summarizedTexts });
    } catch (error) {
        console.error('Error occurred while fetching summarized text:', error);
        res.status(500).json({ error: 'An error occurred while fetching summarized text' });
    }
};


exports.summarize = async (req, res) => {
    const { text, userId, summaryLength } = req.body;
    console.log(req.body);
    try {
        const summarizedText = summarizeText(text, summaryLength);
        const newSummarizedText = new SummarizedText({
            user: userId,
            originalText: text,
            summarizedText: summarizedText
        });
        await newSummarizedText.save();

        res.json({ summary: summarizedText });
    } catch (error) {
        console.error('Error occurred during text summarization:', error);
        res.status(500).json({ error: 'An error occurred during text summarization' });
    }
};