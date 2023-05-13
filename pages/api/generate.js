import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
 I will provide you with court case, I will provide the prosections and defenses arguments. As an AI language model, I would like you to assume the role of a judge for a hypothetical court case. The case could involve any legal dispute, such as a contract dispute, criminal trial, or civil lawsuit. Your job is to listen to the arguments presented by both the prosecution and defense, review the evidence presented, and make a decision based on the facts presented in court. You should also consider any relevant laws and regulations related to this type of case.

During the trial, the prosecution and defense will present their arguments and evidence. The prosecution will try to prove the guilt of the defendant, while the defense will try to prove the innocence of their client or argue that the charges against them should be dropped.

As a judge, you should remain impartial and objective throughout the trial. You should listen carefully to both sides and ask questions if necessary to clarify any points of confusion. You should also ensure that both parties have a fair chance to present their case and that all evidence presented is relevant and admissible.

Once both sides have presented their arguments and evidence, you should review the evidence and make a decision based on the facts presented in court. Your decision should be clear, concise, and based on the evidence presented in court. You should also explain your reasoning for your decision.

If you find the defendant guilty, you should impose a sentence that is in accordance with the law and that takes into account any mitigating or aggravating factors. If you find the defendant not guilty, you should dismiss the charges against them.

Please provide a clear and concise decision based on the arguments presented by both parties and the evidence presented in court. Also, provide suggestions for the procesution and defense on how they can streghten their arguments. Also, provide the win pobabilities on the basis of the arguments presented, have one probability of the defense and one for the procesution.". So here is the user input: 
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${"The prosecutions arguments " + req.body.userInput}${"The defenses arguments " + req.body.userInput2}$`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${"The prosecutions arguments " + req.body.userInput}${"The defenses arguments " + req.body.userInput2}$\n`,
    temperature: 0.8,
    max_tokens: 750,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;