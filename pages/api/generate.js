import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
Give me two lesson plans, in 60 minute timeslots.

At the top of the out put, include ABBIE AUTOMATED LESSON PLAN OUTPUT (brought to you by Kirl Networks)

For the first timeslot, include think-pair-share group activities of 2 or more students that also meet with the class in a group share activity as a whole at the end of each 40 minutes.
For one of the timeslots, make the lesson plan an all classroom activity.

For each timeslot, choose from these topics: language, math, science, history, geography, civics, technology, media literacy, culture, art, music, reading. 
Never repeat a topic between the two lesson plans.
Add a title and a recommended book to each timeslot. Also add a simple topic in all caps for each time slot as a header.

Include materials required for a teacher to administer each timeslot.
Include a description of the group and classroom activites for each timeslot.

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
