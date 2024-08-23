export const entreesComments = {
    0:'Nice selection',
    1:'Wonderful choice if I may',
    2:'It is one of my favourite entrees',
    3:'Nice choice',
    4:'Excellent taste. In my modest opinion, it goes well with all side dishes',
    5:'Excellent, this main dish is very popular',
    6:'Nice choice, it is a dish easy to combine with side options',
    7:'Nice selection indeed. I particularly enjoy it with salad',
    8:'Finely chosen, sir. Our cook is an expert preparing this dish',
    9:'Nicelly chosen, monsieur. It is my personal favourite'
}

export const sidesComments = {
    0:'Excellent choice, works well with any main',
    1:'Wonderfully chosen',
    2:'My personal option with the main dish you chose',
    3:'Well spotted if I may',
    4:'Fine choice. Our cook loves it',
    5:'Very good option. Made with all natural ingredients',
    6:'Nicelly selected',
    7:'Wonderful taste if I may',
    8:'Excellent option this season',
    9:'Well spotted. It is so popular that we usually run out of this.'
}

export const breakfastComments = {
    0:'Nice selection',
    1:'Wonderful choice if I may',
    2:'I cannot think of a better option to start the day',
    3:'Nice choice. Plenty of nutrients to start the day',
    4:'Excellent taste. It is our all-time favourite',
    5:'Excellent, one of our most popular breakfast options',
    6:'Nice choice, plenty of flavour and nutrients',
    7:'Nice selection indeed. I particularly enjoy it in summer',
    8:'Finely chosen, sir. Our cook is an expert preparing this breakfast special',
    9:'Nicelly chosen, monsieur. I am sure you will not regret the choice'
}

export function getRandomComment(commentsObject) {
    let keys = Object.keys(commentsObject);
    return commentsObject[keys[ keys.length * Math.random() << 0]];
};