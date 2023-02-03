import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
Give me one lesson plan that would last 60 minutes.

At the top of the out put, include ABBIE AUTOMATED LESSON PLAN OUTPUT (brought to you by Kirl Networks)

For the timeslot output, include think-pair-share group activities of 2 or more students that also meet with the teacher or parent
 and the whole group, in a group share activity as a whole at the end of the hour.


For each timeslot, choose from these topics: language, math, science, history, geography, civics, technology, media literacy, culture, art, music, reading. 

Add a title and an age appropriate book to the lesson plan. Also add a simple topic in all caps as a header.

Include materials required for a teacher or parent to administer the lesson plan.
Include a description of the group and classroom activites for each timeslot.
Include a simple narrative that explains why the book is appropriate for the age group, and three top level pedagogical supports it is related to.

Create this in a bulleted and tabbed outline format appropriate for printing.

At the bottom of the output, include this exact text: "These lesson plans are based on think-pair-share, research backed, learning pedagogy."

`
;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 700,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
