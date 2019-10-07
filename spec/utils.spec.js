process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns an array when passed an empty array', () => {
    expect(formatDates([])).to.eql([]);
  });
  it('does not mutate the original array', () => {
    const input = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const control = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      }
    ];
    formatDates(input);
    expect(input).to.eql(control);
  });
  it('when passed an array containing one timestamp element within an object, returns a new array containing an object with the timestamp element converted to a JavaScript format', () => {
    const input = [{ created_at: 1504183900263 }];
    const actual = formatDates(input);
    const expected = new Date(1504183900263);
    expect(actual[0].created_at).to.eql(expected);
  });
  it('when passed an array containing a whole object with many keys returns a new array containing the modified key and the remaining keys unaltered', () => {
    const input = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const actual = formatDates(input);
    const expected = new Date(1468087638932);
    expect(actual[0].created_at).to.eql(expected);
    expect(actual[0]).to.contain.keys(
      'body',
      'belongs_to',
      'created_by',
      'votes'
    );
  });
  it('can handle an array containing multiple objects and will return them with correctly formatted dates', () => {
    const input = [
      {
        body:
          'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
        belongs_to:
          'The People Tracking Every Touch, Pass And Tackle in the World Cup',
        created_by: 'tickle122',
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 1478813209256
      },
      {
        body:
          'Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.',
        belongs_to: '22 Amazing open source React projects',
        created_by: 'grumpy19',
        votes: 3,
        created_at: 1504183900263
      }
    ];
    const actual = formatDates(input);
    const expected0 = new Date(1468087638932);
    const expected1 = new Date(1478813209256);
    const expected2 = new Date(1504183900263);
    expect(actual[0].created_at).to.eql(expected0);
    expect(actual[1].created_at).to.eql(expected1);
    expect(actual[2].created_at).to.eql(expected2);
  });
});

describe('makeRefObj', () => {
  it('returns a blank object when passed an empty array', () => {
    expect(makeRefObj([])).to.eql({});
  });
  it('when passed an array containing data for a single article object returns an object with the title and article_id as the key and value respectively', () => {
    expect(makeRefObj([{ article_id: 1, title: 'A' }])).to.eql({ A: 1 });
  });
  it('does not mutate the original array', () => {
    const input = [{ article_id: 1, title: 'A' }];
    const control = [{ article_id: 1, title: 'A' }];
    makeRefObj(input);
    expect(input).to.eql(control);
  });
  it('when passed multiple article objects within an array returns a reference object', () => {
    const input = [
      {
        article_id: 31,
        title: 'What to Cook This Week',
        body:
          'Good morning. Here’s the plan for the week, not including breakfast because I’m on a farina kick and that’s not to everyone’s taste, and not including lunch because really when it comes to the midday hours you should get out of the office or the house and walk around. If you get something to eat, great, but the most important thing is to be outside where the stories are. There’s nothing happening at your desk but a screen. Anyway! I’m thinking chicken paprikash for dinner tonight, a nod toward the coming fall, served over buttery egg noodles, with green beans on the side. If you have the time, make an apple cake for dessert.',
        votes: 0,
        topic: 'cooking',
        author: 'tickle122'
      },
      {
        article_id: 32,
        title: 'Halal food: Keeping pure and true',
        body:
          "CHINA’S cities abound with restaurants and food stalls catering to Muslims as well as to the many other Chinese who relish the distinctive cuisines for which the country’s Muslims are renowned. So popular are kebabs cooked by Muslim Uighurs on the streets of Beijing that the city banned outdoor grills in 2014 in order to reduce smoke, which officials said was exacerbating the capital’s notorious smog (the air today is hardly less noxious). Often such food is claimed to be qing zhen, meaning 'pure and true', or halal, prepared according to traditional Islamic regulations. But who can tell? Last year angry Muslims besieged a halal bakery in Xining, the capital of Qinghai province, after pork sausages were found in the shop’s delivery van. There have been several scandals in recent years involving rat meat or pork being sold as lamb. These have spread Muslim mistrust of domestically produced halal products.",
        votes: 0,
        topic: 'cooking',
        author: 'grumpy19'
      },
      {
        article_id: 33,
        title: 'Seafood substitutions are increasing',
        body:
          "'SEAFOOD fraud is a serious global problem', begins a recent report from Oceana, an NGO. Reviewing over 200 studies in 55 countries, the report finds that one in five fish sold has been mislabelled. Although fish fraud is common early in the supply chain, most of it comes at the retail level. In 65% of cases, the motivation is economic—slippery restaurateurs frequently serve up cheaper fish than they advertise to cut costs. In America, Oceana has reported instances of tilapia being sold as the more expensive red snapper. Especially brazen fish criminals have invented new types of fish entirely. In Brazil, researchers were puzzled to find markets selling 'douradinha', ' non-existent species. Close inspection found that 60% of such fish were actually 'vulture' catfish, a relatively undesirable dish. Reports in America of catfish being substituted for more expensive fish date back to at least 2002; Oceana’s study suggests that the phenomenon is spreading.",
        votes: 0,
        topic: 'cooking',
        author: 'weegembump'
      },
      {
        article_id: 34,
        title: 'The Notorious MSG’s Unlikely Formula For Success',
        body:
          "The 'umami' craze has turned a much-maligned and misunderstood food additive into an object of obsession for the world’s most innovative chefs. But secret ingredient monosodium glutamate’s biggest secret may be that there was never anything wrong with it at all.",
        votes: 0,
        topic: 'cooking',
        author: 'grumpy19'
      },
      {
        article_id: 35,
        title: 'Stone Soup',
        body:
          'The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. If they were still hungry, I told them, they could help themselves to more sausage, but they were not allowed to grab a slice of bread, or toast an English muffin, or pour themselves a bowl of cereal. This represented a reversal of the usual strictures, and they were happy to oblige. It was like some weird, unexpected holiday—Passover in July.',
        votes: 0,
        topic: 'cooking',
        author: 'cooljmessy'
      },
      {
        article_id: 36,
        title: 'The vegan carnivore?',
        body:
          'The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.',
        votes: 0,
        topic: 'cooking',
        author: 'tickle122'
      }
    ];
    const expected = {
      'Halal food: Keeping pure and true': 32,
      'Seafood substitutions are increasing': 33,
      'Stone Soup': 35,
      'The Notorious MSG’s Unlikely Formula For Success': 34,
      'The vegan carnivore?': 36,
      'What to Cook This Week': 31
    };
    expect(makeRefObj(input)).to.eql(expected);
  });
});

