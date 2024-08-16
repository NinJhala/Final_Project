const app = Vue.createApp({
    data() {
        return {
            randomFact: '',
            weather: {
                temperature: '',
                wind: '',
                description: ''
            },
            city: 'London Ontario',
            definition: {
                word: '',
                phonetic: '',
                partOfSpeech: '',
                definition: ''
            },
            word: ''
        };
    },
    created() {
        this.getRandomFact();
        this.getWeather();
    },
    methods: {
        getRandomFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => {
                    this.randomFact = data.text;
                });
        },
        getWeather() {
            fetch(`https://goweather.herokuapp.com/weather/${encodeURIComponent(this.city)}`)
                .then(response => response.json())
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind;
                    this.weather.description = data.description;
                });
        },
        getDefinition() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(this.word)}`)
                .then(response => response.json())
                .then(data => {
                    const wordData = data[0];
                    this.definition.word = wordData.word;
                    this.definition.phonetic = wordData.phonetics[0]?.text || '';
                    this.definition.partOfSpeech = wordData.meanings[0]?.partOfSpeech || '';
                    this.definition.definition = wordData.meanings[0]?.definitions[0]?.definition || '';
                });
        },
        clearFields() {
            this.city = 'London Ontario';
            this.word = '';
            this.definition = {
                word: '',
                phonetic: '',
                partOfSpeech: '',
                definition: ''
            };
        }
    }
});

app.mount('#app');
