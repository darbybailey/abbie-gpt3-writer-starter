import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
Give me four lesson plans, in 40 minute timeslots, starting at 8 a.m., with 5 minute breaks in between.

For two of the timeslots, include group activities of 3-4 studends that also meet with the class in a group share activity as a whole at the end of each 40 minutes.
For two of the timeslots, make the lesson plan an all classroom activity.

For each timeslot, choose from these topics: language, math, science, history, geography, civics, technology, media literacy, culture, art, music, reading. 
Never repeat a topic between the four lesson plans.
Add a title and a recommended book to each timeslot. Also add a simple topic in all caps for each time slot as a header.

Include materials required for a teacher to administer each timeslot.
Include a description of the group and classroom activites for each timeslot.

Include a 15 minute "physical activity" break after the first timeslots, and a 50 minute "lunch & play" after the third timeslot.

Include TIMES for each timeslot, including breaks, starting at 8 a.m.

Create this in a bulleted and tabbed outline format appropriate for printing.
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