describe.only('formatComments', () => {
  it('returns a new empty array when passed an empty array and refobj', () => {
    expect(formatComments([], {})).to.eql([]);
  });
  it('does not mutate the original array', () => {
    const commArr = [
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'Stone Soup',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389
      }
    ];
    const refObj = {
      'Halal food: Keeping pure and true': 32,
      'Seafood substitutions are increasing': 33,
      'Stone Soup': 35,
      'The Notorious MSG’s Unlikely Formula For Success': 34,
      'The vegan carnivore?': 36,
      'What to Cook This Week': 31
    };
    formatComments(commArr, refObj);
    expect(commArr[0]).to.have.keys(
      'body',
      'belongs_to',
      'created_by',
      'votes',
      'created_at'
    );
  });
  it('returns a new array with a modified object when passed an array containing a single comment object', () => {
    const commArr = [
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'Stone Soup',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389
      }
    ];
    const refObj = {
      'Halal food: Keeping pure and true': 32,
      'Seafood substitutions are increasing': 33,
      'Stone Soup': 35,
      'The Notorious MSG’s Unlikely Formula For Success': 34,
      'The vegan carnivore?': 36,
      'What to Cook This Week': 31
    };
    const actual = formatComments(commArr, refObj);
    const checkDate = new Date(1479818163389);
    expect(actual[0]).to.contain.keys('author', 'article_id');
    expect(actual[0].article_id).to.equal(35);
    expect(actual[0].created_at).to.eql(checkDate);
  });
  it('returns a new array containing multiple modified comment objects when passed an array containing multiple comment objects', () => {
    const commArr = [
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'Stone Soup',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        belongs_to: 'What to Cook This Week',
        created_by: 'icellusedkars',
        votes: 100,
        created_at: 1448282163389
      },
      {
        body: ' I carry a log — yes. Is it funny to you? It is not to me.',
        belongs_to: 'The Notorious MSG’s Unlikely Formula For Success',
        created_by: 'icellusedkars',
        votes: -100,
        created_at: 1416746163389
      }
    ];
    const refObj = {
      'Halal food: Keeping pure and true': 32,
      'Seafood substitutions are increasing': 33,
      'Stone Soup': 35,
      'The Notorious MSG’s Unlikely Formula For Success': 34,
      'The vegan carnivore?': 36,
      'What to Cook This Week': 31
    };
    const actual = formatComments(commArr, refObj);
    const checkDate0 = new Date(1479818163389);
    const checkDate1 = new Date(1448282163389);
    const checkDate2 = new Date(1416746163389);
    expect(actual[0]).to.contain.keys('author', 'article_id');
    expect(actual[0].article_id).to.equal(35);
    expect(actual[0].created_at).to.eql(checkDate0);
    expect(actual[1]).to.contain.keys('author', 'article_id');
    expect(actual[1].article_id).to.equal(31);
    expect(actual[1].created_at).to.eql(checkDate1);
    expect(actual[2]).to.contain.keys('author', 'article_id');
    expect(actual[2].article_id).to.equal(34);
    expect(actual[2].created_at).to.eql(checkDate2);
  });
});
