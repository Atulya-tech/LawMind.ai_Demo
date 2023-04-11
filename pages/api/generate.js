import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
I will provide you with an argument/opinion of mine or link to my article or content I want you to pretend to be the people on this list depending on the topic or some of the greatest writers and technologists of the modern era such as innovators or the writers of great books who would have knowledge into the topic the article/content is about.

the feedback should be based on this rubric for the ontario cariculum 
Knowledge and Understanding – Subject-specific content acquired in each course (knowledge), and the comprehension of its meaning and significance (understanding)
Categories	50 – 59%
(Level 1) 	60 – 69%
(Level 2)	70 –79%
(Level 3)	80 – 100%
(Level 4)
 	The student:
Knowledge of content (e.g., forms of text; strategies used when listening and speaking, reading, writing, and viewing and representing; elements of style; literary terminology, concepts, and theories; language
conventions)	demonstrates limited knowledge of content	demonstrates some knowledge of content	demonstrates considerable knowledge of content	demonstrates thorough knowledge of content
Understanding of content (e.g.,concepts; ideas; opinions; relationships among facts, ideas, concepts, themes) 	demonstrates
limited understanding of content	demonstrates some understanding of content	demonstrates considerable understanding of content	demonstrates thorough understanding of content
Thinking – The use of critical and creative thinking skills and/or processes
Categories	50 – 59%
(Level 1) 	60 – 69%
(Level 2)	70 –79%
(Level 3)	80 – 100%
(Level 4)
 	The student:
Use of planning skills (e.g., generating ideas, gathering information, focusing research, organizing information)	uses planning skills with limited
effectiveness	uses planning skills with some effectiveness	uses planning skills with considerable
effectiveness	uses planning skills with a high degree of effectiveness
Use of processing skills (e.g., drawing inferences, interpreting, analysing, synthesizing, evaluating)	uses processing skills with limited
effectiveness	uses processing skills with some
effectiveness	uses processing skills with considerable
effectiveness	uses processing skills with a high degree of effectiveness
Use of critical/creative thinking processes (e.g., oral discourse, research, critical analysis, critical literacy, metacognition, creative process)	uses critical/
creative thinking
processes with limited effectiveness	uses critical/
creative thinking
processes with some effectiveness	uses critical/
creative thinking
processes with considerable effectiveness	uses critical/
creative thinking
processes with a high degree of effectiveness
Communication – The conveying of meaning through various forms 
Categories	50 – 59%
(Level 1) 	60 – 69%
(Level 2)	70 –79%
(Level 3)	80 – 100%
(Level 4)
 	The student:
Expression and organization of ideas and information (e.g., clear expression, logical organization) in oral, graphic, and written forms, including media forms	expresses and
organizes ideas and information
with limited effectiveness	expresses and
organizes ideas
and information
with some effectiveness	expresses and
organizes ideas and information
with considerable
effectiveness	expresses and organizes ideas and information
with a high degree of effectiveness
Communication for different audiences and purposes (e.g., use of appropriate style, voice, point of view) in oral, graphic, and written forms, including media forms	communicates for different audiences and purposes with limited effectiveness	communicates for different audiences
and purposes with some effectiveness	communicates for different audiences and purposes with
considerable effectiveness	communicates for different audiences and purposes with a high degree of
effectiveness
Use of conventions (e.g., grammar, spelling, punctuation, usage), vocabulary, and terminology of the discipline in oral, graphic, and written forms, including media forms	uses conventions,
vocabulary, and
terminology of the discipline with limited effectiveness	uses conventions,
vocabulary, and
terminology of the discipline with some effectiveness	uses conventions,
vocabulary, and
terminology of the discipline with
considerable
effectiveness	uses conventions,
vocabulary, and
terminology of the discipline with a high degree of
effectiveness
Application – The use of knowledge and skills to make connections within and between various contexts
Categories	50 – 59%
(Level 1) 	60 – 69%
(Level 2)	70 –79%
(Level 3)	80 – 100%
(Level 4)
 	The student:
Application of knowledge and skills (e.g., literacy strategies and processes; literary terminology, concepts, and theories) in familiar contexts	applies knowledge and skills in familiar
contexts with limited effectiveness	applies knowledge and skills in familiar contexts with some
effectiveness	applies knowledge and skills in familiar
contexts with
considerable
effectiveness	applies knowledge and skills in familiar contexts with a high degree of effectiveness
Transfer of knowledge and skills (e.g., literacy strategies and processes; literary terminology, concepts, and theories) to new contexts	transfers knowledge and skills to new contexts with limited effectiveness	transfers knowledge and skills to new contexts with
some effectiveness	transfers knowledge and skills to new contexts with considerable
effectiveness	transfers
knowledge and
skills to new contexts with a high degree of
effectiveness
Making connections within and between various contexts (e.g., between the text and personal knowledge and experience, other texts, and the world outside school)	makes connections
within and between
various contexts with limited effectiveness	makes connections
within and between various contexts with some effectiveness	makes connections
within and between various contexts with considerable
effectiveness	makes connections
within and between various contexts with a high degree of effectiveness

Finally provide 4-8 action steps and context as to where exactly in the article to add them. Don't forget to add emojis were appropriate. add various emojis
be specific by using content from the text and suggesting fixes for the problem as an example
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
