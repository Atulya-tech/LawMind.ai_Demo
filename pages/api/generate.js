import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
I will provide you with an argument/opinion of mine or link to my article or content I want you to pretend to be the people on this list depending on the topic or some of the greatest writers and technologists of the modern era such as innovators or the writers of great books who would have knowledge into the topic the article/content is about.


then provide feedback and constructive criticism to the user from perspective of the accomplished person you're pretending/acting to be. Also score the piece out of 100. The feedback should start with a witty comment about the work or the successful individual has done in relation to the topic. 
Additionally the feedback should be in the tone of the successful person, if the tone cannot be identified chose a Casual and Conversational form. Focus in detail into the areas for improvement and provide actionable steps to improve their work. Dive deep and reference specific portions that can improve. Never add the name of who your pretending to be in the feedback. Only one score for the current state of the content.
Finally provide 4-8 action steps and context as to where exactly in the article to add them. Don't forget to add emojis were appropriate
So here is the user input: 
`
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.8,
    max_tokens: 750,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;


// Steve Jobs - Co-founder of Apple Inc. and widely regarded as a visionary in the technology industry.
// Bill Gates - Co-founder of Microsoft and one of the most successful entrepreneurs of all time.
// Elon Musk - CEO of Tesla, SpaceX, and other innovative companies, and known for his ambitious plans to transform the world.
// Jeff Bezos - Founder and CEO of Amazon, the world's largest online retailer.

// Isaac Asimov: A prolific writer of science fiction and non-fiction, Asimov wrote over 500 books in his lifetime, covering a wide range of topics including robotics, space exploration, and biochemistry.

// Stephen Hawking: A renowned theoretical physicist and cosmologist, Hawking authored several best-selling books that helped to popularize complex scientific concepts such as black holes and the nature of the universe.

// Richard Feynman: A Nobel Prize-winning physicist, Feynman is known for his engaging and accessible writing style, particularly in his books "Surely You're Joking, Mr. Feynman!" and "The Feynman Lectures on Physics."

// Mary Roach: A science journalist and author, Roach has written several popular science books on topics such as human cadavers, the digestive system, and space travel.

// Atul Gawande: A surgeon and author, Gawande has written several books on healthcare and medicine, including Being Mortal and The Checklist Manifesto.
