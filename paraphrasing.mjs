import { createInterface } from 'readline';
import axios from 'axios';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

export function validateOption(option) {
    const validOptions = ['professional', 'creative', 'urgent'];
    return validOptions.includes(option.toLowerCase());
}


export function paraphraseText(text, option) {
    const apiUrl = 'https://paraphraser.prod.hipcv.com/paraphrase'; // the API endpoint
  
    return axios.post(apiUrl, {
      'text':text,
      'mode':option
    })
    .then((response) =>{ 
        console.log('------res ',response?.data?.data);
        if(response && response.data && response.data.data)
        return response.data.data.join(' ');
        // return response.data.data.join(' ').replace(/\w+\S*$/, match => match.toLowerCase())
          //   .replace(/\s+\w+/g, match => match.charAt(0).toUpperCase() + match.slice(1))
          //   .replace(/\s+/g, ' ');
          //return response?.data?.data[0] || text;
        else
          return response;
    })
    .catch(error => {
      console.error('Error fetching paraphrased text:', error.message);
      return text; // Return original text in case of an error
    });
  }

rl.question('Enter the text to paraphrase: ', (text) => {
    if(!text || text==''){
        console.log('Invalid text. Please provide a valid english sentence to paraphrase.');
        rl.close();
    }
  rl.question('Choose paraphrasing option (professional/creative/urgent): ', (option) => {
    if (validateOption(option)) {
        paraphraseText(text, option.toLowerCase())
          .then(paraphrasedText => {
            console.log('\nParaphrased Text:\n', paraphrasedText);
            rl.close();
          });
      } else {
        console.log('Invalid option. Please choose a valid option.');
        rl.close();
      }
  });
});

rl.on('close', () => {
  process.exit(0);
});
