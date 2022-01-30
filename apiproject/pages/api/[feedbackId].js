import { buildFeedbackPath, extracFeedbackData} from './feedback'

function handler(req,res) {
    const feedbackId = req.query.feedbackId
    const filePath = buildFeedbackPath()
    const feedbackData = extracFeedbackData(filePath)

    const singleFeedback = feedbackData.find(item => item.id === feedbackId)

    res.status(200).json({
        message: "success",
        data: singleFeedback
      });
}

export default handler