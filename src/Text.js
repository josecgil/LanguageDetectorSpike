function Text(text)
{
    this.text=text.normalize().toLowerCase();
    this.letterFrequencyDictionary=this.getLetterFrequencyDictionary();
}

Text.prototype.isLetter=function (char) {
    return char.match(/[a-z]/i);
};

Text.prototype.getLetterFrequencyDictionary=function () {
    var letterFrequencyDictionary={};
    for(var i=0; i<this.text.length; i++) {
        var char=this.text[i];
        if (!this.isLetter(char)) continue;

        if (letterFrequencyDictionary[char]==undefined) {
            letterFrequencyDictionary[char]=0;
        }
        letterFrequencyDictionary[char]++;
    }
    return letterFrequencyDictionary;
};


Text.prototype.getDeviationFromLanguage=function (language) {
    var sumDeviation=0;
    for(var letter in language) {
        var normalFrequency=language[letter];
        var countFrequency=this.letterFrequencyDictionary[letter];
        if (countFrequency==undefined) countFrequency=0;

        var sampleFrequency=(countFrequency/this.text.length)*100;
        var distance=Math.abs(normalFrequency-sampleFrequency);
        sumDeviation=sumDeviation+distance;
    }
    return sumDeviation/10.0;
};

Text.prototype.whichLanguage=function() {
    var SPANISH= {
        'e':12.181,
        'a':11.525,
        'o':8.683,
        's':7.977,
        'r':6.871,
        'n':6.712,
        'i':6.247,
        'd':5.010,
        'l':4.967,
        't':4.632
    };

    var PORTUGUESE= {
        'a':14.634,
        'e':12.570,
        'o':9.735,
        's':6.805,
        'r':6.530,
        'i':6.186,
        'd':4.992,
        'm':4.738,
        'n':4.446,
        't':4.336
    };
    var ENGLISH={
        'e':12.702,
        't':9.056,
        'a':8.167,
        'o':7.507,
        'i':6.966,
        'n':6.749,
        's':6.327,
        'h':6.094,
        'r':5.987,
        'd':4.253
    };
    var FRENCH={
        'e':14.715,
        's':7.948,
        'a':7.636,
        'i':7.529,
        't':7.244,
        'n':7.095,
        'r':6.693,
        'u':6.311,
        'o':5.796,
        'l':5.456
    };

    var LANGUAGES_LETTER_FREQUENCY={
        Spanish:SPANISH,
        Portuguese:PORTUGUESE,
        English: ENGLISH,
        French: FRENCH
    };

    var minDeviation=Number.MAX_VALUE;
    var mostProbableLanguage="Unknown";
    for (var languageName in LANGUAGES_LETTER_FREQUENCY){
        var languageLetterFrequency = LANGUAGES_LETTER_FREQUENCY[languageName];
        var deviation=this.getDeviationFromLanguage(languageLetterFrequency);
        if (deviation<minDeviation){
            minDeviation=deviation;
            mostProbableLanguage=languageName;
        }
    }
    return mostProbableLanguage;
};

function analyzeLanguage() {
    var textAreaValue=document.getElementsByTagName("textarea")[0].value;
    var text=new Text(textAreaValue);
    var p=document.getElementsByTagName("p")[0];
    p.innerHTML=text.whichLanguage();
}


