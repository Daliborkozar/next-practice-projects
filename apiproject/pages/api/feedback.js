import fs from "fs";
import path from "path";

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

export const extracFeedbackData = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
};

function handler(req, res) {
  //get the file from fs /exported function

  // const filePath = path.join(process.cwd(), "data", "feedback.json");

  //   const fileData = fs.readFileSync(filePath);
  //   const data = JSON.parse(fileData);
  
  

  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback,
    };
    //store in database (we will use a file)
    const filePath = buildFeedbackPath()
    const data = extracFeedbackData(filePath)
    // we add manually and empty [] inside feedback.json if empty
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    return res.status(201).json({
      message: "successefuly added feedback",
      added: newFeedback,
    });
  }

  return res.status(200).json({
    message: "success",
    alldata: extracFeedbackData,
  });
}

export default handler;
